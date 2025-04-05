import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

type RendererParameters = {
	clearColor: string;
};

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas: HTMLCanvasElement | null = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Loaders
const gltfLoader = new GLTFLoader();

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
	20,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.set(10, 10, 10);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const rendererParameters: RendererParameters = {
	clearColor: "#1d1f2a",
};

const renderer = new THREE.WebGLRenderer({
	canvas: canvas as HTMLCanvasElement,
	antialias: true,
});
renderer.setClearColor(rendererParameters.clearColor);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

gui.addColor(rendererParameters, "clearColor").onChange(() => {
	renderer.setClearColor(rendererParameters.clearColor);
});

/**
 * Material
 */
const material = new THREE.MeshBasicMaterial();

/**
 * Objects
 */

// model
let model: THREE.Group | null = null;
gltfLoader.load("./R2-D2.glb", (gltf) => {
	model = gltf.scene;
	model.traverse((child) => {
		if (child instanceof THREE.Mesh) child.material = material;
	});
	scene.add(model);
});

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// // Rotate objects
	// if (model) {
	// 	model.rotation.x = -elapsedTime * 0.1;
	// 	model.rotation.y = elapsedTime * 0.2;
	// }

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
