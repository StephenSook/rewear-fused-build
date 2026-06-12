"use client";

import { useEffect, useRef, useState } from "react";
import { PluginContext } from "molstar/lib/mol-plugin/context";
import { DefaultPluginSpec } from "molstar/lib/mol-plugin/spec";
import { PluginConfig } from "molstar/lib/mol-plugin/config";
import { PluginCommands } from "molstar/lib/mol-plugin/commands";
import { Color } from "molstar/lib/mol-util/color";

/**
 * Imperative, headless Mol* viewer. No Mol* React UI (avoids a second React
 * reconciler). We own the PluginContext on a canvas, load a structure, set the
 * dark instrument background, idle-spin, and dispose on unmount. Dynamic-import
 * this with ssr:false so molstar never evaluates on the server.
 */
export default function MolstarViewer({
  url,
  className,
}: {
  url: string;
  className?: string;
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

      // Drag to rotate. Auto-spin is deferred: the trackball spin tick throws
      // every frame until the camera has a focused bounding sphere, and a
      // per-frame error is not worth a slow rotation. Revisit with a camera
      // reset + post-focus enable.

      if (!disposed) setStatus("ready");
    })().catch(() => {
      if (!disposed) setStatus("error");
    });

    return () => {
      disposed = true;
      plugin?.dispose();
    };
  }, [url]);

  return (
    <div
      ref={parentRef}
      data-molstar
      className={className}
      style={{ position: "relative" }}
    >
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
