uniform float time;

varying vec3 vPosition;

void main() {
    vec3 color = 1.0 - vPosition;
    gl_FragColor = vec4(color, 1.0);
}