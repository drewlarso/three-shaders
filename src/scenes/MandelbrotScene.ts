import CustomScene from './CustomScene'
import mandelbrotShader from '../shaders/mandelbrot.glsl?raw'
import {
    Mesh,
    OrthographicCamera,
    PlaneGeometry,
    ShaderMaterial,
    Vector2,
} from 'three'

export default class MandelbrotScene extends CustomScene {
    geometry!: PlaneGeometry
    material!: ShaderMaterial
    keys: Set<string> = new Set()

    constructor() {
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
        this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
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
            false
        )
        document.addEventListener(
            'keyup',
            (event) => {
                this.keys.delete(event.key)
            },
            false
        )
    }

    handleInputs() {
        for (let key of this.keys) {
            switch (key) {
                case 'q':
                    this.material.uniforms.maxIterations.value = Math.min(
                        this.material.uniforms.maxIterations.value * 1.025,
                        1000
                    )
                    break
                case 'e':
                    this.material.uniforms.maxIterations.value = Math.max(
                        this.material.uniforms.maxIterations.value / 1.01,
                        10
                    )
                    break
                case 'z':
                    this.material.uniforms.zoom.value *= 1.01
                    break
                case 'x':
                    this.material.uniforms.zoom.value /= 1.01
                    break
                case 'w':
                    this.material.uniforms.origin.value.y +=
                        0.01 / this.material.uniforms.zoom.value
                    break
                case 'a':
                    this.material.uniforms.origin.value.x -=
                        0.01 / this.material.uniforms.zoom.value
                    break
                case 's':
                    this.material.uniforms.origin.value.y -=
                        0.01 / this.material.uniforms.zoom.value
                    break
                case 'd':
                    this.material.uniforms.origin.value.x +=
                        0.01 / this.material.uniforms.zoom.value
                    break
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
            window.innerHeight
        )
    }
}
