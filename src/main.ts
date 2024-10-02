import './style.css'
import MainScene from './MainScene'
import { WebGLRenderer } from 'three'
import CustomScene from './scenes/CustomScene'
import MandelbrotScene from './scenes/MandelbrotScene'

const mainScene: CustomScene = new MainScene()
mainScene.init()

const mandelbrotScene: CustomScene = new MandelbrotScene()
mandelbrotScene.init()

let currentScene = mainScene

const renderer = new WebGLRenderer({
    canvas: document.querySelector('#app') as HTMLCanvasElement,
})

renderer.setSize(window.innerWidth, window.innerHeight)
addEventListener('resize', (_) => {
    renderer.setSize(window.innerWidth, window.innerHeight)
})

function tick() {
    currentScene.update()
    renderer.render(currentScene, currentScene.camera)
    requestAnimationFrame(tick)
}

tick()
