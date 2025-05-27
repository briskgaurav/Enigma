"use client";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { degToRad } from "three/src/math/MathUtils";

import * as THREE from "three";

export default function Fog3D() {
  return (
    <div className="relative h-screen w-screen">
      <Canvas camera={{ fov: 10, position: [0, 0, 40] }}>
        <Environment preset="sunset" blur={0.5} />
        <ambientLight intensity={0.5} />
        {/* <OrbitControls /> */}

        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Model() {
  const { nodes } = useGLTF("/Logo/MainLogoMAIN.glb");
  const meshRef = useRef();
  const meshRef2 = useRef();
  const meshRef3 = useRef();
  const meshRef4 = useRef();

  return (
    <group
      position={[0, -1, 0]}
      rotation={[degToRad(120), degToRad(-5), degToRad(120)]}
    >
      <mesh
        ref={meshRef}
        geometry={nodes.Low_Poly.geometry}
        onPointerEnter={() => {
          if (meshRef.current) {
            meshRef.current.material.color.set(0xff0ff0);
          }
        }}
        onPointerLeave={() => {
          if (meshRef.current) {
            meshRef.current.material.color.set(0xff0000);
          }
        }}
      >
        <meshStandardMaterial color={0xff0000} />
      </mesh>

      {/* The other meshes without pointer events */}
      <mesh
        ref={meshRef2}
        onPointerEnter={() => {
          if (meshRef.current) {
            meshRef.current.material.color.set(0xff0ff0);
          }
        }}
        onPointerLeave={() => {
          if (meshRef.current) {
            meshRef.current.material.color.set(0xff0000);
          }
        }}
        geometry={nodes.Low_Poly001.geometry}
      >
        <meshStandardMaterial color={0xff0000} />
      </mesh>

      <mesh
        ref={meshRef3}
        onPointerEnter={() => {
          if (meshRef3.current) {
            meshRef3.current.material.color.set(0xff0ff0);
          }
        }}
        onPointerLeave={() => {
          if (meshRef.current) {
            meshRef.current.material.color.set(0xff0000);
          }
        }}
        geometry={nodes.Low_Poly002.geometry}
      >
        <meshStandardMaterial color={0xff0000} />
      </mesh>

      <mesh
        ref={meshRef4}
        onPointerEnter={() => {
          if (meshRef.current) {
            meshRef4.current.material.color.set(0xff0ff0);
          }
        }}
        onPointerLeave={() => {
          if (meshRef4.current) {
            meshRef4.current.material.color.set(0xff0000);
          }
        }}
        geometry={nodes.Low_Poly003.geometry}
      >
        <meshStandardMaterial color={0xff0000} />
      </mesh>
    </group>
  );
}
