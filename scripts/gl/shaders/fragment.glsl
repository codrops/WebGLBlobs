varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPos;
varying float vDistort;

uniform float uTime;
uniform float uHue;

vec3 palette(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}   

void main() {
  float distort = vDistort * 2.0;
  vec2 uv = vUv;

  vec3 lightDir = normalize(vec3(1.0, 0.0, 0.0));
  float light = dot(lightDir, vNormal);

  vec3 a = vec3(0.5, 0.5, 0.5);
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.00, 0.10, 0.20);

  // vec3 a = vec3(0.5, 0.5, 0.5);
  // vec3 b = vec3(0.5, 0.5, 0.5);
  // vec3 c = vec3(1.0, 1.0, 1.0);
  // vec3 d = vec3(0.30, 0.20, 0.20);

  vec3 color = palette(uHue + distort, a, b, c, d);

  gl_FragColor = vec4(color, 1.0);
}