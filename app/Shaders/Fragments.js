export const fragmentShader = `
  uniform sampler2D uPerlinTexture;
  varying vec2 vUv;

  void main() {
    float smoke = texture(uPerlinTexture,vUv).r;
    gl_FragColor = vec4(smoke,smoke,smoke,0.5);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;
