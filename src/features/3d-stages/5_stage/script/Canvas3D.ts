// Importowanie biblioteki Three.js
import * as THREE from "three";
// Importowanie kontrolera kamery umożliwiającego obracanie sceny
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// Importowanie biblioteki do tworzenia interfejsu użytkownika
import GUI from "lil-gui";
// Importowanie loadera do wczytywania modeli 3D w formacie GLTF
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Definicja typu dla parametrów renderera
type RendererParameters = {
	bgColor: string; // Kolor tła sceny
	frequency: number; // Częstotliwość odświeżania
};
class Canvas3D {
	private gui: GUI; // Panel kontrolny do debugowania
	private canvas: HTMLCanvasElement; // Element canvas HTML
	private scene: THREE.Scene; // Scena 3D
	private gltfLoader: GLTFLoader; // Loader do wczytywania modeli GLTF
	private sizes: { width: number; height: number }; // Wymiary canvasu
	private camera: THREE.PerspectiveCamera; // Kamera perspektywiczna
	private controls: OrbitControls; // Kontroler do obracania kamery
	private rendererParameters: RendererParameters; // Parametry renderera
	private renderer: THREE.WebGLRenderer; // Renderer WebGL
	private material: THREE.MeshBasicMaterial; // Podstawowy materiał dla modelu
	private model: THREE.Group | null = null; // Wczytany model 3D

	constructor(canvasSelector: string) {
		// Inicjalizacja panelu debugowania
		this.gui = new GUI();

		// Pobieranie elementu canvas z DOM
		const canvasElement = document.querySelector(canvasSelector);
		if (!canvasElement) {
			// Wyrzucenie błędu jeśli element canvas nie został znaleziony
			throw new Error(
				`Canvas element with selector "${canvasSelector}" not found`
			);
		}
		this.canvas = canvasElement as HTMLCanvasElement;

		// Tworzenie sceny 3D
		this.scene = new THREE.Scene();

		// Inicjalizacja loadera GLTF
		this.gltfLoader = new GLTFLoader();

		// Ustawienie wymiarów na podstawie rozmiaru okna
		this.sizes = {
			width: window.innerWidth,
			height: window.innerHeight,
		};

		// Tworzenie kamery perspektywicznej
		this.camera = new THREE.PerspectiveCamera(
			10, // Kąt widzenia (FOV)
			this.sizes.width / this.sizes.height, // Proporcje
			0.1, // Najbliższa płaszczyzna przycinania
			100 // Najdalsza płaszczyzna przycinania
		);
		this.camera.position.set(5, 5, 5); // Ustawienie pozycji kamery
		this.scene.add(this.camera); // Dodanie kamery do sceny

		// Inicjalizacja kontrolera kamery
		this.controls = new OrbitControls(this.camera, this.canvas);
		this.controls.enableDamping = true; // Włączenie płynnego poruszania kamerą

		// Ustawienie parametrów renderera
		this.rendererParameters = {
			bgColor: "#1d1f2a", // Kolor tła
			frequency: 10, // Częstotliwość odświeżania
		};

		// Inicjalizacja renderera WebGL
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true, // Włączenie antyaliasingu
		});
		this.renderer.setClearColor(this.rendererParameters.bgColor); // Ustawienie koloru tła
		this.renderer.setSize(this.sizes.width, this.sizes.height); // Ustawienie rozmiaru renderera
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Ograniczenie pixel ratio dla wydajności

		// Tworzenie podstawowego materiału
		this.material = new THREE.MeshBasicMaterial();

		// Konfiguracja i uruchomienie aplikacji
		this.setupEventListeners(); // Ustawienie nasłuchiwania zdarzeń
		this.setupGUI(); // Konfiguracja panelu debugowania
		this.loadModel(); // Wczytanie modelu 3D
		this.animate(); // Uruchomienie pętli animacji
	}

	private setupEventListeners(): void {
		// Nasłuchiwanie zmiany rozmiaru okna
		window.addEventListener("resize", () => {
			// Aktualizacja wymiarów
			this.sizes.width = window.innerWidth;
			this.sizes.height = window.innerHeight;

			// Aktualizacja proporcji kamery
			this.camera.aspect = this.sizes.width / this.sizes.height;
			this.camera.updateProjectionMatrix(); // Aktualizacja macierzy projekcji

			// Aktualizacja rozmiaru renderera
			this.renderer.setSize(this.sizes.width, this.sizes.height);
			this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Ograniczenie pixel ratio
		});
	}

	private setupGUI(): void {
		// Dodanie kontrolki koloru tła do panelu debugowania
		this.gui.addColor(this.rendererParameters, "bgColor").onChange(() => {
			this.renderer.setClearColor(this.rendererParameters.bgColor);
		});
		// Dodanie kontrolki częstotliwości do panelu debugowania
		this.gui.add(this.rendererParameters, "frequency").onChange(() => {
			this.rendererParameters.frequency = this.rendererParameters.frequency;
		});
	}

	private loadModel(): void {
		// Wczytanie modelu R2-D2 z pliku GLTF
		this.gltfLoader.load("/R2-D2.glb", (gltf) => {
			this.model = gltf.scene; // Przypisanie wczytanej sceny do zmiennej model
			// Przejście przez wszystkie elementy modelu
			this.model.traverse((child) => {
				// Zastąpienie materiałów wszystkich siatek naszym materiałem
				if (child instanceof THREE.Mesh) child.material = this.material;
			});

			// Centrowanie modelu
			const box = new THREE.Box3().setFromObject(this.model); // Obliczenie pudełka ograniczającego
			const center = box.getCenter(new THREE.Vector3()); // Znalezienie środka modelu
			// Przesunięcie modelu tak, aby jego środek był w punkcie (0,0,0)
			this.model.position.x -= center.x;
			this.model.position.y -= center.y;
			this.model.position.z -= center.z;

			// Dostosowanie kamery do rozmiaru modelu
			const size = box.getSize(new THREE.Vector3()).length(); // Obliczenie rozmiaru modelu
			const distance = size / Math.tan((Math.PI * this.camera.fov) / 180); // Obliczenie optymalnej odległości kamery

			// Ustawienie kamery w odpowiedniej odległości
			this.camera.position.set(0, 0, distance);
			this.camera.lookAt(0, 0, 0); // Skierowanie kamery na środek sceny
			this.controls.update(); // Aktualizacja kontrolera kamery

			// Dodanie modelu do sceny
			this.scene.add(this.model);
		});
	}

	private animate(): void {
		// Funkcja wykonywana w każdej klatce animacji
		const tick = () => {
			// Aktualizacja kontrolera kamery (dla płynnego poruszania)
			this.controls.update();

			// Renderowanie sceny
			this.renderer.render(this.scene, this.camera);

			// Wywołanie funkcji tick ponownie przy następnej klatce
			window.requestAnimationFrame(tick);
		};

		// Uruchomienie pętli animacji
		tick();
	}
}

// Eksport instancji klasy Canvas3D z elementem canvas o selektorze ".webgl"
export const canvas3D = new Canvas3D(".webgl");
