"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Preload } from "@react-three/drei";
import { Effects } from "./Effects";
import { ScrollContent } from "./ScrollContent";
import { Suspense } from "react";

export default function LandingScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: false, stencil: false, depth: true }}
    >
      <color attach="background" args={["#050508"]} />
      
      {/* Lighting for metallic/glass feel */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={1.5} color="#7B61FF" /> {/* Purple Rim */}
      <pointLight position={[5, 5, -5]} intensity={1} color="#00D4FF" /> {/* Cyan Key */}

      <Suspense fallback={null}>
        <ScrollControls pages={10} damping={0.15} maxSpeed={0.5}>
          <ScrollContent />
        </ScrollControls>
        <Effects />
      </Suspense>

      <Preload all />
    </Canvas>
  );
}
