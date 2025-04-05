import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

type RendererParameters = {
	frequency: number;
	falloff: number;
	color: THREE.Color;
	hoverGlitchIntensity: number;
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
	private material: THREE.ShaderMaterial | undefined;
	private model: THREE.Group | null = null;
	private clock: THREE.Clock;
	private mouseOver: boolean = false;
	private hoverGlitchIntensity: number = 0;
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
			frequency: 14,
			falloff: 0.9,
			color: new THREE.Color("#004cff"),
			hoverGlitchIntensity: 0.0,
		};

		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
		});
		this.renderer.setSize(this.sizes.width, this.sizes.height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		// Clock
		this.clock = new THREE.Clock();

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

		// Raycaster dla detekcji najechania na mesh
		const raycaster = new THREE.Raycaster();
		const mouse = new THREE.Vector2();

		// Dodajemy zmienną do śledzenia ostatniego stanu
		let lastMouseOver = false;

		// Dodajemy throttling dla obsługi ruchu myszy
		let lastMoveTime = 0;
		const throttleTime = 50; // ms

		// Obsługa ruchu myszy z throttlingiem
		this.canvas.addEventListener("mousemove", (event) => {
			const now = performance.now();
			if (now - lastMoveTime < throttleTime) return;
			lastMoveTime = now;

			// Obliczenie pozycji myszy w przestrzeni znormalizowanej (-1 do 1)
			mouse.x = (event.clientX / this.sizes.width) * 2 - 1;
			mouse.y = -(event.clientY / this.sizes.height) * 2 + 1;

			// Aktualizacja raycaster'a
			raycaster.setFromCamera(mouse, this.camera);

			// Sprawdzenie czy promień przecina model
			if (this.model) {
				const intersects = raycaster.intersectObject(this.model, true);
				const newMouseOver = intersects.length > 0;

				// Aktualizujemy stan tylko jeśli się zmienił
				if (newMouseOver !== lastMouseOver) {
					this.mouseOver = newMouseOver;
					lastMouseOver = newMouseOver;
				}
			}
		});
	}

	private setupGUI(): void {
		this.gui
			.add(this.rendererParameters, "frequency")
			.min(1)
			.max(50)
			.step(1)
			.onChange(() => {
				if (this.material) {
					this.material.uniforms.uFrequency.value =
						this.rendererParameters.frequency;
				}
			});
		this.gui
			.add(this.rendererParameters, "falloff")
			.min(0)
			.max(1)
			.step(0.1)
			.onChange(() => {
				if (this.material) {
					this.material.uniforms.uFalloff.value =
						this.rendererParameters.falloff;
				}
			});
		this.gui.addColor(this.rendererParameters, "color").onChange(() => {
			if (this.material) {
				this.material.uniforms.uColor.value = this.rendererParameters.color;
			}
		});

		this.gui
			.add(this.rendererParameters, "hoverGlitchIntensity")
			.min(0)
			.max(1)
			.step(0.1)
			.onChange(() => {
				if (this.material) {
					this.material.uniforms.uHoverGlitch.value =
						this.rendererParameters.hoverGlitchIntensity;
				}
			});
	}

	private createMaterial(): void {
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			transparent: true,
			blending: THREE.AdditiveBlending,
			depthTest: false,
			depthWrite: false,
			side: 2,
			uniforms: {
				uFrequency: { value: this.rendererParameters.frequency },
				uTime: { value: 0 },
				uFalloff: { value: this.rendererParameters.falloff },
				uColor: { value: this.rendererParameters.color },
				uHoverGlitch: { value: 0.0 },
			},
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
			// Update material
			if (this.material) {
				this.material.uniforms.uTime.value = elapsedTime;

				// Aktualizujemy intensywność glitcha przy najechaniu
				if (this.mouseOver && this.hoverGlitchIntensity < 0.6) {
					this.hoverGlitchIntensity += 0.02;
				} else if (!this.mouseOver && this.hoverGlitchIntensity > 0.0) {
					this.hoverGlitchIntensity -= 0.02;
				}
				// console.log("mouseOver", this.mouseOver); // Zakomentowane lub usunięte

				this.hoverGlitchIntensity = Math.max(
					0,
					Math.min(1, this.hoverGlitchIntensity)
				);
				this.material.uniforms.uHoverGlitch.value =
					this.hoverGlitchIntensity;
			}

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
