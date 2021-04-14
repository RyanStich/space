import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
*/

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5

    console.log(cursor.x, cursor.y)
})


const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/particles/4.png')


const particlesGeometry = new THREE.BufferGeometry(1,32,32)
const count =  375

const positions = new Float32Array(count * 3)

for(let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10
}

particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
)

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.25,
    sizeAttenuation: true,
    color: 'blue'
    
})
particlesMaterial.map = particleTexture
particlesMaterial.transparent = true
particlesMaterial.alphaMap = particleTexture
particlesMaterial.alphaTest = 0.001
particlesMaterial.depthWrite = false
particlesMaterial.blending = THREE.AdditiveBlending


// points

const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

const cursor = {
    x: 0,
    y: 0
}


window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
})
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()


const tick = () =>
{
    const elapsedTime = clock.getElapsedTime() 

    var time = Date.now() * 0.00003;

    // Update camera
    camera.position.x += (cursor.x - camera.position.x) * 0.05;
    camera.position.y += (-cursor.y - camera.position.y) * 0.05;

    // animation 
    for (let i = 0; i < scene.children.length; i++) {

        var object = scene.children[i];


            object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // update


    

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()