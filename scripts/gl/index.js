import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Blob from './Blob';

function randomRange(min, max){
  return Math.random() * (max-min) + min;
}

export default class {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor('black', 1);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 18);

    this.scene = new THREE.Scene();

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.clock = new THREE.Clock();

    this.mouse = new THREE.Vector2();
    this.mouseTarget = new THREE.Vector2();

    this.init();
    this.addElements();
    this.animate();
  }

  init() {
    this.addCanvas();
    this.addEvents();
  }

  addElements() {
    // size, speed, color, freq, density, strength, offset
    const blob1 = new Blob(0.8, 0.5, 0.0, 2.0, 0.05, Math.PI * 0.5);    
    const blob2 = new Blob(1.75, 0.3, 0.5, 1.5, 0.12, Math.PI * 1);    
    const blob3 = new Blob(6.0, 0.15, 1.0, 2.0, 0.3, Math.PI * 2);   

    blob1.position.set(-1, -4, 4);
    blob2.position.set(-8.5, 3.25, 2);
    blob3.position.set(11, -3, -10);

    blob1.rotation.set(0, 0, 0);
    blob2.rotation.set(-0.4, 0, 0.5);
    blob3.rotation.set(0.4, 1.0, -0.4);

    this.scene.add(blob1, blob2, blob3);
  }

  addCanvas() {
    const canvas = this.renderer.domElement;
    canvas.classList.add('webgl');
    document.body.appendChild(canvas);
  }

  addEvents() {
    window.addEventListener('resize', this.resize.bind(this));
    window.addEventListener('mousemove', this.mouseMove.bind(this));
  }

  resize() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    this.camera.aspect = width / height;
    this.renderer.setSize(width, height);

    this.camera.updateProjectionMatrix();
  }

  mouseMove(e) {
	  // Calculate mouse position in normalized device coordinates
	  // (-1 to +1) for both components
	  this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }

  render() {
    // this.controls.update();

    // Update uniforms
    this.scene.children.forEach(mesh => {
      mesh.material.uniforms.uTime.value = this.clock.getElapsedTime();
    });

    // Lerp movement
    this.mouseTarget.x = lerp(this.mouseTarget.x, this.mouse.x, 0.03);
    this.mouseTarget.y = lerp(this.mouseTarget.y, this.mouse.y, 0.03);

    this.scene.rotation.set(
      this.mouseTarget.y * 0.25,
      this.mouseTarget.x * 0.25,
      0
    );    

    this.renderer.render(this.scene, this.camera);
  }
}

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}
