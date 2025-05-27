import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState, useRef } from "react";
import { Suspense } from "react";
import EnigmaModelWeb from "./EnigmaModelWeb";
import * as THREE from "three";

export default function Enigma({ modelMesh }) {
  const [lightPosition, setLightPosition] = useState({
    x: 10,
    y: 10,
  });

  const mouseMove = (e) => {
    const targetX = (e.clientX / window.innerWidth) * 20 - 10;
    setLightPosition((prevPos) => ({
      x: prevPos.x + (targetX - prevPos.x) * 0.1, // Reduced factor for smoother movement
      y: 0,
      z: 5,
      duration: 1, // Increased duration
      ease: "power2.out", // Changed to power2.out for smoother easing
    }));
  };
  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);
  return (
    <>
      <Canvas
        camera={{ fov: 10, position: [0, 0, 40] }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputEncoding: THREE.sRGBEncoding,
        }}
        style={{
          background: "#000000",
        }}
      >
        <ambientLight intensity={0.5} />

        <directionalLight
          position={[lightPosition.x, lightPosition.y, 10]}
          intensity={2}
        />
        {/* <Environment preset="city" /> */}
        {/* <OrbitControls /> */}
        <Suspense>
          <EnigmaModelWeb />
        </Suspense>
      </Canvas>
    </>
  );
}
