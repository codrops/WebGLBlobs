import Gl from './gl';
import Blob from './gl/Blob';

// size, speed, color, freq, density, strength, offset
const blob1 = new Blob(3, 0.3, 0.25, 2.0, 0.15, Math.PI * 1);    
const blob2 = new Blob(3, 0.25, 0.5, 1.5, 0.12, Math.PI * 0);    
blob1.position.set(-5, 0, 0);
blob2.position.set(5, 0, 0);

Gl.scene.add(blob1, blob2);