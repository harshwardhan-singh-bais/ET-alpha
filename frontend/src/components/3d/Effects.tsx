"use client";

import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration, DepthOfField } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

export function Effects() {
  return (
    <EffectComposer multisampling={4}>
      <DepthOfField
        target={[0, 0, -5]}
        focalLength={0.7}
        bokehScale={2}
        height={700}
      />
      <Bloom
        luminanceThreshold={0.4}
        luminanceSmoothing={0.9}
        intensity={1.2}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL} // blend mode
        offset={new THREE.Vector2(0.001, 0.001)} // color offset
      />
      <Noise premultiply blendFunction={BlendFunction.ADD} opacity={0.3} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
}
