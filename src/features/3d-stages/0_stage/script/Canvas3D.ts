// Importuje bibliotekę Three.js
import * as THREE from "three";
// Importuje kontroler OrbitControls z dodatków Three.js
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Klasa zarządzająca sceną 3D
class Canvas3D {
	// Prywatne pola klasy
	private canvas: HTMLCanvasElement; // Element canvas HTML
	private scene: THREE.Scene; // Scena Three.js
	private sizes: { width: number; height: number }; // Wymiary okna
	private camera: THREE.PerspectiveCamera; // Kamera perspektywiczna
	private controls: OrbitControls; // Kontroler kamery
	private renderer: THREE.WebGLRenderer; // Renderer WebGL

	// Konstruktor przyjmujący selektor elementu canvas
	constructor(canvasSelector: string) {
		// Pobiera element canvas z DOM
		const canvasElement = document.querySelector(canvasSelector);
		// Sprawdza czy element canvas istnieje
		if (!canvasElement) {
			throw new Error(
				`Canvas element with selector "${canvasSelector}" not found`
			);
		}
		// Przypisuje element canvas do pola klasy
		this.canvas = canvasElement as HTMLCanvasElement;

		// Tworzy nową scenę Three.js
		this.scene = new THREE.Scene();

		// Ustawia wymiary na podstawie rozmiaru okna
		this.sizes = {
			width: window.innerWidth,
			height: window.innerHeight,
		};

		// Tworzy kamerę perspektywiczną
		this.camera = new THREE.PerspectiveCamera(
			40, // Kąt widzenia (FOV)
			this.sizes.width / this.sizes.height, // Proporcje
			0.1, // Bliska płaszczyzna przycinania
			100 // Daleka płaszczyzna przycinania
		);
		// Ustawia pozycję kamery
		this.camera.position.set(10, 0, 0);
		// Dodaje kamerę do sceny
		this.scene.add(this.camera);

		// Tworzy kontroler OrbitControls dla kamery
		this.controls = new OrbitControls(this.camera, this.canvas);
		// Włącza efekt tłumienia dla płynniejszego ruchu
		this.controls.enableDamping = true;

		// Tworzy renderer WebGL
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true, // Włącza antyaliasing
		});
		// Ustawia rozmiar renderera
		this.renderer.setSize(this.sizes.width, this.sizes.height);
		// Ustawia gęstość pikseli (dla ekranów HiDPI)
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		// Konfiguracja początkowa
		this.setupEventListeners(); // Ustawia nasłuchiwanie zdarzeń
		this.loadModel(); // Ładuje model 3D
		this.animate(); // Uruchamia pętlę animacji
	}

	// Metoda konfigurująca nasłuchiwanie zdarzeń
	private setupEventListeners(): void {
		// Nasłuchuje zdarzenia zmiany rozmiaru okna
		window.addEventListener("resize", () => {
			// Aktualizuje wymiary
			this.sizes.width = window.innerWidth;
			this.sizes.height = window.innerHeight;

			// Aktualizuje proporcje kamery
			this.camera.aspect = this.sizes.width / this.sizes.height;
			// Aktualizuje macierz projekcji kamery
			this.camera.updateProjectionMatrix();

			// Aktualizuje rozmiar renderera
			this.renderer.setSize(this.sizes.width, this.sizes.height);
			// Aktualizuje gęstość pikseli
			this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		});
	}

	// Metoda ładująca model 3D
	private loadModel(): void {
		// Tworzy geometrię płaszczyzny
		const plane = new THREE.PlaneGeometry(5, 5);
		// Tworzy materiał z kolorem białym
		const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
		// Tworzy siatkę (mesh) z geometrii i materiału
		const planeMesh = new THREE.Mesh(plane, material);

		// Obraca płaszczyznę o 90 stopni wokół osi Y
		planeMesh.rotation.y = Math.PI / 2;

		// Dodaje płaszczyznę do sceny
		this.scene.add(planeMesh);
	}

	// Metoda obsługująca animację
	private animate(): void {
		// Funkcja wykonywana w każdej klatce animacji
		const tick = () => {
			// Aktualizuje kontroler kamery
			this.controls.update();

			// Renderuje scenę
			this.renderer.render(this.scene, this.camera);

			// Wywołuje funkcję tick ponownie w następnej klatce
			window.requestAnimationFrame(tick);
		};

		// Uruchamia pierwszą klatkę animacji
		tick();
	}
}

// Eksportuje instancję klasy Canvas3D z selektorem ".webgl"
export const canvas3D = new Canvas3D(".webgl");
