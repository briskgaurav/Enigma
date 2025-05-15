import { MeshTransmissionMaterial, Text, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";

export default function Mine() {
  const model = useGLTF("/Logo/MainLogoMAIN.glb");
  const [isBrust, setIsBrust] = useState(false);
  const [insideBox, setInsideBox] = useState(false);

  const meshPart1Ref = useRef();
  const weAreTextRef = useRef();
  const enigmaTextRef = useRef();
  const meshPart2Ref = useRef();
  const meshPart3Ref = useRef();
  const meshPart4Ref = useRef();
  const meshRef = useRef();
  const { mouse } = useThree();
  
  const { nodes } = model;
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;

      const boxWidth = 200;
      const boxHeight = 200;

      const centerX = innerWidth / 2;
      const centerY = innerHeight / 2;

      const left = centerX - boxWidth / 1.2;
      const right = centerX + boxWidth / 1.2;
      const top = centerY - boxHeight / 1.2;
      const bottom = centerY + boxHeight / 1.2;

      const isInside =
        e.clientX >= left &&
        e.clientX <= right &&
        e.clientY >= top &&
        e.clientY <= bottom;

      if (isInside && !insideBox) {
        setInsideBox(true);
        brustON();
      } else if (!isInside && insideBox) {
        setInsideBox(false);
        brustOFF();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [insideBox]);

  useFrame(() => {
    if (!isBrust) {
      meshRef.current.rotation.y += 0.01;
    }

    const targetX = mouse.x;
    const targetY = mouse.y;

    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      targetX,
      0.1
    );

    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY,
      0.1
    );
  });

  const brustON = () => {
    if (!isBrust) {
      gsap.to(weAreTextRef.current.material, { opacity: 0, duration: 0.5 });
      gsap.to(enigmaTextRef.current.material, { opacity: 1, duration: 0.5 });
      [
        { ref: meshPart1Ref, props: { x: 0.5, y: -0.5 } },
        { ref: meshPart2Ref, props: { x: 0.5, y: 0.5 } },
        { ref: meshPart3Ref, props: { x: -0.5, y: 0.5 } },
        { ref: meshPart4Ref, props: { x: -0.5, y: -0.5 } },
      ].forEach(({ ref, props }) => {
        gsap.to(ref.current.position, {
          ...props,
          ease: "back.out(2)",
        });
      });
    }
    setIsBrust(true);
  };
  const brustOFF = () => {
    if (isBrust) {
      gsap.to(enigmaTextRef.current.material, { opacity: 0, duration: 0.5 });
      gsap.to(weAreTextRef.current.material, { opacity: 1, duration: 0.5 });
      [
        { ref: meshPart1Ref, props: { x: 0, y: 0, duration: 1 } },
        { ref: meshPart2Ref, props: { x: 0, y: 0, duration: 1 } },
        { ref: meshPart3Ref, props: { y: 0, x: 0, duration: 1 } },
        { ref: meshPart4Ref, props: { y: 0, x: 0, duration: 1 } },
      ].forEach(({ ref, props }) => {
        gsap.to(ref.current.position, {
          ...props,
          ease: "back.out(2)",
        });
      });
    }
    setIsBrust(false);
  };

  const materialsProps = useControls({
    thickness: {
      value: 1.35,
      min: 0,
      max: 3,
      step: 0.05,
    },
    roughness: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.1,
    },
    transmission: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.1,
    },
    ior: {
      value: 1.3,
      min: 0,
      max: 3,
      step: 0.1,
    },
    chromaticAberration: {
      value: 0.67,
      min: 0,
      max: 1,
    },
    backside: {
      value: false,
    },
  });

  return (
    <group>
      <group>
        <Text
          ref={weAreTextRef}
          fontSize={3}
          fontWeight={900}
          position={[0, 0, -1.5]}
          material-opacity={1}
        >
          WE ARE
        </Text>
        <Text
          ref={enigmaTextRef}
          fontSize={3}
          fontWeight={900}
          position={[0, 0, -1.5]}
          material-opacity={0}
        >
          ENIGMA
        </Text>
      </group>


      <group scale={1.5} ref={meshRef}>
        <group ref={meshPart1Ref}>
          <mesh {...nodes.Low_Poly}>
            <MeshTransmissionMaterial {...materialsProps} />
          </mesh>
        </group>

        <group ref={meshPart2Ref}>
          <mesh {...nodes.Low_Poly001}>
            <MeshTransmissionMaterial {...materialsProps} />
          </mesh>
        </group>

        <group ref={meshPart3Ref}>
          <mesh {...nodes.Low_Poly002}>
            <MeshTransmissionMaterial {...materialsProps} />
          </mesh>
        </group>

        <group ref={meshPart4Ref}>
          <mesh {...nodes.Low_Poly003}>
            <MeshTransmissionMaterial {...materialsProps} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
