"use client";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import EnigmaModelComponent from "./Components/EnigmaModelComponent";
import { Suspense } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

export default function Enigma3D({}) {

  

  return (
    <Canvas>
      <directionalLight intensity={3} position={[0, 3, -2]} />
      <Environment preset="city" />
      <Suspense>
        <EnigmaModelComponent />
      </Suspense>
    </Canvas>
  );
}
