import * as THREE from "three";
import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Reflector, Text, useTexture, useGLTF } from "@react-three/drei";

export default function DREI() {
  return (
    <div className="h-screen w-screen">
      <Canvas
        // concurrent={true}
        // gl={{ alpha: false }}
        // pixelRatio={[1, 1.5]}
        // camera={{ position: [0, 3, 100], fov: 15 }}
        // className="h-fulll w-full"
      >
        <color attach="background" args={["black"]} />
        <fog attach="fog" args={["black", 15, 20]} />
        <Suspense fallback={null}>
          <group position={[0, -1, 0]}>
            <Carla
              rotation={[0, Math.PI - 0.4, 0]}
              position={[0, 1, 0.6]}
              scale={[1, 1, 1]}
            />
            <VideoText position={[0, 1.3, -2]} />
            <Ground />
          </group>
          <ambientLight intensity={0.5} />
          <spotLight position={[0, 10, 0]} intensity={0.3} />
          <directionalLight position={[-50, 0, -40]} intensity={0.7} />
          <Intro />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Carla(props) {
  const { scene } = useGLTF("LOGO/MainLogoMAIN.glb");
  return <primitive object={scene} {...props} />;
}

function VideoText(props) {
  const [video] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: "https://cdn.pixabay.com/video/2025/04/29/275633_large.mp4",
      crossOrigin: "Anonymous",
      loop: true,
      muted: true,
    })
  );

  useEffect(() => {
    video.play();
  }, [video]);

  const videoTexture = new THREE.VideoTexture(video);
  videoTexture.encoding = THREE.sRGBEncoding;
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoTexture.format = THREE.RGBFormat;

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[5, 5]} />
      <meshBasicMaterial map={videoTexture} toneMapped={false} />
    </mesh>
  );
}

function Ground() {
//   const [floor, normal] = useTexture(["/drei/SurfaceImperfections003_1K_var1.jpg","/drei/SurfaceImperfections003_1K_Normal.jpg"]);
  const floors = useTexture("/drei/SurfaceImperfections003_1K_var1.jpg");
  const normals = useTexture("/drei/SurfaceImperfections003_1K_Normal.jpg");

  return (
    <Reflector
      blur={[400, 100]}
      resolution={512}
      args={[10, 10]}
      mirror={0.5}
      mixBlur={6}
      mixStrength={1.5}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
    >
      {(Material, props) => (
        <Material
          color="#a0a0a0"
          metalness={0.4}
          roughnessMap={floors}
          normalMap={normals}
          normalScale={[2, 2]}
          {...props}
        />
      )}
    </Reflector>
  );
}

function Intro() {
  const [vec] = useState(() => new THREE.Vector3());
  return useFrame((state) => {
    state.camera.position.lerp(
      vec.set(state.mouse.x * 5, 3 + state.mouse.y * 2, 14),
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
}
