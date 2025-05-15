// components/TrailCanvas.jsx
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

const TRAIL_COUNT = 15;
const TRAIL_SPEED = 0.3;
const TRAIL_BLUR = 0.15;
const IDLE_TIMEOUT = 500; // ms
const IDLE_TRAVEL_TIME = 2.0; // seconds

function Trail() {
  const meshRef = useRef();
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const lerped = useRef(
    Array.from({ length: TRAIL_COUNT }, () => new THREE.Vector2(0.5, 0.5))
  );

  const lastMoveTime = useRef(performance.now());
  const isMoving = useRef(false);
  const idleElapsed = useRef(0);

  const idleTravelTime = useRef(0);
  const idleDirection = useRef({ start: new THREE.Vector2(), end: new THREE.Vector2() });

  const uniforms = useMemo(() => {
    const posUniforms = {};
    for (let i = 0; i < TRAIL_COUNT; i++) {
      posUniforms[`uTrail${i}`] = { value: new THREE.Vector2(0.5, 0.5) };
    }
    return {
      ...posUniforms,
      uTime: { value: 0 },
      uFade: { value: 0 },
    };
  }, []);

  const { size } = useThree();

  useEffect(() => {
    const handleMove = (e) => {
      const x = e.clientX / size.width;
      const y = 1.0 - e.clientY / size.height;
      mouse.current.set(x, y);
      lastMoveTime.current = performance.now();
      isMoving.current = true;
      idleElapsed.current = 0;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [size]);

  const setRandomIdleDirection = () => {
    const randEdge = Math.floor(Math.random() * 4);
    const start = new THREE.Vector2();
    const end = new THREE.Vector2();

    switch (randEdge) {
      case 0: start.set(-0.2, Math.random()); break;       // left
      case 1: start.set(Math.random(), 1.2); break;        // top
      case 2: start.set(1.2, Math.random()); break;        // right
      case 3: start.set(Math.random(), -0.2); break;       // bottom
    }

    idleDirection.current = { start, end };
    idleTravelTime.current = 0;
  };

  useFrame(({ clock }) => {
    const now = performance.now();
    const idleTime = now - lastMoveTime.current;

    if (idleTime > IDLE_TIMEOUT) {
      if (isMoving.current) {
        isMoving.current = false;
        idleElapsed.current = 0;
        setRandomIdleDirection();
      }

      idleElapsed.current += 0.016;
      idleTravelTime.current += 0.016;

      if (idleTravelTime.current > IDLE_TRAVEL_TIME) {
        setRandomIdleDirection();
      }

      const t = Math.min(idleTravelTime.current / IDLE_TRAVEL_TIME, 1.0);
      const animatedPos = new THREE.Vector2().lerpVectors(
        idleDirection.current.start,
        idleDirection.current.end,
        t
      );
      mouse.current.copy(animatedPos);
    } else {
      isMoving.current = true;
      idleElapsed.current = 0;
    }

    // Trail update
    for (let i = TRAIL_COUNT - 1; i > 0; i--) {
      lerped.current[i].lerp(lerped.current[i - 1], TRAIL_SPEED);
    }
    lerped.current[0].lerp(mouse.current, TRAIL_SPEED);

    for (let i = 0; i < TRAIL_COUNT; i++) {
      uniforms[`uTrail${i}`].value.set(
        lerped.current[i].x,
        lerped.current[i].y
      );
    }

    uniforms.uFade.value = THREE.MathUtils.lerp(
      uniforms.uFade.value,
      1.0,
      0.1
    );
    uniforms.uTime.value = clock.elapsedTime;
  });

  const fragmentShader = `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uFade;

    ${Array.from(
      { length: TRAIL_COUNT },
      (_, i) => `uniform vec2 uTrail${i};`
    ).join("\n")}

    float grid(vec2 uv, float scale) {
      vec2 grid = fract(uv * scale);
      float line = step(grid.x, 0.05) * step(grid.y, 0.05);
      return line;
    }

    void main() {
      vec3 color = vec3(0.0);
      float alpha = 0.0;

      for (int i = 0; i < ${TRAIL_COUNT}; i++) {
        vec2 pos = vec2(0.0);
        ${Array.from(
          { length: TRAIL_COUNT },
          (_, i) => `if (i == ${i}) pos = uTrail${i};`
        ).join("\n")}
        float d = distance(vUv, pos);
        float strength = smoothstep(${TRAIL_BLUR}, 0.0, d);
        float fade = 1.0 - float(i) / float(${TRAIL_COUNT});
        alpha += strength * fade;
        color += vec3(0.0, 1.0, 1.0);
      }

      float g = grid(vUv, 40.0);
      vec3 gridColor = vec3(g);
      color += mix(color, gridColor, step(0.5, uFade));
      gl_FragColor = vec4(color, alpha * 0.2 * uFade);
    }
  `;

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
      />
    </mesh>
  );
}

export default function MouseTrailCursor() {
  return (
    <div className="h-screen w-screen relative">
      <Canvas
        className="absolute h-full w-full left-0 top-0"
        gl={{ antialias: true }}
        camera={{ position: [0, 0, 1], fov: 45 }}
      >
        <Trail />
      </Canvas>
    </div>
  );
}
