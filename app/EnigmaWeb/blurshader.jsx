import React, { useRef, useEffect } from 'react';


export default function WavyBlurGradient() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

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

      // Wave function with animated deformation
      float wave(vec2 uv, float offset, float speed, float frequency, float amplitude) {
          // Add deformation based on time
          float deform = sin(u_time * 0.5) * 0.3; // Animate deformation amount
          float wave = sin(uv.x * frequency + u_time * speed + offset + deform * sin(uv.y * 4.0)) * amplitude;
          // Add secondary deformation wave
          wave += cos(uv.y * 3.0 + u_time * 0.7) * 0.02 * sin(u_time * 0.3);
          return wave + 0.8;
      }

      // Improved shape function with animated thickness
      float createWaveShape(vec2 uv, float waveY, float thickness, float smoothness) {
          float y = 1.0 - uv.y;
          // Animate thickness with time
          float animatedThickness = thickness * (1.0 + 0.2 * sin(u_time * 0.8));
          return smoothstep(waveY - animatedThickness, waveY + animatedThickness, y) * smoothness;
      }

      void main() {
          vec2 uv = v_uv;
          
          vec3 backColor = vec3(1.0, 0.5, 0.0);
          vec3 frontColor = vec3(1.0, 0.3, 0.0);
          
          // Animated wave parameters with reduced frequency for backwave
          float backFreq = 3.0 + sin(u_time * 0.3) * 1.0; // Reduced frequency and animation range
          float frontFreq = 6.0 + sin(u_time * 0.4) * 1.5;
          
          // Added more animated movement to backwave
          float backWave = wave(uv, sin(u_time * 0.2) * 0.5, 0.4, backFreq, .002); // Added offset animation and increased amplitude
          float backShape = createWaveShape(uv, backWave, 0.1, 0.98);
          
          float frontWave = wave(uv, 0.0, 0.8, frontFreq, .001);
          float frontShape = createWaveShape(uv, frontWave, 0.1, 0.98);

          float backBlur = 0.0;
          float frontBlur = 0.0;
          float totalWeight = 0.0;
          
          const int samples = 25;
          for(int i = 0; i < samples; i++) {
              float offset = (float(i) - float(samples) / 2.0) * 0.008;
              float weight = exp(-offset * offset * 10.0);
              vec2 sampleUV = uv + vec2(0.0, offset);
              
              // Apply animated parameters to blur samples with updated backwave
              float backSample = createWaveShape(sampleUV, wave(sampleUV, sin(u_time * 0.2) * 0.5, 0.4, backFreq, 0.25), 0.15, 0.95);
              float frontSample = createWaveShape(sampleUV, wave(sampleUV, 0.0, 0.8, frontFreq, 0.2), 0.13, 0.98);
              
              backBlur += backSample * weight;
              frontBlur += frontSample * weight;
              totalWeight += weight;
          }
          
          backBlur /= totalWeight;
          frontBlur /= totalWeight;

          vec3 finalColor = backColor * backBlur;
          finalColor = mix(finalColor, frontColor, frontBlur * 1.0);
          finalColor = pow(finalColor, vec3(0.9));
          
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
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1
      ]),
      gl.STATIC_DRAW
    );

    const a_position = gl.getAttribLocation(program, "a_position");
    const u_time = gl.getUniformLocation(program, "u_time");
    gl.enableVertexAttribArray(a_position);
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);

    let startTime = Date.now();
    function draw() {
      const currentTime = (Date.now() - startTime) * .001; // Convert to seconds
      gl.uniform1f(u_time, currentTime);
      
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(draw);
    }

    draw();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.cancelAnimationFrame(draw);
    };
  }, []);

  return (
    <canvas
     className='bg-white'
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "block",
      }}
    />
  );
}
