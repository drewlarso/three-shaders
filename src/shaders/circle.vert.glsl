uniform float time;

varying vec3 vPosition;

void main() {
    vec3 newPosition = position;
    newPosition.x *= 2.0;
    newPosition.z *= 0.75;
    newPosition.y += sin(time * 5.0 + position.x * 10.0) * 0.2;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}