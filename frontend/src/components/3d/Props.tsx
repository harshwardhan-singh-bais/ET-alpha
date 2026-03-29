"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, RoundedBox, Cylinder } from "@react-three/drei";
import * as THREE from "three";

export function PremiumCoin({ position = [0, 0, 0], scale = 1, rotationSpeed = 1 }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.2;
    }
  });

  return (
    <group position={position} scale={scale}>
      <Cylinder ref={meshRef} args={[1, 1, 0.15, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshPhysicalMaterial
          color="#FFD700"
          metalness={1}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={3}
          reflectivity={1}
        />
      </Cylinder>
      {/* Inner Rim Detail */}
      <Cylinder args={[0.9, 0.9, 0.16, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshPhysicalMaterial
          color="#FDB931"
          metalness={1}
          roughness={0.2}
        />
      </Cylinder>
    </group>
  );
}

export function PremiumDiamond({ position = [0, 0, 0], scale = 1 }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group position={position} scale={scale}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#FFD700"
          metalness={1}
          roughness={0}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={4}
          reflectivity={1}
        />
      </mesh>
    </group>
  );
}



export function Pillar({ position = [0, 0, 0], scale = [1, 5, 1] }: any) {
  return (
    <mesh position={position} scale={scale as any}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#111"
        metalness={0.9}
        roughness={0.8}
        envMapIntensity={0.5}
      />
    </mesh>
  );
}
