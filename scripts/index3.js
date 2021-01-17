import Gl from './gl';
import Blob from './gl/Blob';

import gsap from 'gsap';

class App {
  constructor() {
    this.blobs = [];
    this.addBlobs();

    // Main animation tl
    this.tl = gsap.timeline({
      delay: 0.25,
    });

    this.tl
      .add(this.article())
      .add(this.animBlobs(), '-=1.5');
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

  article() {
    // Main content
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.inOut',
      }
    });

    // Content clip
    const content = document.querySelector('.content span');
    const contentClip = { x: 0 };    

    tl
      .from('.title div, .subtitle div', {
        duration: 2,
        xPercent: -100,
        // stagger: 0.1,
      })
      .from('.menu__inner-translate', {
        duration: 1.5,
        yPercent: -100,
      }, '-=1.5')
      .to(contentClip, {
        duration: 1.5,
        x: 100,
        onUpdate: () => {
          content.style.setProperty('--clip', `${contentClip.x}%`);
        },
      }, '-=1.25')
      .from('.play', {
        duration: 1,
        scale: 0,
        rotate: '-62deg',
      }, '-=1.5');

    return tl;    
  }

  animBlobs() {
    // Move Threejs Blobs
    const tl = gsap.timeline();

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
      
    return tl;
  }
}

new App();