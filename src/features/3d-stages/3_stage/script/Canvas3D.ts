import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

type RendererParameters = {
	clearColor: string;
	frequency: number;
};
class Canvas3D {
	private gui: GUI;
	private canvas: HTMLCanvasElement;
	private scene: THREE.Scene;
	private sizes: { width: number; height: number };
	private camera: THREE.PerspectiveCamera;
	private controls: OrbitControls;
	private rendererParameters: RendererParameters;
	private renderer: THREE.WebGLRenderer;
	private material: THREE.ShaderMaterial | undefined;

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

		// Sizes
		this.sizes = {
			width: window.innerWidth,
			height: window.innerHeight,
		};

		// Camera
		this.camera = new THREE.PerspectiveCamera(
			40,
			this.sizes.width / this.sizes.height,
			0.1,
			100
		);
		this.camera.position.set(10, 0, 0);
		this.scene.add(this.camera);

		// Controls
		this.controls = new OrbitControls(this.camera, this.canvas);
		this.controls.enableDamping = true;

		// Renderer
		this.rendererParameters = {
			clearColor: "#1d1f2a",
			frequency: 20,
		};

		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
		});
		this.renderer.setClearColor(this.rendererParameters.clearColor);
		this.renderer.setSize(this.sizes.width, this.sizes.height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		// Setup
		this.setupEventListeners();
		this.setupGUI();
		this.createMaterial();
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
		this.gui.add(this.rendererParameters, "frequency").onChange(() => {
			this.rendererParameters.frequency = this.rendererParameters.frequency;
		});
	}

	//Material
	private createMaterial(): void {
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			uniforms: {
				uFrequency: { value: this.rendererParameters.frequency },
			},
		});
	}

	private loadModel(): void {
		const plane = new THREE.PlaneGeometry(5, 5);

		const planeMesh = new THREE.Mesh(plane, this.material);

		planeMesh.rotation.y = Math.PI / 2;

		this.scene.add(planeMesh);
	}

	private animate(): void {
		const tick = () => {
			// Update controls
			this.controls.update();

			// Update uniforms
			if (this.material) {
				this.material.uniforms.uFrequency.value =
					this.rendererParameters.frequency;
			}

			// Render
			this.renderer.render(this.scene, this.camera);

			// Call tick again on the next frame
			window.requestAnimationFrame(tick);
		};

		tick();
	}
}

export const canvas3D = new Canvas3D(".webgl");
