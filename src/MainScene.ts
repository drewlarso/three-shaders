import juliaShader from './shaders/julia.glsl?raw'
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

    constructor(camera: OrthographicCamera) {
        super()
        this.geometry = new PlaneGeometry(2, 2)
        this.material = new ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                resolution: { value: new Vector2() },
            },
            fragmentShader: juliaShader,
        })
        this.camera = camera
    }

    init() {
        const mesh = new Mesh(this.geometry, this.material)
        this.add(mesh)

        //setup camera
        this.camera.position.z = 1
    }

    update() {
        // const deltaTime = this.clock.getDelta()
        const elapsedTime = this.clock.getElapsedTime()

        this.material.uniforms.time.value = elapsedTime
        this.material.uniforms.resolution.value.set(
            window.innerWidth,
            window.innerHeight
        )
    }
}
