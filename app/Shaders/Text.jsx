import { Canvas, useLoader } from "@react-three/fiber";
import { Edges, Text3D } from "@react-three/drei";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

export default function TextComponent() {
  return (
    <Canvas >
      <Text3D position={[-6, -.5, 0]} rotation={[0, 0, 0]}
        font={"/Gilroy.json"}
        size={1.2}
        bevelEnabled
        bevelThickness={0}
        bevelSize={0}
        bevelSegments={1}
      >
        WE ARE ENIGMA
        <meshBasicMaterial color={"#000000"} />
     
      </Text3D>
    </Canvas>
  );
}
