import { Clock, OrthographicCamera, PerspectiveCamera, Scene } from 'three'

export default abstract class CustomScene extends Scene {
    camera!: PerspectiveCamera | OrthographicCamera
    readonly clock: Clock = new Clock()

    abstract init(): void
    abstract update(): void
}
