"use client";

import { useEffect, useRef, useState } from "react";
import { PluginContext } from "molstar/lib/mol-plugin/context";
import { DefaultPluginSpec } from "molstar/lib/mol-plugin/spec";
import { PluginConfig } from "molstar/lib/mol-plugin/config";
import { PluginCommands } from "molstar/lib/mol-plugin/commands";
import { Color } from "molstar/lib/mol-util/color";
import { MolScriptBuilder as MS } from "molstar/lib/mol-script/language/builder";

/**
 * Imperative, headless Mol* viewer. Loads a structure, sets the dark instrument
 * background, optionally paints a catalytic active site (given residues) in
 * ball-and-stick, and gently auto-rotates once the camera has framed the scene.
 * Dynamic-import with ssr:false so molstar never evaluates on the server.
 */
export default function MolstarViewer({
  url,
  className,
  activeSite,
  chain = "A",
}: {
  url: string;
  className?: string;
  activeSite?: number[];
  chain?: string;
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let disposed = false;
    let plugin: PluginContext | null = null;

    (async () => {
      const parent = parentRef.current;
      const canvas = canvasRef.current;
      if (!parent || !canvas) return;

      const spec = {
        ...DefaultPluginSpec(),
        config: [[PluginConfig.VolumeStreaming.Enabled, false]] as [
          typeof PluginConfig.VolumeStreaming.Enabled,
          boolean,
        ][],
      };
      plugin = new PluginContext(spec);
      await plugin.init();
      if (disposed) {
        plugin.dispose();
        return;
      }

      const ok = await plugin.initViewerAsync(canvas, parent);
      if (!ok || disposed) {
        setStatus("error");
        return;
      }

      const renderer = plugin.canvas3d!.props.renderer;
      await PluginCommands.Canvas3D.SetSettings(plugin, {
        settings: { renderer: { ...renderer, backgroundColor: Color(0x0e1116) } },
      });

      const data = await plugin.builders.data.download(
        { url, isBinary: false },
        { state: { isGhost: true } },
      );
      const trajectory = await plugin.builders.structure.parseTrajectory(data, "pdb");
      await plugin.builders.structure.hierarchy.applyPreset(trajectory, "default");

      // Active-site licorice on the given residues (e.g. the Ser-His-Asp triad).
      if (activeSite && activeSite.length > 0) {
        const structure = plugin.managers.structure.hierarchy.current.structures[0];
        if (structure) {
          const expr = MS.struct.combinator.merge(
            activeSite.map((res) =>
              MS.struct.generator.atomGroups({
                "chain-test": MS.core.rel.eq([
                  MS.struct.atomProperty.macromolecular.auth_asym_id(),
                  chain,
                ]),
                "residue-test": MS.core.rel.eq([
                  MS.struct.atomProperty.macromolecular.auth_seq_id(),
                  res,
                ]),
              }),
            ),
          );
          const comp = await plugin.builders.structure.tryCreateComponentFromExpression(
            structure.cell,
            expr,
            "active-site",
            { label: "Catalytic triad" },
          );
          if (comp) {
            await plugin.builders.structure.representation.addRepresentation(comp, {
              type: "ball-and-stick",
              color: "uniform",
              colorParams: { value: Color(0x34e0c4) },
            });
          }
        }
      }

      // Frame the structure. Auto-spin is intentionally omitted: Mol*'s trackball
      // spin tick throws every frame in this build, so drag-to-rotate is the
      // interaction. The camera reset gives a clean initial framing.
      plugin.canvas3d?.requestCameraReset();

      if (!disposed) setStatus("ready");
    })().catch(() => {
      if (!disposed) setStatus("error");
    });

    return () => {
      disposed = true;
      plugin?.dispose();
    };
  }, [url, activeSite, chain]);

  return (
    <div ref={parentRef} data-molstar className={className} style={{ position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
      {status !== "ready" && (
        <div className="mono-label absolute inset-0 grid place-items-center">
          {status === "error" ? "viewer unavailable" : "initializing viewer"}
        </div>
      )}
    </div>
  );
}
