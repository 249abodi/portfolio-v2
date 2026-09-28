"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mousePosition } from "@/lib/hero-3d-mouse";

export interface Hero3DSceneCanvasProps {
  frameloop: "always" | "never";
  reducedMotion: boolean;
  isMobile: boolean;
}

interface SceneProps {
  reducedMotion: boolean;
  isMobile: boolean;
}

function Scene({ reducedMotion, isMobile }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const smooth = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (reducedMotion || !groupRef.current) return;

    const t = state.clock.elapsedTime;

    smooth.current.x = THREE.MathUtils.damp(smooth.current.x, mousePosition.x, 3, delta);
    smooth.current.y = THREE.MathUtils.damp(smooth.current.y, mousePosition.y, 3, delta);

    groupRef.current.rotation.y = t * 0.08 + smooth.current.x * 0.12;
    groupRef.current.rotation.x = smooth.current.y * 0.08;
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.06;

    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.12;
    if (ring2Ref.current) ring2Ref.current.rotation.x = t * 0.1;
    if (ring3Ref.current) ring3Ref.current.rotation.y = t * 0.15;
  });

  const r1 = isMobile ? 1.1 : 1.4;
  const r2 = isMobile ? 1.3 : 1.7;
  const r3 = 1.2;
  const core = isMobile ? 0.85 : 1;

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[4, 4, 5]} intensity={0.9} color="#e8ecf4" />
      <pointLight position={[-3, 1, 3]} color="#4f7cff" intensity={3} distance={10} decay={2} />
      <pointLight position={[2, -2, -2]} color="#4f7cff" intensity={1.2} distance={8} decay={2} />

      <group ref={groupRef} rotation={[0.1, 0.3, 0]}>
        <mesh>
          <icosahedronGeometry args={[core, 2]} />
          <meshPhysicalMaterial
            color="#111827"
            metalness={0.95}
            roughness={0.15}
            clearcoat={0.5}
            clearcoatRoughness={0.3}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[core * 0.32, 24, 24]} />
          <meshBasicMaterial color="#4f7cff" transparent opacity={0.12} />
        </mesh>
        <mesh>
          <sphereGeometry args={[core * 0.55, 24, 24]} />
          <meshBasicMaterial color="#4f7cff" transparent opacity={0.03} />
        </mesh>

        <group ref={ring1Ref} rotation={[0.3, 0, 0]}>
          <mesh>
            <torusGeometry args={[r1, 0.005, 16, 100]} />
            <meshBasicMaterial color="#4f7cff" transparent opacity={0.35} />
          </mesh>
          <mesh position={[r1, 0, 0]}>
            <octahedronGeometry args={[0.04, 0]} />
            <meshBasicMaterial color="#4f7cff" transparent opacity={0.7} />
          </mesh>
          <mesh position={[-r1 * 0.3, 0, r1 * 0.95]}>
            <octahedronGeometry args={[0.025, 0]} />
            <meshBasicMaterial color="#7ea0ff" transparent opacity={0.5} />
          </mesh>
        </group>

        <group ref={ring2Ref} rotation={[1.2, 0.5, 0]}>
          <mesh>
            <torusGeometry args={[r2, 0.004, 16, 100]} />
            <meshBasicMaterial color="#7ea0ff" transparent opacity={0.2} />
          </mesh>
          <mesh position={[r2, 0, 0]}>
            <octahedronGeometry args={[0.03, 0]} />
            <meshBasicMaterial color="#7ea0ff" transparent opacity={0.5} />
          </mesh>
        </group>

        {!isMobile && (
          <group ref={ring3Ref} rotation={[0.8, -0.3, 0.5]}>
            <mesh>
              <torusGeometry args={[r3, 0.003, 16, 80]} />
              <meshBasicMaterial color="#4f7cff" transparent opacity={0.15} />
            </mesh>
            <mesh position={[0, r3, 0]}>
              <octahedronGeometry args={[0.02, 0]} />
              <meshBasicMaterial color="#4f7cff" transparent opacity={0.4} />
            </mesh>
          </group>
        )}

        {!isMobile && (
          <mesh>
            <icosahedronGeometry args={[1.8, 1]} />
            <meshBasicMaterial color="#4f7cff" transparent opacity={0.025} wireframe />
          </mesh>
        )}
      </group>
    </>
  );
}

export function Hero3DSceneCanvas({
  frameloop,
  reducedMotion,
  isMobile,
}: Hero3DSceneCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ background: "transparent" }}
      frameloop={frameloop}
    >
      <Scene reducedMotion={reducedMotion} isMobile={isMobile} />
    </Canvas>
  );
}