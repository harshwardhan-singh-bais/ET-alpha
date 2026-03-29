"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Scroll, useScroll } from "@react-three/drei";
import { PremiumCoin, PremiumDiamond, Pillar } from "./Props";
import * as THREE from "three";

export function ScrollContent() {
  const scroll = useScroll();
  const { width, height } = useThree((state) => state.viewport);

  const mainGroup = useRef<THREE.Group>(null);
  const coinsRef = useRef<THREE.Group>(null);
  const diamondRef = useRef<THREE.Group>(null);

  // Generate a very long corridor of pillars
  const pillars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => {
      const z = -i * 10;
      const x = (i % 2 === 0 ? 1 : -1) * (6 + Math.random() * 8);
      return { position: [x, 0, z], scale: [1 + Math.random() * 3, 30, 1 + Math.random() * 3] };
    });
  }, []);

  // Define scattered gold coins in a long distribution
  const coins = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 30, 
        (Math.random() - 0.5) * 20, 
        -Math.random() * 800 - 10
      ],
      scale: 0.8 + Math.random() * 1.5,
      rotationSpeed: 0.5 + Math.random() * 2
    }));
  }, []);

  useFrame((state) => {
    const offset = scroll.offset; // 0 to 1

    if (mainGroup.current) {
      // Fly extremely deep, spanning -800 z distance
      mainGroup.current.position.z = offset * 800;
      // Slight smooth sway
      mainGroup.current.position.y = Math.sin(offset * Math.PI * 8) * 4;
      mainGroup.current.rotation.z = Math.sin(offset * Math.PI * 4) * 0.05;
      mainGroup.current.rotation.y = Math.cos(offset * Math.PI * 2) * 0.02;
    }

    if (coinsRef.current) {
      coinsRef.current.children.forEach((child: any, i) => {
        // Individual coin rotation
        child.rotation.y += 0.01 * (i % 3 === 0 ? -1 : 1);
        child.rotation.x += 0.005;
      });
    }

    if (diamondRef.current) {
      // The hero diamond rotates and pulses
      diamondRef.current.rotation.y += 0.005;
      diamondRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <>
      <group ref={mainGroup}>
        {/* Environment Corridor */}
        {pillars.map((prop, i) => (
          <Pillar key={`pillar-${i}`} position={prop.position} scale={prop.scale} />
        ))}

        <group ref={coinsRef}>
          {coins.map((item, i) => (
             <PremiumCoin 
               key={`coin-${i}`} 
               position={item.position} 
               scale={item.scale} 
               rotationSpeed={item.rotationSpeed} 
             />
          ))}
        </group>

        {/* Hero Diamond at the very end */}
        <group ref={diamondRef} position={[0, 0, -820]}>
          <PremiumDiamond scale={5} />
          <pointLight color="#FFD700" intensity={5} distance={20} />
        </group>
      </group>

      {/* HTML OVERLAYS - Lengthened to 10 pages, Apple-style premium long flow */}
      <Scroll html style={{ width: "100%" }}>
        {/* HEADER */}
        <header className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 mix-blend-difference pointer-events-auto">
          <div className="flex items-center gap-4">
            <span className="text-2xl tracking-widest font-bold text-white uppercase font-sans">
              ET ALPHA
            </span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm uppercase tracking-[0.2em] text-white/50">
            <a href="#vision" className="hover:text-white transition-colors">Vision</a>
            <a href="#intelligence" className="hover:text-white transition-colors">Intelligence</a>
            <a href="#nexus" className="hover:text-white transition-colors">Nexus</a>
          </nav>
          <a href="/dashboard" className="px-6 py-2 border border-[#FFD700]/50 text-[#FFD700] uppercase text-xs tracking-widest hover:bg-[#FFD700] hover:text-black transition-all">
            Dashboard
          </a>
        </header>

        {/* PAGE 1 */}
        <div className="w-screen h-screen flex flex-col justify-center px-16 pointer-events-none">
          <h1 className="text-[12vw] leading-[0.8] font-black font-heading tracking-tighter mix-blend-exclusion text-white uppercase break-words">
             Unleash<br/>
             <span className="font-playfair italic font-light lowercase text-[#FFD700] tracking-normal">conviction</span>
          </h1>
          <p className="mt-12 font-mono text-[#00D4FF] max-w-lg text-lg mix-blend-difference">
            The decision engine for the intelligent investor. Stop guessing.
          </p>
        </div>

        {/* PAGE 2 */}
        <div className="w-screen h-screen flex flex-col justify-center items-end px-16 pointer-events-none mb-[50vh]">
          <div className="max-w-xl text-right mix-blend-difference">
            <h2 className="text-6xl md:text-[8vw] font-playfair italic text-[#FFD700] leading-none mb-6">
              Precision
            </h2>
            <p className="text-white/80 font-sans text-xl leading-relaxed font-light tracking-wide">
              Like a perfectly engineered timepiece, ET Alpha measures thousands of micro-signals per second. We dissect volume anomalies, sentiment shifts, and structural patterns instantaneously.
            </p>
          </div>
        </div>

        {/* PAGE 3 */}
        <div className="w-screen h-screen flex flex-col justify-center px-16 pointer-events-none mb-[50vh]">
          <h2 className="text-[15vw] leading-none font-black font-heading text-white mix-blend-overlay blur-[1px]">
            RADAR
          </h2>
          <div className="font-cursive text-6xl text-white/80 ml-20 -mt-10 mix-blend-difference">
            seeing the unseen
          </div>
        </div>

        {/* PAGE 4 */}
        <div className="w-screen h-screen flex flex-col justify-end items-center pb-32 pointer-events-none mb-[50vh]">
          <div className="w-[1px] h-32 bg-gradient-to-b from-transparent to-[#FFD700] mb-8" />
          <p className="text-center font-playfair text-3xl md:text-5xl text-white max-w-4xl leading-tight mix-blend-difference">
            "A shift in <span className="text-[#FFD700] italic">institutional capital</span> creates a footprint. We follow the gold."
          </p>
        </div>

        {/* PAGE 5 */}
        <div className="w-screen h-screen flex items-center justify-start px-16 pointer-events-none mb-[50vh]">
           <div className="border-l border-[#00D4FF] pl-8 max-w-md mix-blend-difference text-white">
             <h3 className="uppercase tracking-[0.3em] text-xs text-[#00D4FF] mb-4">Phase II: Intelligence</h3>
             <p className="font-sans text-xl leading-relaxed mb-6 font-light">
               The Bull vs Bear Arbitration Matrix. Two opposing neural agents fight for absolute truth, synthesizing a singular Confluence Score.
             </p>
             <span className="font-mono text-sm">[SYSTEM SCORING 1-10]</span>
           </div>
        </div>

        {/* PAGE 6 & 7 (Long scrolling gap to appreciate the coins flying past) */}
        <div className="w-screen h-[200vh] pointer-events-none" />

        {/* PAGE 8 */}
        <div className="w-screen h-screen flex flex-col justify-center items-center pointer-events-none">
           <h2 className="text-[10vw] font-black font-heading tracking-tighter mix-blend-difference text-[#FFD700] uppercase text-center leading-[0.8] mb-8">
             Absolute
             <br/>
             <span className="font-cursive lowercase text-white font-normal text-[8vw]">clarity</span>
           </h2>
        </div>

        {/* PAGE 9 */}
        <div className="w-screen h-screen flex pointer-events-none" />

        {/* FOOTER / PAGE 10 */}
        <div className="w-screen h-screen flex flex-col items-center justify-end pb-12 pointer-events-auto bg-gradient-to-t from-black via-black/80 to-transparent">
           <div className="text-center mb-24">
             <h2 className="text-4xl md:text-7xl font-playfair text-white mb-8">
               Begin your ascent.
             </h2>
             <a href="/dashboard" className="inline-block px-12 py-4 bg-white text-black font-bold uppercase tracking-widest hover:scale-105 transition-transform">
               Launch Terminal
             </a>
           </div>

           {/* Premium Footer */}
           <footer className="w-full max-w-7xl border-t border-white/10 pt-12 px-8 flex justify-between items-end pb-8">
             <div className="flex flex-col gap-2">
                <span className="text-2xl font-bold font-sans tracking-widest text-white uppercase">ET Alpha</span>
                <span className="text-xs font-mono text-white/40">© 2026 The Conviction Engine. All rights reserved.</span>
             </div>
             <div className="flex gap-12 font-sans text-xs uppercase tracking-widest text-white/50">
               <div className="flex flex-col gap-4">
                 <a href="#" className="hover:text-white transition-colors">Dashboard</a>
                 <a href="#" className="hover:text-white transition-colors">Methodology</a>
               </div>
               <div className="flex flex-col gap-4">
                 <a href="#" className="hover:text-white transition-colors">Privacy</a>
                 <a href="#" className="hover:text-white transition-colors">Terms</a>
               </div>
             </div>
           </footer>
        </div>
      </Scroll>
    </>
  );
}
