import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

export default class Blob extends THREE.Object3D {
  constructor(size, speed, color, density, strength, offset) {
    super();

    this.geometry = new THREE.IcosahedronGeometry(size, 64);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uNoiseDensity: { value: density },
        uNoiseStrength: { value: strength },
        uFreq: { value: 3 },
        uAmp: { value: 6 },
        uHue: { value: color },
        uOffset: { value: offset },
      },
      defines: {
        PI: Math.PI
      },
      // wireframe: true,
      // side: THREE.DoubleSide
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.add(this.mesh);
  }
}