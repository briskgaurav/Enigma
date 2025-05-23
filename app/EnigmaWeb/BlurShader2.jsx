import React, { useRef, useEffect } from "react";

export default function CenteredWavyBlurShader() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;

      varying vec2 v_uv;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform float u_amplitude;
      uniform float u_frequency;

      float wave(vec2 uv, float frequency, float amplitude, float speed) {
        return sin(uv.x * frequency + (u_time * .3) * speed) * amplitude;
      }

      void main() {
        vec2 uv = v_uv;
        
        // Base colors
        vec3 oceanColor = vec3(1.0, 0.5, 0.0);
        vec3 yellowColor = vec3(0.0, 0.0, 0.0);
        vec3 blackColor = vec3(1.0, .3, 0.0);

        // Create wave
        float wave1 = wave(uv, u_frequency * 0.5, u_amplitude * 1.0, 2.5);
        
        // Create smooth transitions between colors based on y position and wave
        float bottomEdge = smoothstep(0.0, 0.3, uv.y + wave1);
        float topEdge = smoothstep(0.1, 0.5, uv.y + wave1);
        
        // Smoothly blend between colors using the edges
        vec3 bottomColor = mix(blackColor, oceanColor, bottomEdge);
        vec3 finalColor = mix(bottomColor, yellowColor, topEdge);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    function compileShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
      }
      return shader;
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const a_position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(a_position);
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);

    const u_time = gl.getUniformLocation(program, "u_time");
    const u_resolution = gl.getUniformLocation(program, "u_resolution");
    const u_amplitude = gl.getUniformLocation(program, "u_amplitude");
    const u_frequency = gl.getUniformLocation(program, "u_frequency");


    let startTime = Date.now();
    function draw() {
      const currentTime = (Date.now() - startTime) * 0.001;

      gl.uniform1f(u_time, currentTime);
      gl.uniform2f(u_resolution, canvas.width, canvas.height);
      gl.uniform1f(u_amplitude, 0.1);
      gl.uniform1f(u_frequency, 10.0);


      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "block",
        zIndex: -1,
      }}
    />
  );
}
