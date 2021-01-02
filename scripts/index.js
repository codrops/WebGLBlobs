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
    const blob1 = new Blob(1.75, 0.3, 0.5, 1.5, 0.12, Math.PI * 1);    
    const blob2 = new Blob(6.0, 0.15, 1.0, 2.0, 0.3, Math.PI * 2);   
    const blob3 = new Blob(0.8, 0.5, 0.0, 2.0, 0.05, Math.PI * 0.5);    

    blob1.position.set(-8.5, 3.25, 2);
    blob2.position.set(11, -3, -10);
    blob3.position.set(-1, -4, 4);

    blob1.rotation.set(-0.4, 0, 0.5);
    blob2.rotation.set(0.4, 1.0, -0.4);
    blob3.rotation.set(0, 0, 0);

    this.blobs = [blob1, blob2, blob3];
    
    Gl.scene.add(...this.blobs);
  }

  animBlobs() {
    const tl = gsap.timeline({
      defaults: {
        duration: 2,
        ease: 'power3.inOut'
      },
      delay: 1,
    });

    const uniformAlphas = [
      this.blobs[0].mesh.material.uniforms.uAlpha,
      this.blobs[1].mesh.material.uniforms.uAlpha,
      this.blobs[2].mesh.material.uniforms.uAlpha,
    ];

    tl
      .from(this.blobs[0].position, { z: -5 })
      .from(this.blobs[1].position, { z: -30 }, '-=1.75')
      .from(this.blobs[2].position, { z: 12 }, '-=1.75')
      .from(uniformAlphas, {
        value: 0,
        stagger: 0.2,
        ease: 'power3.inOut'
      }, 0);
  }
}

new App();