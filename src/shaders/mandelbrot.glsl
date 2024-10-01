uniform float time;
uniform vec2 resolution;
uniform int maxIterations;

float mandelbrot(vec2 c) {
    vec2 z = vec2(0.0);

    for (int i = 0; i < maxIterations; i++) {
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;

        if (dot(z, z) > 4.0) {
            return float(i) / float(maxIterations);
        }
    }

    return 0.0;
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;

    float i = mandelbrot(uv);

    gl_FragColor = vec4(vec3(i), 1.0);
}