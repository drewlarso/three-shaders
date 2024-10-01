import './style.css'
import MainScene from './MainScene'
import { OrthographicCamera, WebGLRenderer } from 'three'

const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
const scene = new MainScene(camera)
scene.init()
const renderer = new WebGLRenderer({
    canvas: document.querySelector('#app') as HTMLCanvasElement,
})

renderer.setSize(window.innerWidth, window.innerHeight)
addEventListener('resize', (_) => {
    renderer.setSize(window.innerWidth, window.innerHeight)
})

function tick() {
    scene.update()
    renderer.render(scene, camera)
    requestAnimationFrame(tick)
}

tick()
