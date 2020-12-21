import Gl from './gl';
import Blob from './gl/Blob';

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

Gl.scene.add(blob1, blob2, blob3);