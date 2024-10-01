uniform float time;
uniform vec2 resolution;
uniform int maxIterations;
uniform float zoom;
uniform vec2 origin;

vec3 palette(float t) {
    vec3 a = vec3(0.984, 0.250, 0.313);
    vec3 b = vec3(0.923, 0.273, 0.054);
    vec3 c = vec3(0.548, 0.807, 0.309);
    vec3 d = vec3(2.598, 2.290, 4.940);

    return a + b * cos(6.28318 * (c * t + d));
}

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

    uv = uv / zoom + origin;

    float i = mandelbrot(uv);
    vec3 color = palette(i);

    gl_FragColor = vec4(color, 1.0);
}