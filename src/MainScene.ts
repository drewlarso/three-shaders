import mandelbrotShader from './shaders/mandelbrot.glsl?raw'
import {
    Clock,
    Mesh,
    OrthographicCamera,
    PlaneGeometry,
    Scene,
    ShaderMaterial,
    Vector2,
} from 'three'

export default class MainScene extends Scene {
    geometry!: PlaneGeometry
    material!: ShaderMaterial

    private readonly camera: OrthographicCamera
    private readonly clock: Clock = new Clock()
    private readonly keys: Set<string> = new Set()

    constructor(camera: OrthographicCamera) {
        super()
        this.geometry = new PlaneGeometry(2, 2)
        this.material = new ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                resolution: { value: new Vector2(0, 0) },
                maxIterations: { value: 100 },
                zoom: { value: 1.0 },
                origin: { value: new Vector2(0, 0) },
            },
            fragmentShader: mandelbrotShader,
        })
        this.camera = camera
    }

    init() {
        // create plane
        const mesh = new Mesh(this.geometry, this.material)
        this.add(mesh)

        // setup camera
        this.camera.position.z = 1

        // setup inputs
        document.addEventListener(
            'keydown',
            (event) => {
                this.keys.add(event.key)
            },
            false,
        )
        document.addEventListener(
            'keyup',
            (event) => {
                this.keys.delete(event.key)
            },
            false,
        )
    }

    handleInputs() {
        for (let key of this.keys) {
            if (key === 'q') {
                this.material.uniforms.maxIterations.value = Math.min(
                    this.material.uniforms.maxIterations.value * 1.025,
                    1000,
                )
            } else if (key === 'e') {
                this.material.uniforms.maxIterations.value = Math.max(
                    this.material.uniforms.maxIterations.value / 1.025,
                    10,
                )
            } else if (key === 'z') {
                this.material.uniforms.zoom.value *= 1.025
            } else if (key === 'x') {
                this.material.uniforms.zoom.value /= 1.025
            } else if (key === 'w' || key === 'ArrowUp') {
                this.material.uniforms.origin.value.y +=
                    0.02 / this.material.uniforms.zoom.value
            } else if (key === 'a' || key === 'ArrowLeft') {
                this.material.uniforms.origin.value.x -=
                    0.02 / this.material.uniforms.zoom.value
            } else if (key === 's' || key === 'ArrowDown') {
                this.material.uniforms.origin.value.y -=
                    0.02 / this.material.uniforms.zoom.value
            } else if (key === 'd' || key === 'ArrowRight') {
                this.material.uniforms.origin.value.x +=
                    0.02 / this.material.uniforms.zoom.value
            }
        }
    }

    update() {
        // const deltaTime = this.clock.getDelta()
        const elapsedTime = this.clock.getElapsedTime()

        this.handleInputs()

        this.material.uniforms.time.value = elapsedTime
        this.material.uniforms.resolution.value.set(
            window.innerWidth,
            window.innerHeight,
        )
    }
}
