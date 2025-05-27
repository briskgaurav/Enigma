import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import Solutions from "./Solutions";

const OrangeBlurShaderMaterial = {
  uniforms: {
    uResolution: { value: new THREE.Vector2() },
    uTime: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    precision mediump float;

    uniform vec2 uResolution;
    uniform float uTime;
    varying vec2 vUv;

    float blob(vec2 uv, vec2 center, float radius, float blur) {
      float dist = distance(uv, center);
      return smoothstep(radius + blur, radius - blur, dist);
    }

    void main() {
      float y = vUv.y;

      vec3 black = vec3(0.0);
      vec3 orange = vec3(1.0, 0.35, 0.0);
      vec3 white = vec3(1.0);

      float blend1 = smoothstep(0.0, 0.6, y);   // black → orange
      float blend2 = smoothstep(0.1, 0.95, y);  // orange → white

      vec3 color = mix(black, orange, blend1);
      color = mix(color, white, blend2);

      float wave1 = blob(vUv, vec2(0.5 + 0.2 * sin(uTime * 0.5), 0.4 + 0.1 * cos(uTime * 0.3)), 0.25, 0.25);
      float wave2 = blob(vUv, vec2(0.6 + 0.3 * cos(uTime * 0.4), 0.7 + 0.2 * sin(uTime * 0.5)), 0.3, 0.3);

      vec3 waveColor = vec3(1.0, 0.35, 0.0);
color = mix(color, waveColor, wave1 * 0.8);
color = mix(color, waveColor, wave2 * 0.8);

      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

function FullscreenPlane({ screen }) {
  const { viewport, size } = useThree();
  const materialRef = useRef();

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
    }
  }, [size]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]} rotation={[0,0, screen === "testimonials" ? Math.PI : 0]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        args={[OrangeBlurShaderMaterial]}
        attach="material"
      />
    </mesh>
  );
}

export default function OrangeBlurBackground({ screen }) {
  return (
    <div className="w-screen h-[110vh] relative">
      <Canvas>
        <FullscreenPlane screen={screen} />
      </Canvas>
      {screen === "testimonials" && (
        <div className="absolute inset-0 flex items-center justify-center text-white text-center text-7xl px-4">
          Enigma is a collective of Creators, Discoverers, Dreamers & Doers.
        </div>
      )}
      {screen === "solutions" && (
       <Solutions />
      )}
    </div>
  );
}
