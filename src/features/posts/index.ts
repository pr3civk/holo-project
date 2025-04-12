//import typu POST z pliku types/Post.ts
import { type Post } from "./types/Post";

//Array postów zawierających id, tytuł i treść postu
export const posts: Post[] = [
	{
		id: "0",
		title: "Inicjalizacja projektu",
		githubCode: {
			html: "https://github.com/pr3civk/holo-project/blob/main/src/features/3d-stages/0_stage/index.html",
			ts: "https://github.com/pr3civk/holo-project/blob/main/src/features/3d-stages/0_stage/script/Canvas3D.ts",
			css: "https://github.com/pr3civk/holo-project/blob/main/src/features/3d-stages/0_stage/styles/index.css",
		},
		content: `
  <section class="post-content">
		<h3>Opis:</h3>
    <p>
      Three.js to jedna z najpopularniejszych bibliotek JavaScript służących do tworzenia grafiki
      trójwymiarowej w przeglądarce internetowej. Opiera się na technologii WebGL i umożliwia budowę
      złożonych, interaktywnych scen 3D bez konieczności bezpośredniego pisania kodu WebGL. Jednym z
      kluczowych etapów tworzenia aplikacji w oparciu o Three.js jest prawidłowa inicjalizacja sceny,
      która obejmuje stworzenie obiektów takich jak kamera, renderer, scena oraz kontrolery interakcji
      użytkownika.
    </p>
		
    <p>
      Proces inicjalizacji rozpoczyna się od wybrania elementu HTML typu <code>&lt;canvas&gt;</code>, który
      będzie służył jako powierzchnia renderująca. Biblioteka Three.js nie narzuca konkretnej struktury
      dokumentu, dlatego warto zastosować mechanizm sprawdzający poprawność selektora i istnienie danego
      elementu. Następnie tworzona jest scena 3D, która pełni funkcję kontenera dla wszystkich obiektów
      występujących w środowisku — zarówno geometrycznych, jak i oświetleniowych czy kamer.
    </p>

    <p>
      Kolejnym krokiem jest skonfigurowanie kamery. Zazwyczaj używa się kamery perspektywicznej, która
      odwzorowuje sposób widzenia znany z rzeczywistości. W kontekście interakcji użytkownika, kluczowe
      jest także zastosowanie kontrolerów umożliwiających obrót, przesuwanie i przybliżanie sceny. W tym
      celu wykorzystuje się narzędzie OrbitControls, które w prosty sposób integruje się z kamerą oraz
      elementem canvas, zapewniając płynną i intuicyjną obsługę.
    </p>

    <p>
      Istotnym komponentem jest renderer WebGL, który odpowiada za rzeczywiste wyświetlanie zawartości
      sceny. Ustawiany jest z uwzględnieniem rozmiaru okna oraz rozdzielczości urządzenia, co pozwala na
      zachowanie wysokiej jakości obrazu również na ekranach o podwyższonej gęstości pikseli. Konfiguracja
      rendererów często obejmuje także antyaliasing, który niweluje efekt „ząbkowania” na krawędziach
      obiektów.
    </p>

    <p>
      W przykładowej scenie dodawany jest również prosty obiekt geometryczny — płaszczyzna o białym kolorze
      — który pełni rolę testową lub stanowi bazę do dalszej rozbudowy sceny. Jej rotacja w przestrzeni
      pozwala na ustawienie jej w odpowiedniej orientacji względem kamery, co jest szczególnie istotne przy
      prezentacji modeli trójwymiarowych.
    </p>

    <p>
      Aby scena była dynamiczna, uruchamiana jest pętla animacyjna. W każdej klatce aktualizowane są
      kontrolery oraz renderowana jest cała scena. Dodatkowo obsługiwane są zdarzenia zmiany rozmiaru okna
      przeglądarki, co pozwala na automatyczne przeskalowanie kamery i rendererów, utrzymując proporcje i
      jakość renderowanej sceny niezależnie od wymiarów ekranu.
    </p>

    <p>
      Tak skonstruowany system inicjalizacji stanowi solidny fundament do dalszego rozwoju aplikacji 3D.
      Dzięki modularnemu podejściu możliwe jest łatwe rozszerzanie funkcjonalności o nowe elementy, takie
      jak oświetlenie, zaawansowane materiały, cienie czy modele importowane z zewnętrznych źródeł. Klasa
      inicjalizująca środowisko 3D w Three.js jest przykładem dobrych praktyk w zakresie organizacji kodu,
      skalowalności i integracji z interfejsem użytkownika.
    </p>
  </section>
    `,
	},
	{
		id: "1",
		title: "O shaderach",
		githubCode: {
			ts: "https://github.com/pr3civk/holo-project/blob/main/src/features/3d-stages/1_stage/script/Canvas3D.ts",
			glsl: "https://github.com/pr3civk/holo-project/blob/main/src/features/3d-stages/1_stage/shaders/fragment.glsl",
		},
		content: `
      <section>
			<h3>Opis:</h3>
        <p>
          Współczesne aplikacje 3D w przeglądarkach coraz częściej wykorzystują niestandardowe shadery oraz interaktywne
          interfejsy użytkownika do manipulowania parametrami renderowania w czasie rzeczywistym. Three.js, jako rozbudowana
          biblioteka JavaScript, oferuje zestaw narzędzi, które umożliwiają tworzenie takich zaawansowanych środowisk
          graficznych. Przykładowy system inicjalizacji sceny 3D został wzbogacony o wsparcie dla shaderów GLSL oraz
          interfejsu GUI na bazie biblioteki lil-gui.
        </p>
    
        <p>
          Inicjalizacja rozpoczyna się od określenia selektora elementu <code>&lt;canvas&gt;</code>, który będzie stanowił
          powierzchnię renderującą. Wykorzystywana jest tutaj struktura klasowa, co pozwala na modularne zarządzanie
          komponentami systemu. Tworzona scena 3D zawiera standardowe elementy jak kamera perspektywiczna oraz kontrolery
          użytkownika typu OrbitControls, pozwalające na intuicyjne obracanie oraz przybliżanie widoku.
        </p>
    
        <p>
          Nowością w przedstawionej architekturze jest zastosowanie dedykowanego GUI, umożliwiającego dynamiczną zmianę
          koloru tła renderera. Parametr koloru jest definiowany jako część konfiguracyjnego obiektu i aktualizowany na
          bieżąco w reakcji na działania użytkownika. Takie podejście zwiększa interaktywność aplikacji i wspiera szybkie
          prototypowanie.
        </p>
    
        <p>
          Kolejnym kluczowym komponentem systemu jest użycie materiału opartego na shaderach. W miejsce gotowych materiałów
          Three.js zastosowano ShaderMaterial z własnymi programami wierzchołkowymi i fragmentowymi. Dzięki temu możliwe
          jest pełne przejęcie kontroli nad procesem renderowania, co otwiera drogę do implementacji efektów specjalnych,
          takich jak niestandardowe oświetlenie, animacje proceduralne czy efekty post-processingu.
        </p>
    
        <p>
          W omawianej konfiguracji <code>ShaderMaterial</code> bazuje na dwóch komponentach – shaderze wierzchołkowym
          (<code>vertex shader</code>) oraz shaderze fragmentów (<code>fragment shader</code>). Shader wierzchołkowy
          odpowiada za przekształcenie współrzędnych obiektu w przestrzeni modelu do przestrzeni widoku oraz projekcji, a
          także przekazuje współrzędne UV do dalszego etapu renderowania. Kluczową rolę pełni tu zmienna <code>vUv</code>,
          która przechowuje wartości współrzędnych UV każdego wierzchołka i przekazywana jest do shaderu fragmentów.
        </p>
    
        <p>
          Shader fragmentów dokonuje obliczeń koloru końcowego piksela. W tym przypadku jego działanie opiera się na prostym
          przekształceniu – odczytywana jest wartość <code>x</code> ze współrzędnych UV (czyli poziome położenie piksela na
          powierzchni geometrycznej), a następnie używana jako wartość jasności koloru RGB. Efektem tego działania jest
          gradient poziomy: od czerni (po lewej stronie płaszczyzny) do bieli (po prawej). Całość renderowana jest z
          zachowaniem tonemappingu i przestrzeni kolorów, co pozwala uzyskać efekt spójny z domyślnymi ustawieniami silnika
          Three.js.
        </p>
    
        <p>
          Renderowana scena zawiera prosty obiekt geometryczny – płaszczyznę – który jest obracany w przestrzeni 3D i
          pokrywany materiałem zdefiniowanym przez shadery. Całość objęta jest pętlą animacyjną, w której aktualizowane są
          kontrolery i odświeżany jest rendering. Obsługa zdarzeń zmiany rozmiaru okna zapewnia responsywność i zachowanie
          prawidłowych proporcji niezależnie od urządzenia.
        </p>
    
        <p>
          Połączenie GUI z shaderami i systemem renderowania w Three.js prezentuje nowoczesne podejście do budowy
          interaktywnych wizualizacji 3D w środowisku przeglądarkowym. Dzięki wysokiej elastyczności i modularnej strukturze
          kodu możliwa jest dalsza rozbudowa aplikacji o kolejne elementy i efekty wizualne.
        </p>
      </section>
    `,
	},
	{
		id: "2",
		title: "Tworzenie shadera 'żaluzji' do wykorzystania w animacji hologramu",
		content: `
	<section>
		<h3>Opis:</h3>
		<p>
			W procesie tworzenia aplikacji 3D często pojawia się potrzeba wzbogacenia statycznych scen o interaktywne,
			dynamiczne komponenty. Three.js umożliwia to między innymi poprzez wykorzystanie materiałów opartych na shaderach
			GLSL, które w połączeniu z biblioteką lil-gui pozwalają użytkownikowi wpływać na parametry renderowania w czasie
			rzeczywistym. W niniejszym artykule porównujemy dwie wersje systemu renderującego: podstawową, w której shader
			fragmentów tworzy prosty gradient, oraz rozszerzoną, gdzie wprowadzono dynamiczne uniformy.
		</p>

		<p>
			Pierwsza wersja aplikacji wykorzystuje statyczny shader, w którym kolor każdego piksela ustalany jest na podstawie
			współrzędnej <code>vUv.x</code>. Oznacza to, że kolor zmienia się tylko w poziomie, tworząc efekt prostego
			gradientu. Choć taki efekt bywa wystarczający w wielu przypadkach, jego wartość użytkowa jest ograniczona – brak tu
			interakcji i możliwości dynamicznej kontroli nad wyglądem sceny.
		</p>

		<p>
			Druga wersja wprowadza istotne rozszerzenia. Po pierwsze, dodany został uniform <code>uFrequency</code>, który
			wpływa na sposób obliczania koloru we fragmencie shadera. Tym razem operacja opiera się na współrzędnej
			<code>vUv.y</code> (czyli pionowym położeniu piksela) oraz funkcji <code>mod()</code>, która tworzy powtarzający się
			wzór na bazie podanej częstotliwości. Dzięki temu możliwe jest generowanie efektu pasów lub fali, których
				intensywność i gęstość można regulować w czasie rzeczywistym.
			</p>

			<p>
				Kluczowym uzupełnieniem systemu jest integracja GUI, pozwalającego użytkownikowi zmieniać wartość uniformu
				<code>uFrequency</code> bez konieczności ingerencji w kod. Parametr ten zdefiniowany jest w strukturze
				<code>rendererParameters</code>, a jego zmiany są natychmiast przekazywane do materiału za pomocą odniesienia do
				<code>this.material.uniforms</code>. To rozwiązanie umożliwia pełną kontrolę nad wyglądem shaderów w czasie
				rzeczywistym i stanowi fundament dla dalszych eksperymentów z generatywną grafiką 3D.
			</p>

			<p>
				Dodatkowo, architektura została uporządkowana poprzez wyodrębnienie metody <code>createMaterial()</code>, która
				odpowiada wyłącznie za konfigurację materiału shaderowego. Taki podział obowiązków wspiera czytelność kodu oraz jego
				przyszłą rozbudowę, np. o więcej uniformów, efekty animacji, przejścia między shaderami czy dynamiczne tekstury.
			</p>

			<p>
				Dzięki tym usprawnieniom aplikacja staje się nie tylko bardziej elastyczna, ale i znacznie ciekawsza z punktu
				widzenia użytkownika końcowego. Możliwość modyfikacji parametrów shaderów w czasie rzeczywistym sprawia, że scena 3D
				nabiera życia i może być łatwo dostosowywana do różnych potrzeb projektowych lub estetycznych.
			</p>

			<p>
				Przedstawiona ewolucja systemu ShaderMaterial doskonale ilustruje potencjał drzemiący w połączeniu Three.js, GLSL i
				interfejsów GUI. To rozwiązanie idealne dla twórców chcących przekraczać granice statycznych wizualizacji i wprowadzać
				do swoich projektów elementy interaktywności, generatywności i eksperymentu wizualnego.
			</p>
		</section>  
    `,
	},
	{
		id: "3",
		title: "różnica między uv a pozycjami obiektu",
		content: `
      <section>
			<h3>Opis:</h3>
  <p>
    W rozwoju aplikacji 3D z wykorzystaniem Three.js kluczową rolę odgrywają shadery, które umożliwiają precyzyjne
    sterowanie wyglądem obiektów na ekranie. Jednym z bardziej zaawansowanych zastosowań shaderów jest wykorzystanie
    informacji o pozycji w przestrzeni świata w obliczeniach koloru fragmentów. Dzięki temu możliwe jest tworzenie
    efektów takich jak gradienty, animacje proceduralne czy niestandardowe efekty oświetleniowe. W tym artykule omówimy
    jak wykorzystać pozycję światową obiektów 3D w shaderach fragmentów w Three.js.
  </p>

  <p>
    W tym przykładzie cała scena opiera się na wczytanym obiekcie, który jest renderowany za pomocą materiału
    zdefiniowanego przez shadery. Do przekształcenia pozycji obiektów w przestrzeni modelu na ostateczną pozycję w
    przestrzeni kamery oraz projekcji wykorzystywane są standardowe operacje w shaderach wierzchołkowych. Co ważne,
    wykorzystujemy <code>varying</code>, które pozwala na przesyłanie informacji z shaderów wierzchołkowych do
    fragmentów.
  </p>

  <p>
    Shader wierzchołkowy przekształca pozycję wierzchołków z przestrzeni modelu na przestrzeń kamery oraz zapewnia
    przesyłanie tych informacji do kolejnego etapu renderowania. W tym przypadku tworzymy zmienną
    <code>vPosition</code>, która przechowuje pozycję wierzchołka w przestrzeni modelu. Następnie, w shaderze
    fragmentów, operujemy na tych danych, aby uzyskać finalny kolor fragmentu. Jest to możliwe dzięki wprowadzeniu
    zmiennej <code>vPosition</code> do shaderów fragmentów.
  </p>

  <p>
    Poniżej przedstawiamy kod shaderów wierzchołkowego i fragmentowego, które ilustrują sposób wykorzystania pozycji w
    przestrzeni modelu w obliczeniach renderujących.
  </p>

  <pre><code class="language-glsl">
    // Vertex Shader
    varying vec3 vPosition;

    void main() {
        // Pozycja modelu
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);

        // Finalna pozycja
        gl_Position = projectionMatrix * viewMatrix * modelPosition;

        // Przesyłanie danych do fragmentu
        vPosition = modelPosition.xyz;
    }
  </code></pre>

  <pre><code class="language-glsl">
    // Fragment Shader
    uniform float uFrequency;
    varying vec3 vPosition;

    void main() {
        // Wyciąganie wartości 'y' z pozycji w przestrzeni modelu
        float y = vPosition.y;
        float strength = mod(y * uFrequency, 1.0);

        // Kolor finalny
        vec4 color = vec4(vec3(strength), 1.0);
        gl_FragColor = color;
        
        // Tonemapping z Three.js
        #include <tonemapping_fragment>
          // Przestrzeń kolorów z Three.js
          #include <colorspace_fragment>
            }
            </code></pre>
        
            <p>
              W powyższym kodzie, shader wierzchołkowy oblicza pozycję wierzchołka w przestrzeni modelu, a następnie przesyła ją
              do shaderu fragmentów za pomocą zmiennej <code>vPosition</code>. Fragment shader wykorzystuje te dane, aby
              przekształcić pozycję w pionie (<code>vPosition.y</code>) w wartość jasności, co skutkuje stworzeniem gradientu w
              kolorze. Wartość częstotliwości <code>uFrequency</code> wpływa na częstotliwość tego gradientu.
            </p>
        
            <p>
              W efekcie, finalna scena wyświetla płaszczyznę, której kolor jest uzależniony od jej wysokości w przestrzeni
              modelu, co daje efekt płynnej zmiany koloru na powierzchni obiektu w zależności od jego położenia w przestrzeni.
            </p>
        
            <p>
              Integracja tych elementów z GUI umożliwia dynamiczną zmianę parametrów renderowania, takich jak częstotliwość
              zmiany koloru, co pozwala na interaktywną manipulację wizualizacją w czasie rzeczywistym.
            </p>
        
            </section>
    `,
	},
	{
		id: "4",
		title: "Wczytanie modelu, jak znalezc darmowy model",
		content: `
      <section>
  <p>
    Jednym z popularniejszych formatów do pracy z modelami 3D w aplikacjach internetowych jest <code>GLTF</code>, który
    pozwala na wygodne ładowanie, renderowanie i manipulowanie skomplikowanymi obiektami 3D. Three.js, w pełni wspiera
    ten format, co umożliwia łatwą integrację z aplikacjami opartymi na grafice 3D. W tym artykule przedstawimy sposób
    załadowania modelu 3D w formacie GLTF, jego centrowanie w scenie oraz dostosowanie kamery, a także przygotowanie do
    dalszej implementacji efektów, takich jak hologramy.
  </p>

  <p>
    Proces inicjalizacji rozpoczyna się od stworzenia klasy <code>Canvas3D</code>, która odpowiedzialna jest za całą
    konfigurację sceny 3D, ładowanie modelu oraz renderowanie obiektów. Kluczowym elementem jest użycie klasy
    <code>GLTFLoader</code> z Three.js do załadowania modelu w formacie GLTF. W tym przypadku wczytujemy model
    <code>R2-D2.glb</code>, ale ten proces może dotyczyć dowolnego obiektu 3D w tym formacie.
  </p>

  <p>
    Po załadowaniu modelu, następnie przechodzimy do jego centrowania w przestrzeni 3D. Zastosowanie <code>Box3</code> z
    Three.js pozwala na obliczenie otaczającej objętości modelu, a następnie wycentrowanie go w przestrzeni, co jest
    kluczowe dla późniejszego renderowania w odpowiednich proporcjach. Model zostaje dodany do sceny, a kamera jest
    automatycznie dostosowywana do rozmiarów obiektu, co pozwala na właściwe ustawienie punktu widzenia.
  </p>

  <p>
    Warto zauważyć, że po załadowaniu modelu, każdemu jego elementowi przypisujemy materiał. W tym przypadku jest to
    prosty materiał <code>MeshBasicMaterial</code>, który może zostać wymieniony na bardziej zaawansowany materiał
    oparty na shaderach w późniejszych etapach, co otwiera drogę do implementacji efektów takich jak hologramy,
    niestandardowe oświetlenie czy animacje proceduralne.
  </p>

  <p>
    Następnie konfigurujemy kamerę i kontrolki, pozwalające na interakcję z modelem w czasie rzeczywistym.
    <code>OrbitControls</code> umożliwia użytkownikowi obracanie, przybliżanie i oddalanie widoku obiektu, co jest
    szczególnie istotne w przypadku wizualizacji skomplikowanych obiektów 3D.
  </p>

  <p>
    Poniżej przedstawiamy kod, który ładuje model, centrowań go w przestrzeni oraz dostosowuje kamerę do jego rozmiaru:
  </p>

  <pre style="background-color: #1d1f2a; overflow-x: auto; color: #fff;"><code class="language-typescript">
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
	clearColor: string; // Kolor tła sceny
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
				"Canvas element with selector " + canvasSelector + " not found"
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
			clearColor: "#1d1f2a", // Kolor tła
			frequency: 10, // Częstotliwość odświeżania
		};

		// Inicjalizacja renderera WebGL
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true, // Włączenie antyaliasingu
		});
		this.renderer.setClearColor(this.rendererParameters.clearColor); // Ustawienie koloru tła
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
		this.gui.addColor(this.rendererParameters, "clearColor").onChange(() => {
			this.renderer.setClearColor(this.rendererParameters.clearColor);
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
    </code></pre>
    
    <p>
      Kod ten ładuje model 3D, centrowań go w przestrzeni, a także dostosowuje ustawienia kamery do rozmiaru modelu.
      Kolejnym krokiem będzie implementacja efektów takich jak hologram, które wykorzystają ten załadowany model.
    </p>
    
    <p>
      Dzięki tej inicjalizacji, masz pełną kontrolę nad modelami 3D w aplikacji, co pozwala na tworzenie zaawansowanych
      wizualizacji, takich jak efekty świetlne, interaktywne animacje czy, jak w tym przypadku, hologramy.
    </p>
    </section>
    `,
	},
	{
		id: "5",
		title: "Nalozenie shadera na model 3d",
		content: `
      <p>Opis postu</p> 
    `,
	},
	{
		id: "6",
		title: "Operacje na shaderach -> co znaczy co",
		content: `
      <p>Opis postu</p> 
    `,
	},
	{
		id: "7",
		title: "Stworzenie animacji polegającej na zmianie czasu",
		content: `
      <p>Opis postu</p> 
    `,
	},
	{
		id: "8",
		title: "Tworzenie przezroczystosci i cos o kanale alfa(?)",
		content: `
      <p>Opis postu</p> 
    `,
	},
	{
		id: "9",
		title: "Coś o odbiciu fresnela, mała ilosc teorii i przykład",
		content: `
      <p>Opis postu</p> 
    `,
	},
	{
		id: "10",
		title: "Naprawa 'intencjonalnego buga' związanego z odbiciem fresnela",
		content: `
      <p>Opis postu</p> 
    `,
	},
	{
		id: "11",
		title: "Dodanie odbicia fresnela do animacji hologramu",
		content: `
      <p>Opis postu</p> 
    `,
	},
	{
		id: "12",
		title: "Opis o widocznosci elementów modelu wykonczanie podstawowej animacji hologramu",
		content: `
      <p>Opis postu</p> 
    `,
	},
	{
		id: "13",
		title: "Tworzenie animacji glitcha",
		content: `
      <p>Opis postu</p> 
    `,
	},
	{
		id: "14",
		title: "Dokończenie podstawowej animacji glitcha",
		content: `
      <p>Opis postu</p> 
    `,
	},
	{
		id: "15",
		title: "Wykończanie animacji i efekt on hover",
		content: `
      <p>Opis postu</p> 
    `,
	},
	{
		id: "16",
		title: "Dodanie kontrolki do zmiany koloru tła",
		content: `
      <p>Opis postu</p> 
    `,
	},
];
