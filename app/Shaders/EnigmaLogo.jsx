import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Loader, OrbitControls, useGLTF } from "@react-three/drei";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { degToRad } from "three/src/math/MathUtils";
function MyModel() {
  const gltf = useGLTF("/MainModel.glb");
  const { nodes } = gltf;
  const Logo = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const scrollT = gsap.timeline({
      scrollTrigger: {
        trigger: "#section2",
        start: "top 90%",
        scrub: true,
        end: "top 0%",
        scroller: "body",
        endTrigger: "#section3",
      },
    });
    const rotationTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#section2",
        start: "top 100%",
        scrub: true,
        end: "top 0%",
        scroller: "body",
        endTrigger: "#section3",
      },
    });
    rotationTimeline.to(Logo.current.rotation, {
      y: degToRad(440),
      duration: 3,
      // repeat:2,
      ease: "linear",
    });
    rotationTimeline.to(Logo.current.rotation, {
      y: degToRad(-430),
      duration: 3,
      // repeat:2,
      ease: "linear",
    });

    scrollT.to(Logo.current.position, {
      x: -10,
      duration: 2.5,
      ease: "linear",
    });
    scrollT.to(Logo.current.position, {
      x: 10,
      duration: 2.5,
      ease: "linear",
    });
  }, []);

  // useFrame((state, delta) => {
  //   const { mouse } = state;
  //   const x = mouse.x;
  //   const y = mouse.y;
  //   Logo.current.position.x = -x * 0.3;
  //   Logo.current.position.y = -y * 0.3;
    
  // });

  return (
    <group
      dispose={null}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[0.5, 0.5, 0.5]}
    >
      <mesh
        ref={Logo}
        receiveShadow
        geometry={nodes.Low_Poly.geometry}
        material={nodes.Low_Poly.material}
      >
        <meshPhysicalMaterial
          transmission={0.8}
          roughness={0.1}
          thickness={0.5}
          ior={1.45}
          transparent
          opacity={1}
          chromaticAberration={10}
          metalness={0.6}
          reflectivity={1}
          color={"transparent"}
          envMapIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

function EnigmaLogo({}) {
  const canvasRef = useRef(null);
  return (
    <div className="h-screen w-screen z-[5] fixed top-0 pointer-events-none inset-0 left-0 bg-transparent">
      <Canvas ref={canvasRef} camera={{ fov: 75, position: [0, 5, 0] }} shadows>
        {/* <ScrollControls > */}
        <ambientLight intensity={5} color={"white"} />
        {/* <OrbitControls /> */}
        {/* <axesHelper args={[5]} scale={1}/> */}
        <Environment files="/hdir.hdr" />
        <mesh receiveShadow>
          <Suspense>
            <MyModel />
          </Suspense>
        </mesh>
        {/* </ScrollControls> */}
      </Canvas>
    </div>
  );
}

export default EnigmaLogo;
