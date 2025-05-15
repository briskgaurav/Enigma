import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import EnigmaModelWeb from "./EnigmaModelWeb";
import * as THREE from "three";
import gsap from "gsap";

export default function Enigma({ modelMesh }) {
  return (
    //15 z - 100 zoom
    <>
      <Canvas
        camera={{fov:10,position: [0, 0, 40] }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputEncoding: THREE.sRGBEncoding
        }}
        style={{
          background: '#000000'
        }}
      >
        <directionalLight intensity={510} position={[0, 3, -2]} />
        <Environment preset="city"/>
        {/* <OrbitControls />  */}
        <Suspense>
          <EnigmaModelWeb />
        </Suspense>
      </Canvas>
    </>
  );
}
