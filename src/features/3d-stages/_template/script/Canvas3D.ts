import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

type RendererParameters = {
	clearColor: string;
};
class Canvas3D {
	private gui: GUI;
	private canvas: HTMLCanvasElement;
	private scene: THREE.Scene;
	private gltfLoader: GLTFLoader;
	private sizes: { width: number; height: number };
	private camera: THREE.PerspectiveCamera;
	private controls: OrbitControls;
	private rendererParameters: RendererParameters;
	private renderer: THREE.WebGLRenderer;
	private material: THREE.MeshBasicMaterial;
	private model: THREE.Group | null = null;
	private clock: THREE.Clock;

	constructor(canvasSelector: string) {
		// Debug
		this.gui = new GUI();

		// Canvas
		const canvasElement = document.querySelector(canvasSelector);
		if (!canvasElement) {
			throw new Error(
				`Canvas element with selector "${canvasSelector}" not found`
			);
		}
		this.canvas = canvasElement as HTMLCanvasElement;

		// Scene
		this.scene = new THREE.Scene();

		// Loaders
		this.gltfLoader = new GLTFLoader();

		// Sizes
		this.sizes = {
			width: window.innerWidth,
			height: window.innerHeight,
		};

		// Camera
		this.camera = new THREE.PerspectiveCamera(
			10,
			this.sizes.width / this.sizes.height,
			0.1,
			100
		);
		this.camera.position.set(5, 5, 5);
		this.scene.add(this.camera);

		// Controls
		this.controls = new OrbitControls(this.camera, this.canvas);
		this.controls.enableDamping = true;

		// Renderer
		this.rendererParameters = {
			clearColor: "#1d1f2a",
		};

		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
		});
		this.renderer.setClearColor(this.rendererParameters.clearColor);
		this.renderer.setSize(this.sizes.width, this.sizes.height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		// Material
		this.material = new THREE.MeshBasicMaterial();

		// Clock
		this.clock = new THREE.Clock();

		// Setup
		this.setupEventListeners();
		this.setupGUI();
		this.loadModel();
		this.animate();
	}

	private setupEventListeners(): void {
		window.addEventListener("resize", () => {
			// Update sizes
			this.sizes.width = window.innerWidth;
			this.sizes.height = window.innerHeight;

			// Update camera
			this.camera.aspect = this.sizes.width / this.sizes.height;
			this.camera.updateProjectionMatrix();

			// Update renderer
			this.renderer.setSize(this.sizes.width, this.sizes.height);
			this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		});
	}

	private setupGUI(): void {
		this.gui.addColor(this.rendererParameters, "clearColor").onChange(() => {
			this.renderer.setClearColor(this.rendererParameters.clearColor);
		});
	}

	private loadModel(): void {
		this.gltfLoader.load("/R2-D2.glb", (gltf) => {
			this.model = gltf.scene;
			this.model.traverse((child) => {
				if (child instanceof THREE.Mesh) child.material = this.material;
			});

			// Centrowanie modelu
			const box = new THREE.Box3().setFromObject(this.model);
			const center = box.getCenter(new THREE.Vector3());
			this.model.position.x -= center.x;
			this.model.position.y -= center.y;
			this.model.position.z -= center.z;

			// Opcjonalnie: dostosuj kamerę do rozmiaru modelu
			const size = box.getSize(new THREE.Vector3()).length();
			const distance = size / Math.tan((Math.PI * this.camera.fov) / 180);

			this.camera.position.set(0, 0, distance);
			this.camera.lookAt(0, 0, 0);
			this.controls.update();

			this.scene.add(this.model);
		});
	}

	private animate(): void {
		const tick = () => {
			const elapsedTime = this.clock.getElapsedTime();

			// // Rotate objects
			// if (this.model) {
			//   this.model.rotation.x = -elapsedTime * 0.1;
			//   this.model.rotation.y = elapsedTime * 0.2;
			// }

			// Update controls
			this.controls.update();

			// Render
			this.renderer.render(this.scene, this.camera);

			// Call tick again on the next frame
			window.requestAnimationFrame(tick);
		};

		tick();
	}
}

export const canvas3D = new Canvas3D(".webgl");
