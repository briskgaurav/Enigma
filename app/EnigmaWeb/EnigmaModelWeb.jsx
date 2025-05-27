"use client";
import { useGSAP } from "@gsap/react";
import {
  MeshReflectorMaterial,
  MeshTransmissionMaterial,
  Reflector,
  Text,
  useGLTF,
  useTexture,
  useVideoTexture,
} from "@react-three/drei";
import { useControls } from "leva";
import React, { useEffect, useRef, useState } from "react";
import { degToRad, radToDeg } from "three/src/math/MathUtils";
import gsap from "gsap";
import { useFrame, useThree } from "@react-three/fiber";
import ScrollTrigger from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export default function EnigmaModelWeb({}) {
  const modelMesh = useRef(null);
  const model = useGLTF("/Logo/MainLogoMAIN.glb");
  const bgref = useRef(null);
  const [planeRotation, setPlaneRotation] = useState(false);
  const { nodes } = model;

  const planeRef = useRef();
  const planeRef2 = useRef();
  const ModelPart1 = useRef();
  const ModelPart2 = useRef();
  const ModelPart3 = useRef();
  const ModelPart4 = useRef();

  const [toggleBrust, setToggleBrust] = useState(true);

  const videoTexture = useVideoTexture(
    "https://cdn.pixabay.com/video/2023/10/20/185787-876545918_large.mp4"
  );
  const bgTexture = useTexture("/bg.png");

  const modelParts = [
    { ref: ModelPart1, x: 0.3, y: -0.3 },
    { ref: ModelPart2, x: 0.3, y: 0.3 },
    { ref: ModelPart3, x: -0.3, y: 0.3 },
    { ref: ModelPart4, x: -0.3, y: -0.3 },
  ];

  const [modelPlaneRotation, setModelPlaneRotation] = useState({
    x: degToRad(0),
    y: -Math.PI / 2,
    z: degToRad(0),
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (planeRotation) {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const targetY = x / 2;
        gsap.to(modelPlaneRotation, {
          y: targetY,
          duration: 3,
          ease: "power4.out",
          smoothness: 0.5,
        });
      } else {
        setPlaneRotation(false);
        return () => window.removeEventListener("mousemove", handleMouseMove);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [planeRotation]);

  const BrustON = () => {
    if (toggleBrust) {
      modelParts.forEach(({ ref, x, y }) => {
        gsap.to(ref.current.position, {
          x,
          y,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    }
  };

  const BrustOFF = () => {
    if (toggleBrust) {
      modelParts.forEach(({ ref }) => {
        gsap.to(ref.current.position, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".mainSection",
        start: "0% -10%",
        end: "+2800 top",
        scrub: true,
        pin: true,
      },
    });

    tl.to(
      bgref.current.position,
      {
        y: 17,
        duration: 10,
        ease: "linear",
        onComplete: () => {
          setToggleBrust(false);
        },
        onReverseComplete: () => {
          setToggleBrust(true);
        },
      },
      "<"
    );

    tl.to(
      modelMesh.current.rotation,
      {
        y: Math.PI * 2,
        duration: 10,
        ease: "linear",
      },
      "<"
    );
    tl.to(
      modelMesh.current.position,
      {
        x: 0,
        duration: 10,
        ease: "linear",
      },
      "<"
    );
    tl.to(modelMesh.current.scale, {
      x: 10,
      y: 10,
      z: 10,
      delay: 1,
      duration: 10,
      ease: "power2.inOut",
    });

    tl.to(
      planeRef.current.rotation,
      {
        y: 0,
        duration: 5,
        scale: 10,
        delay: 2.5,
        ease: "linear",
        onUpdate: () => {
          setModelPlaneRotation({
            x: planeRef.current.rotation.x,
            y: planeRef.current.rotation.y,
            z: planeRef.current.rotation.z,
          });
        },
        onComplete: () => {
          setPlaneRotation(true);
        },
        onReverseComplete: () => {
          setPlaneRotation(false);
        },
      },

      "<+1"
    );
    tl.to(
      planeRef.current.scale,
      {
        x: 1.8,
        y: 1.8,
        duration: 2,
        ease: "linear",
        overwrite: "auto",
      },
      "<"
    );

    tl.to(
      planeRef2.current.material,
      {
        opacity: 1,
        duration: 2,
        ease: "linear",
      },
      "<+1"
    );
  
  }, []);

  useGSAP(() => {
    const scrollTriggerTimeline2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".thirdSection",
        start: "top -100%",
        end: "100% top",
        scrub: true,
        pin: true,
        // markers: true,
      },
    });
    scrollTriggerTimeline2.to(planeRef.current.position, {
      y: 10,
      duration: 10,
      delay: 15,
      ease: "linear",
      onReverseComplete: () => {
        setPlaneRotation(true);
      },
    });
  });

  const materialsProps = useControls({
    thickness: { value: 3.51, min: 0, max: 10, step: 0.05 },
    backsideThickness: { value: 2.72, min: 0, max: 3 },
    roughness: { value: 0.34, min: 0, max: 1, step: 0.1 },
    reflectivity: { value: 0.74, min: 0, max: 1, step: 0.01 },
    anisotropy: { value: 0, min: 0, max: 1, step: 0.01 },
    chromaticAberration: { value: 0.67, min: 0, max: 1 },
    distortion: { value: 1.68, min: 0, max: 4, step: 0.01 },
    temporalDistortion: { value: 0.03, min: 0, max: 1, step: 0.01 },
    anisotropicBlur: { value: 4.46, min: 0, max: 5, step: 0.01 },
    color: "#ffffff",
    backside: { value: false },

    // transmission: { value: 1, min: 0, max: 1 },
    // ior: { value: 1.3, min: 0, max: 3, step: 0.1 },
    // clearcoat: { value: 1, min: 0.1, max: 1 },
    // clearcoatRoughness: { value: 0.0, min: 0, max: 1 },
    // distortionScale: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
    // ior: { value: 0, min: 0, max: 2, step: 0.01 },
  });

  const normalMap = useTexture("/maps/Material_normal.png");
  const ormMap = useTexture("/maps/Material_occlusionRoughnessMetallic.png");
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.anisotropy = 16;
  const backgroundModel = useGLTF("/EnigmaBG.glb");

  const texture = useTexture("/bg1.png");

  return (
    <group position={[0, -3.5, 0]}>
      <group
        ref={bgref}
        scale={0.8}
        position={[0, 3, -15]}
        rotation={[0, 0, 0]}
      >
        <mesh geometry={backgroundModel.nodes.Plane002.geometry}>
          <meshStandardMaterial side={THREE.DoubleSide} map={texture} />
        </mesh>
      </group>

      <group
        ref={modelMesh}
        onPointerEnter={BrustON}
        onPointerLeave={BrustOFF}
        scale={0.7}
        position={[1.5, 3.4, 25]}
      >
        <group ref={ModelPart1}>
          <mesh {...nodes.Low_Poly}>
            <MeshTransmissionMaterial {...materialsProps} />
          </mesh>
        </group>

        <group ref={ModelPart2}>
          <mesh {...nodes.Low_Poly001}>
            <MeshTransmissionMaterial {...materialsProps} />
          </mesh>
        </group>

        <group ref={ModelPart3}>
          <mesh {...nodes.Low_Poly002}>
            <MeshTransmissionMaterial {...materialsProps} />
          </mesh>
        </group>

        <group ref={ModelPart4}>
          <mesh {...nodes.Low_Poly003}>
            <MeshTransmissionMaterial {...materialsProps} />
          </mesh>
        </group>
      </group>

      <group
        ref={planeRef}
        position={[0, 3.5, 20]}
        rotation={[
          modelPlaneRotation.x,
          modelPlaneRotation.y,
          modelPlaneRotation.z,
        ]}
      >
        <mesh rotation={[degToRad(0), 0, 0]}>
          <planeGeometry args={[3, 1.5]} />
          <meshBasicMaterial map={videoTexture} toneMapped={false} />
        </mesh>

        <mesh
          ref={planeRef2}
          position={[0, -0.8, 0.25]}
          rotation={[degToRad(100), 0, 0]}
        >
          <planeGeometry args={[3, 1.5]} />
          <MeshTransmissionMaterial {...materialsProps} />
        </mesh>
      </group>
    </group>
  );
}
