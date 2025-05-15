import { MeshReflectorMaterial, OrbitControls, Text, Reflector, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { degToRad } from "three/src/math/MathUtils";

export default function Reflection() {
  return (
    <Canvas>
      <color attach="background" args={["black"]} />
      <fog attach="fog" args={["black", 15, 20]} />
      <OrbitControls />
      <ambientLight intensity={5} />
      <spotLight position={[0, 10, 0]} intensity={0.3} />
      <directionalLight position={[-20, 0, -10]} intensity={0.7} />
      <group position={[0, .8, 0]}>
        <Text fontSize={2}>Hello</Text>
        <Ground />
      </group>
      {/* <mesh rotation={[degToRad(85), 0, 0]} position={[0, 0, 1]}>
        <planeGeometry args={[5, 3]} />
        <MeshReflectorMaterial
          blur={[0, 0]} // Blur ground reflections (width, height), 0 skips blur
          mixBlur={0} // How much blur mixes with surface roughness (default = 1)
          mixStrength={1} // Strength of the reflections
          mixContrast={1} // Contrast of the reflections
          resolution={256} // Off-buffer resolution, lower=faster, higher=better quality, slower
          mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
          minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
          maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
          distortion={1} // Amount of distortion based on the distortionMap texture
          reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
        />
        <Ground />
      </mesh> */}
    </Canvas>
  );
}

function Ground() {
    const [floor, normal] = useTexture(['/SurfaceImperfections003_1K_var1.jpg', '/SurfaceImperfections003_1K_Normal.jpg'])
    return (
      <Reflector resolution={512} args={[10, 10]} mirror={0.5} mixBlur={10} mixStrength={0.8} rotation={[-Math.PI / 2, 0, Math.PI / 2]} blur={[400, 100]}>
        {(Material, props) => <Material color="#a0a0a0" metalness={0.5} roughnessMap={floor} normalMap={normal} normalScale={[1, 1]} {...props} />}
      </Reflector>
    )
  }