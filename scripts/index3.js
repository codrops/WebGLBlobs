import Gl from './gl';
import Blob from './gl/Blob';

import gsap from 'gsap';

class App {
  constructor() {
    this.blobs = [];

    this.addBlobs();
    this.animBlobs();
  }

  addBlobs() {
    // size, speed, color, freq, density, strength, offset
    const blob1 = new Blob(3, 0.3, 0.25, 2.0, 0.15, Math.PI * 1);    
    const blob2 = new Blob(3, 0.25, 0.5, 1.5, 0.12, Math.PI * 0);    
    blob1.position.set(-5, 0, 0);
    blob2.position.set(5, 0, 0);

    this.blobs = [blob1, blob2];
    
    Gl.scene.add(...this.blobs);
  }

  animBlobs() {
    const tl = gsap.timeline({ delay: 1 });

    const scales = [
      this.blobs[0].scale,
      this.blobs[1].scale,
    ];

    tl
      .from(scales, {
        duration: 2,
        x: 0,
        y: 0,
        z: 0,
        ease: 'power3.inOut',
        stagger: 0.2,
      });
  }
}

new App();