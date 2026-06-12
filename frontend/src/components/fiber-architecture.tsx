"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const HARD = "#e0934f"; // fiber amber: crystalline hard segment
const SOFT = "#5a6472"; // muted: amorphous soft segment
const BOND = "#34e0c4"; // bio: the cleavable carbamate bond

type P = [number, number, number];

function softCoil(x0: number, x1: number, n: number): P[] {
  const pts: P[] = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const x = x0 + (x1 - x0) * t;
    pts.push([x, Math.sin(t * Math.PI * 3) * 0.35, Math.cos(t * Math.PI * 3) * 0.35]);
  }
  return pts;
}

function Chain() {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (g.current) g.current.rotation.y += dt * 0.18;
  });

  const hardX = [-2.4, 0, 2.4];
  const coilA = useMemo(() => softCoil(-2.0, -0.4, 14), []);
  const coilB = useMemo(() => softCoil(0.4, 2.0, 14), []);
  const bondPos = coilA[7];

  return (
    <group ref={g}>
      {hardX.map((x) => (
        <mesh key={x} position={[x, 0, 0]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial
            color={HARD}
            emissive={HARD}
            emissiveIntensity={0.35}
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
      ))}

      {[...coilA, ...coilB].map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color={SOFT} roughness={0.6} />
        </mesh>
      ))}

      <mesh position={bondPos}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color={BOND} emissive={BOND} emissiveIntensity={0.9} />
      </mesh>
    </group>
  );
}

export default function FiberArchitecture() {
  return (
    <Canvas camera={{ position: [0, 1.2, 7], fov: 42 }} dpr={[1, 2]}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 6, 6]} intensity={110} />
      <pointLight position={[-6, -3, 2]} intensity={40} color={BOND} />
      <Chain />
      <OrbitControls enablePan={false} enableZoom={false} />
    </Canvas>
  );
}
