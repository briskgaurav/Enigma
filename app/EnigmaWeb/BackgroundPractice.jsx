"use client";
import {
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  OrbitControls,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useControls } from "leva";

export default function BackgroundPractice() {
  const lightRef = useRef();
  const [lightPosition, setLightPosition] = useState({
    x: 10,
    y: 10,
  });

  const mouseMove = (e) => {
    const targetX = (e.clientX / window.innerWidth) * 20 - 10;
    setLightPosition((prevPos) => ({
      x: prevPos.x + (targetX - prevPos.x) * 0.1,
      y: 0,
      z: 5,
      duration: 1,
      ease: "linear",
    }));
  };
  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <div className="h-screen w-screen relative">
      <Canvas shadows gl={{ clearColor: "white" }}>
        <color attach="background" args={["white"]} />
        <ambientLight intensity={.5} />

        <directionalLight
          ref={lightRef}
          position={[lightPosition.x, lightPosition.y, 10]}
          intensity={2}
        />
        {/* <Environment files={"/whiteHDRI.hdr"} background={true}>
          <Lightformer
            intensity={8}
            position={[10, 5, 0]}
            scale={[10, 50, 1]}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
          />
        </Environment> */}
        {/* <OrbitControls /> */}
        <BGModel />
      </Canvas>
    </div>
  );
}

function BGModel() {
  const { nodes } = useGLTF("/EnigmaBG.glb");
  //   const model = useGLTF("/Logo/MainLogoMAIN.glb");
  const model = useGLTF("/logo.glb");

  const texture = useTexture("/bg1.png");
  const map1 = useTexture("TextureMaps/color.png");
  const map2 = useTexture("TextureMaps/roughness.png");
  const map3 = useTexture("TextureMaps/normal.png");
  const map4 = useTexture("TextureMaps/height.png");
  const map5 = useTexture("TextureMaps/metallic.png");

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  const modelRef = useRef();
  const ModelPart1 = useRef();
  const ModelPart2 = useRef();
  const ModelPart3 = useRef();
  const ModelPart4 = useRef();

  const materialsProps = useControls({
    thickness: { value: 1.35, min: 0, max: 10, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.3, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.67, min: 0, max: 1 },
    backside: { value: false },
    backsideThickness: { value: 0.15, min: 0, max: 2 },
    samples: { value: 16, min: 1, max: 32, step: 1 },
    resolution: { value: 1024, min: 64, max: 2048, step: 64 },
    transmission: { value: 1, min: 0, max: 1 },
    clearcoat: { value: 1, min: 0.1, max: 1 },
    clearcoatRoughness: { value: 0.0, min: 0, max: 1 },
    thickness: { value: 0.3, min: 0, max: 5 },
    chromaticAberration: { value: 0.15, min: -5, max: 5 },
    anisotropy: { value: 0.25, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.5, min: 0, max: 4, step: 0.01 },
    distortionScale: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0, min: 0, max: 1, step: 0.01 },
    ior: { value: 1.25, min: 0, max: 2, step: 0.01 },
    color: "#000000",
    shadow: "#94cbff",
  });

  useFrame(() => {
    modelRef.current.rotation.y += 0.005;
  });

  return (
    <>
      <group position={[0, 0, -3.7]} rotation={[0, 0, Math.PI]}>
        <mesh geometry={nodes.Plane002.geometry}>
          <meshStandardMaterial side={THREE.DoubleSide} map={texture} />
        </mesh>
      </group>
      <group ref={modelRef} scale={0.8}>
        {[ModelPart1, ModelPart2, ModelPart3, ModelPart4].map((ref, i) => (
          <group key={i} ref={ref}>
            <mesh
              geometry={model.nodes[`Low_Poly${i ? `00${i}` : ""}`].geometry}
            >
              <MeshTransmissionMaterial
                {...materialsProps}
                // map={map1}
                // roughnessMap={map2}
                // normalMap={map3}
                // transparent={true}
              />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
}
