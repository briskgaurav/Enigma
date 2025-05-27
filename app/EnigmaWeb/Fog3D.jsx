"use client";

import {
  Environment,
  MeshTransmissionMaterial,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { degToRad } from "three/src/math/MathUtils";
import gsap from "gsap";
import * as THREE from "three";

export default function Fog3D() {
  return (
    <div className="relative h-screen w-screen">
        <div className="absolute top-0 left-0 w-full flex items-start pointer-events-none justify-center h-full z-10 p-0 ">
            <h1 className="text-zinc-700 text-[14vw] leading-none tracking-[7vw] font-light">ENIGMA</h1>

        </div>
      <Canvas camera={{ fov: 10, position: [0, 0, 40] }}>
        <color attach="background" args={["#FCFCFC"]} />
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight intensity={2} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Model() {
  const [mouseRotation, setMouseRotation] = useState({
    x: degToRad(120),
    y: degToRad(-5),
    z: degToRad(120),
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, z: 0 });

  const { nodes } = useGLTF("/Logo/MainLogoMAIN.glb");
  const meshRefs = useRef([]);
  const MainModelRef = useRef();

  useFrame(({ mouse }) => {
    setMouseRotation((prev) => ({
      ...prev,
      z: degToRad(120 - mouse.x * 5),
      x: degToRad(120 - mouse.y * 2),
    }));
    setMousePosition((prev) => ({
      ...prev,
      x: mouse.x + 10,
    }));
  });

  const handleHover = (index, enter) => {
    const ref = meshRefs.current[index];
    if (!ref) return;
  
    const targetColor = enter
      ? new THREE.Color(0xff0000)  // red on hover
      : new THREE.Color(0x000000); // black on leave
  
    const zPos = enter ? -0.2 : 0;
  
    // Animate the color components individually:
    gsap.to(ref.material.uniforms.uColor2.value, {
      r: targetColor.r,
      g: targetColor.g,
      b: targetColor.b,
      duration: 0.3,
      ease: "power2.out",
      onUpdate: () => {
        // Optionally force the material to update uniforms
        ref.material.needsUpdate = true;
      }
    });
  
    // Animate position.z smoothly:
    gsap.to(ref.position, {
      z: zPos,
      duration: 0.3,
      ease: "power2.out",
      // You can add modifiers or smoothness here if you want
    });
  };
  
  const meshes = [
    nodes.Low_Poly,
    nodes.Low_Poly001,
    nodes.Low_Poly002,
    nodes.Low_Poly003,
  ];

  const gradientMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(0xffffff) },
      uColor2: { value: new THREE.Color(0x000000) },
    },
    vertexShader: `
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
     uniform vec3 uColor;
      uniform vec3 uColor2;
      varying vec3 vPosition;
      void main() {
        float t = (vPosition.z + .8) / 1.4;
        float smoothMixFactor = smoothstep(.8, .0, t);
        vec3 color = mix(uColor, uColor2, smoothMixFactor);
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    side: THREE.DoubleSide,
  });

  return (
    <>
      {/* <group
        position={[0, -1.2, 0]}
        rotation={[degToRad(120), degToRad(-5), degToRad(120)]}
      >
        <mesh>
          <boxGeometry args={[35, 35, 0.2, 100, 100]} />
          <meshBasicMaterial color={0xffffff} />
        </mesh>
      </group> */}

      <group
        ref={MainModelRef}
        position={[0, -1, 0]}
        rotation={[mouseRotation.x, mouseRotation.y, mouseRotation.z]}
      >
        {meshes.map((geometry, index) => (
          <mesh
            key={index}
            ref={(el) => (meshRefs.current[index] = el)}
            geometry={geometry.geometry}
            onPointerEnter={() => handleHover(index, true)}
            onPointerLeave={() => handleHover(index, false)}
            material={gradientMaterial.clone()}
          />
        ))}
      </group>
    </>
  );
}
