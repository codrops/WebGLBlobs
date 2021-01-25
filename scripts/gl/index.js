import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Blob from './Blob';
import gsap from 'gsap';

export default new class Gl {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor( 0xffffff, 0 );

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
    this.animate();
  }

  init() {
    this.addCanvas();
    this.addEvents();
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

    // Remove loading class when scene has objects
    if (this.scene.children.length > 0) {
      document.body.classList.remove('loading');
    }

    // Update uniforms
    this.scene.children.forEach(mesh => {
      mesh.material.uniforms.uTime.value = this.clock.getElapsedTime();
    });

    // Lerp movement
    this.mouseTarget.x = gsap.utils.interpolate(this.mouseTarget.x, this.mouse.x, 0.03);
    this.mouseTarget.y = gsap.utils.interpolate(this.mouseTarget.y, this.mouse.y, 0.03);

    this.scene.rotation.set(
      this.mouseTarget.y * 0.25,
      this.mouseTarget.x * 0.25,
      0
    );    

    this.renderer.render(this.scene, this.camera);
  }
}