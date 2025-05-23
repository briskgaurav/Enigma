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

export default function EnigmaModelWeb({
  onHold,
  setOnHold,
  isholding,
  setIsholding,
}) {
  const modelMesh = useRef(null);
  const model = useGLTF("/Logo/MainLogoMAIN.glb");
  const bgref = useRef(null);
  const BGModel = useGLTF("/BG2.glb");
  const [planeRotation, setPlaneRotation] = useState(false);
  const { nodes } = model;

  const planeRef = useRef();
  const TextRef = useRef();
  const planeRef2 = useRef();
  const ModelPart1 = useRef();
  const ModelPart2 = useRef();
  const ModelPart3 = useRef();
  const ModelPart4 = useRef();

  const backgroundNoise = useRef();
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

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (planeRotation) {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        gsap.to(planeRef.current.rotation, {
          y: x / 2,
          duration: 2,
          ease: "power2.out",
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
    modelParts.forEach(({ ref, x, y }) => {
      gsap.to(ref.current.position, {
        x,
        y,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  };

  const BrustOFF = () => {
    modelParts.forEach(({ ref }) => {
      gsap.to(ref.current.position, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    });
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
        y: 10,
        duration: 10,
        ease: "linear",
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
      x: 20,
      y: 20,
      z: 20,
      delay: 1,
      duration: 10,
      ease: "power2.inOut",
      onComplete: () => {
        setPlaneRotation(true);
      },
      onReverseComplete: () => {
        setPlaneRotation(false);
      },
    });

    tl.to(
      planeRef.current.rotation,
      {
        y: 0,
        duration: 5,
        scale: 10,
        delay: 2,
        ease: "linear",
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
      },
      "<"
    );
    tl.to(
      planeRef2.current.material,
      {
        opacity: 0.2,
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
        markers: true,
      },
    });
    scrollTriggerTimeline2.to(planeRef.current.position, {
      y: 10,
      duration: 10,
      delay: 10,
      ease: "linear",
    });
  });

  const materialsProps = useControls({
    thickness: { value: 1.35, min: 0, max: 10, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.3, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.67, min: 0, max: 1 },
    backside: { value: false },
  });

  const normalMap = useTexture("/maps/Material_normal.png");
  const ormMap = useTexture("/maps/Material_occlusionRoughnessMetallic.png");
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.anisotropy = 16;

  return (
    <group position={[0, -3.5, 0]}>
      <group ref={bgref} scale={1.1} position={[0, 3, 2]}>
        <mesh>
          <planeGeometry args={[15, 8]} />
          <shaderMaterial
            fragmentShader={`
              uniform sampler2D map;
              uniform vec2 resolution;
              varying vec2 vUv;

              void main() {
                vec2 uv = vUv;
                float blur = smoothstep(0.0, .5, uv.y);
                vec2 offset = vec2(0.0, 0.01) * (1.0 - blur);
                
                vec4 color = texture2D(map, uv +0.0);
                color.rgb *= vec3(1.0, 0.7, 0.0); // Orange tint
                
                gl_FragColor = mix(
                  vec4(color.rgb, 1.0),
                  vec4(color.rgb, 0.0), 
                  1.0 - blur
                );
              }
            `}
            vertexShader={`
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `}
            uniforms={{
              map: { value: bgTexture },
              resolution: { value: [1, 1] },
            }}
            transparent={true}
          />
        </mesh>
      </group>
      <group ref={TextRef} scale={0.8} position={[-1.5, 3, 3]}>
        <Text
          color={"#ffffff"}
          fontSize={1.5}
          fontWeight={600}
          material-opacity={0}
          position={[-3.5, 1.5, 0]}
        >
          Digital
        </Text>
        <Text
          fontSize={1.5}
          color={"#000000"}
          position={[-1.9, 0, 0]}
          fontWeight={600}
          material-opacity={0}
        >
          Experience
        </Text>
        <Text
          fontSize={1.5}
          position={[-0.5, -1.5, 0]}
          fontWeight={600}
          color={"#000000"}
          material-opacity={0}
        >
          Design Agency
        </Text>
      </group>

      <group
        ref={modelMesh}
        onPointerEnter={BrustON}
        onPointerLeave={BrustOFF}
        scale={0.7}
        position={[1.5, 3.5, 25]}
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
        rotation={[degToRad(0), -Math.PI / 2, 0]}
      >
        <mesh rotation={[degToRad(0), 0, 0]}>
          <planeGeometry args={[3, 1.5]} />
          <meshBasicMaterial map={videoTexture} toneMapped={false} />
        </mesh>

        <mesh
          ref={planeRef2}
          position={[0, -1, 0.25]}
          rotation={[degToRad(100), 0, 0]}
        >
          <planeGeometry args={[3, 1.5]} />
          <MeshTransmissionMaterial {...materialsProps} />
        </mesh>
      </group>
    </group>
  );
}
// function Ground({ planeRef2 }) {
//   const floors = useTexture("/drei/SurfaceImperfections003_1K_var1.jpg");
//   const normals = useTexture("/drei/SurfaceImperfections003_1K_Normal.jpg");

//   return (
//     <Reflector
//       blur={[50, 220]}
//       resolution={1024}
//       position={[0, -0.8, 2.5]}
//       ref={planeRef2}
//       rotation={[-Math.PI / 2, 0, Math.PI]}
//       args={[3, 5]}

//       mirror={1}
//       mixBlur={6}
//       mixStrength={1.5}
//     >
//       {(Material, props) => (
//         <Material
//           metalness={1}
//           opacity={0}
//           normalMap={normals}
//           normalScale={[4, 4]}
//           {...props}
//         />
//       )}
//     </Reflector>
//   );
// }
