import CustomScene from './scenes/CustomScene'
import circleVertShader from './shaders/circle.vert.glsl?raw'
import circleFragShader from './shaders/circle.frag.glsl?raw'
import { Mesh, PerspectiveCamera, ShaderMaterial, SphereGeometry } from 'three'

export default class MainScene extends CustomScene {
    geometry!: SphereGeometry
    material!: ShaderMaterial
    mesh!: Mesh
    keys: Set<string> = new Set()

    constructor() {
        super()
        this.geometry = new SphereGeometry(1, 64, 64)
        this.material = new ShaderMaterial({
            uniforms: {
                time: { value: 0 },
            },
            vertexShader: circleVertShader,
            fragmentShader: circleFragShader,
            wireframe: true,
        })

        this.camera = new PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            100
        )
    }

    init() {
        this.mesh = new Mesh(this.geometry, this.material)
        this.add(this.mesh)

        this.camera.position.set(0, 0, 5)
    }

    update() {
        // const deltaTime = this.clock.getDelta()
        const elapsedTime = this.clock.getElapsedTime()

        this.mesh.rotation.y += 0.0025

        this.material.uniforms.time.value = elapsedTime
    }
}
