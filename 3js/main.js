import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const scene = new THREE.Scene();

// Plane
const geometry2 = new THREE.PlaneGeometry(20, 20);
const material2 = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry2, material2);
plane.rotateX(5);
plane.position.set(0, -0.6, 0);
plane.receiveShadow = true;
scene.add(plane);

const plane2 = new THREE.Mesh(geometry2, material2);
plane2.rotateX(.25);
plane2.position.set(0, -0.6, -1);
plane2.receiveShadow = true;
scene.add(plane2);

// Load the Blender model
const loader = new GLTFLoader();
let blenderModel;

loader.load("minecraft.glb", (gltf) => {
    blenderModel = gltf.scene;
    blenderModel.scale.set(0.5, 0.5, 0.5);
    blenderModel.position.set(0, 0, 0);
    blenderModel.rotateX(5);
    blenderModel.castShadow = true;
    scene.add(blenderModel);
});

// Light
const pointLight = new THREE.PointLight(0xff00ff, 2000, 100);
pointLight.position.set(-20, 20, 30);
pointLight.shadow.mapSize.width = 4096;
pointLight.shadow.mapSize.height = 4096;
pointLight.castShadow = true;
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0x00ffff, 2000, 100);
pointLight2.position.set(20, 20, 30);
pointLight2.shadow.mapSize.width = 4096;
pointLight2.shadow.mapSize.height = 4096;
pointLight2.castShadow = true;
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xffffff, 2500, 100);
pointLight3.position.set(0, 20, 30);
pointLight3.shadow.mapSize.width = 4096;
pointLight3.shadow.mapSize.height = 4096;
pointLight3.castShadow = true;
scene.add(pointLight3);

// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 400);
camera.position.setZ(10);
scene.add(camera);

// Renderer
const canvas = document.querySelector('#bg');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

function animate() {
    requestAnimationFrame(animate);

    // Rotate the model
    blenderModel.rotation.z += 0.003;

    // Rotate the plane
    // plane.rotation.z += 0.003;

    // Render the scene
    renderer.render(scene, camera);
}

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Call the animate function
animate();

window.addEventListener('resize', () => {
    // Update camera aspect ratio and renderer size
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
});