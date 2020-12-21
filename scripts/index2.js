import Gl from './gl';
import Blob from './gl/Blob';

// size, speed, color, freq, density, strength, offset
const blob = new Blob(4.5, 0.15, 1.0, 2.0, 0.3, Math.PI * 2);   
blob.position.set(0, 0, 0);
blob.rotation.set(0, 0, 0);

Gl.scene.add(blob);