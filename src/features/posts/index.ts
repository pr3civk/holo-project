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
        <section>
				<h3>Opis:</h3>
    <p>
      W poprzednim etapie stworzyliśmy aplikację renderującą model 3D w Three.js z wykorzystaniem <code>GLTFLoader</code>, <code>OrbitControls</code> i klasycznego materiału <code>MeshBasicMaterial</code>. Model był centrowany w przestrzeni 3D i renderowany przy pomocy kamery z dynamicznymi kontrolkami. Ten etap był niezbędny, aby przygotować grunt pod wprowadzenie bardziej zaawansowanych efektów wizualnych.
    </p>

    <p>
      Obecnie przeszliśmy do kluczowego momentu projektu – integracji shaderów GLSL (GLSL – OpenGL Shading Language) w celu stworzenia efektu przypominającego hologram. Oto zmiany, które zostały wprowadzone w kodzie źródłowym oraz ich znaczenie:
    </p>

    <h2>1. Wprowadzenie ShaderMaterial zamiast MeshBasicMaterial</h2>
    <p>
      Dotychczas używany <code>MeshBasicMaterial</code> został zastąpiony niestandardowym materiałem <code>ShaderMaterial</code>, który wykorzystuje dwa pliki shaderów: <code>vertex.glsl</code> oraz <code>fragment.glsl</code>. Dzięki temu zyskujemy pełną kontrolę nad renderowaniem piksela i wierzchołka, co jest podstawą do implementacji efektu holograficznego.
    </p>

    <pre><code class="language-ts">
this.material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
        uFrequency: { value: this.rendererParameters.frequency },
    },
});
    </code></pre>

    <p>
      ShaderMaterial pozwala na przekazywanie <em>uniformów</em> (czyli zmiennych globalnych w shaderze) takich jak <code>uFrequency</code>, która steruje częstotliwością linii hologramu w przestrzeni 3D.
    </p>

    <h2>2. Dodanie vertex shader</h2>
    <pre><code class="language-glsl">
varying vec3 vPosition;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
    vPosition = modelPosition.xyz;
}
    </code></pre>

    <p>
      Vertex shader odpowiada za przekształcenie pozycji wierzchołków z przestrzeni lokalnej do przestrzeni świata i projektowanej. W tym przypadku, oprócz klasycznego ustawienia <code>gl_Position</code>, do zmiennej <code>vPosition</code> przekazujemy pozycję wierzchołka w przestrzeni świata. Ta wartość będzie później używana w fragmencie do dynamicznego efektu holograficznego.
    </p>

    <h2>3. Dodanie fragment shader</h2>
    <pre><code class="language-glsl">
uniform float uFrequency;
varying vec3 vPosition;

void main() {
    float y = vPosition.y;
    float strength = mod(y * uFrequency, 1.0);

    vec4 color = vec4(vec3(strength), 1.0);
    gl_FragColor = color;

    #include &lt;tonemapping_fragment&gt;
    #include &lt;colorspace_fragment&gt;
}
    </code></pre>

    <p>
      W tym fragmencie shadera tworzymy prosty efekt linii hologramowych. Zmienna <code>vPosition.y</code> reprezentuje wysokość piksela, a jej przemnożenie przez częstotliwość i funkcja <code>mod</code> powodują powstanie powtarzających się pasków (linie interferencyjne). Dzięki temu uzyskujemy dynamiczny, niestatyczny wygląd przypominający zeskanowany obraz.
    </p>

    <p>
      Do tego dołączone są dyrektywy Three.js:
    </p>

    <ul>
      <li><code>#include &lt;tonemapping_fragment&gt;</code> – zapewnia kompatybilność z ustawieniami tonemappingu w Three.js.</li>
      <li><code>#include &lt;colorspace_fragment&gt;</code> – zapewnia poprawne odwzorowanie przestrzeni kolorów (np. sRGB).</li>
    </ul>

    <h2>4. GUI do dynamicznej zmiany efektu</h2>
    <p>
      Interfejs GUI umożliwia użytkownikowi manipulowanie częstotliwością linii hologramu w czasie rzeczywistym:
    </p>

    <pre><code class="language-ts">
this.gui.add(this.rendererParameters, "frequency").onChange(() => {
    this.rendererParameters.frequency = this.rendererParameters.frequency;
    if (this.material) {
        this.material.uniforms.uFrequency.value = this.rendererParameters.frequency;
    }
});
    </code></pre>

    <p>
      Dzięki temu użytkownik może eksperymentować z wyglądem efektu bez potrzeby ponownego uruchamiania aplikacji.
    </p>
    </section>
    `,
	},
	{
		id: "6",
		title: "Operacje na shaderach -> co znaczy co",
		content: `
      <p>Dodano nowy uniform <code>uTime</code> do <code>ShaderMaterial</code>, który przekazuje do shadera wartość
  upływającego czasu w sekundach. Dzięki temu możemy tworzyć dynamiczne, zmieniające się w czasie efekty wizualne.</p>
<p>W klasie <code>Canvas3D</code> dodano instancję <code>THREE.Clock</code>, która pozwala śledzić upływ czasu od
  momentu uruchomienia aplikacji. Zmienna <code>elapsedTime</code> z tej klasy jest co klatkę przypisywana do uniformu
  <code>uTime</code>.</p>
<p>Zmodyfikowano GUI do kontrolowania <code>frequency</code>, dodając zakres od 1 do 50 oraz krok 1. Pozwala to
  użytkownikowi wygodnie manipulować gęstością efektu pasków w shaderze.</p>
<p>W <code>fragmentShader</code> zaktualizowano obliczenia, dodając zależność od czasu: <code>(y - uTime * 0.1)</code>.
  Dzięki temu paski przemieszczają się w górę lub w dół modelu, tworząc dynamiczny efekt skanowania.</p>
<p>Dodano funkcję <code>pow(stripes, 3.0)</code>, która zaostrza gradient pasków, sprawiając, że są bardziej kontrastowe
  i lepiej widoczne, co potęguje wrażenie "holograficznego skanu".</p>
    `,
	},
	{
		id: "7",
		title: "Stworzenie animacji polegającej na zmianie czasu",
		content: `
     <p>W <code>ShaderMaterial</code> dodano właściwość <code>transparent: true</code>, co pozwala obsługiwać przezroczystość
  materiału i tym samym wykorzystać kanał alfa w fragmencie koloru.</p>
<p>W <code>fragmentShader</code> zmieniono linię <code>vec4 color = vec4(vec3(stripes), 1.0);</code> na
  <code>vec4 color = vec4(vec3(1.0), stripes);</code>. Oznacza to, że teraz efekt pasków wpływa na przezroczystość
  (kanał alfa), a nie jasność koloru. Dzięki temu powstaje efekt "przemiatania" skanera, gdzie tylko niektóre części
  modelu są widoczne, zależnie od aktualnego paska.</p>
<p>Poprzez wykorzystanie kanału alfa shader tworzy dynamiczny efekt pojawiania się i znikania fragmentów modelu, dając
  bardziej holograficzne, efemeryczne wrażenie.</p>
    `,
	},
	{
		id: "8",
		title: "Tworzenie przezroczystosci i cos o kanale alfa(?)",
		content: `
      <p>Dodano nową zmienną <code>vNormal</code> jako <code>varying</code>, która przenosi wektor normalnej z vertex shadera
  do fragment shadera. To umożliwia obliczenia zależne od kąta względem kamery.</p>
<p>Wprowadzono obliczenie efektu *Fresnela* — iloczyn skalarny znormalizowanej różnicy pozycji kamery i fragmentu z
  normalą powierzchni: <code>float fresnel = dot(normalize(viewDirection), vNormal);</code>. Efekt ten daje bardziej
  realistyczne krawędziowe podświetlenie powierzchni zależne od kąta widzenia.</p>
<p>Zmieniono wartość kanału alfa w kolorze końcowym z <code>stripes</code> na <code>fresnel</code>:
  <code>vec4 color = vec4(vec3(1.0), fresnel);</code>. Teraz przezroczystość modelu zależy od kąta patrzenia względem
  normalnej powierzchni, co daje efekt pojawiania się geometrii głównie na obrzeżach — typowy dla efektu Fresnela.</p>
<p>Usunięto zastosowanie wartości <code>stripes</code> z wcześniejszego shadera — nie wpływa ona już na kolor ani
  przezroczystość, choć jest nadal liczona. Można ją usunąć, jeśli nie będzie dalej używana lub łączyć z fresnelem dla
  bardziej złożonego efektu.</p>
    `,
	},
	{
		id: "9",
		title: "Coś o odbiciu fresnela, mała ilosc teorii i przykład",
		content: `
		<p><strong>Efekt Fresnela</strong> to zjawisko optyczne, które opisuje, jak światło odbija się od powierzchni w
  zależności od kąta patrzenia. Zgodnie z tym efektem:</p>
<p><strong>Im bardziej patrzysz na powierzchnię pod kątem (czyli po krawędzi), tym bardziej ją widać.</strong> A im
  patrzysz bardziej "na wprost", tym mniej widoczna się staje (częściej przeźroczysta lub mniej błyszcząca).</p>
<p><strong>Wzór podstawowy:</strong></p>
<pre><code>vec3 viewDir = normalize(vPosition - cameraPosition);
float fresnel = dot(viewDir, vNormal);</code></pre>
<p><strong>Co tu się dzieje:</strong></p>
<ul>
  <li><code>vPosition - cameraPosition</code> – kierunek z fragmentu (punktu na obiekcie) do kamery.</li>
  <li><code>vNormal</code> – normalna powierzchni (czyli "prosto" z niej wychodzący wektor).</li>
  <li><code>dot(...)</code> – iloczyn skalarny, mówi, jak bardzo te dwa kierunki są zgodne (1 = patrzymy prosto, 0 =
    patrzymy pod kątem 90°, czyli "po krawędzi").</li>
</ul>
<p>W klasycznym Fresnelu interesuje nas odwrotność tego — bo to właśnie krawędzie mają być bardziej widoczne:</p>
<pre><code>float fresnel = 1.0 - dot(viewDir, vNormal);</code></pre>
<p>Wartość fresnela zawsze będzie w zakresie od 0 do 1.</p>
<p>0 oznacza, że obiekt jest całkowicie przeźroczysty (lub matowy) i nie odbija światła.</p>
<p>1 oznacza, że obiekt jest całkowicie błyszczący i odbija światło.</p>
<p>Wartość 0.5 oznacza, że obiekt jest połowę przeźroczysty i połowę błyszczący.</p>

    `,
	},
	{
		id: "10",
		title: "Naprawa 'intencjonalnego buga' związanego z odbiciem fresnela",
		content: `
<p>Dodano do wartości Fresnela przesunięcie o <code>+1.0</code>: <code>fresnel = dot(...) + 1.0;</code>. Dzięki temu
  wartość wyjściowa nie zaczyna się od zera (czyli od pełnej przezroczystości), tylko przesuwa cały zakres w górę, co
  sprawia, że efekt jest bardziej widoczny nawet przy mniejszym kącie.</p>
<p>Po dodaniu <code>+1.0</code>, nałożono jeszcze <code>pow(fresnel, 3.0)</code>, co pozwala lepiej kontrolować kształt
  krzywej – nadaje ona przezroczystości nieliniowy, bardziej dramatyczny wzrost przy ostrych kątach widzenia.</p>
<p>Wartość końcowego kanału alfa to teraz wynik przekształconego Fresnela:
  <code>vec4 color = vec4(vec3(1.0), fresnel);</code>. Dzięki temu geometria jeszcze bardziej rozmywa się w centrum i
  pojawia wyraźniej na krawędziach, ale bardziej płynnie i intensywnie niż w poprzedniej wersji.</p>
<p>Efekt pasków <code>stripes</code> nadal jest liczony, ale nie wpływa na kolor — może zostać wykorzystany później lub
  usunięty, jeśli niepotrzebny.</p>
    `,
	},
	{
		id: "11",
		title: "Dodanie odbicia fresnela do animacji hologramu",
		content: `
     <p>W porównaniu do poprzedniej wersji, ten shader wprowadza ważną zmianę: **łączenie efektu Fresnela z dynamicznymi paskami, aby uzyskać bardziej złożony efekt „hologramu”. Poniżej opisuję, co zostało zmienione lub dodane:</p>
<p><strong>1. Nowa linia: <code>float holo = stripes * fresnel;</code></strong></p> <p>Łączy dwa efekty: poziome pasy (stripes) i Fresnela (czyli krawędziowy błysk), tworząc podstawę efektu przezroczystości.</p>
<p><strong>2. Nowa linia: <code>holo += fresnel * 1.25;</code></strong></p> <p>Dodaje do powyższego wyniku jeszcze wzmocniony efekt Fresnela – niezależny od pasków. Dzięki temu nawet jeśli pasy mają zerową wartość, krawędzie i tak są widoczne. Daje to mocniejszy efekt „żarzących się” konturów.</p>
<p><strong>3. Ostateczny kolor: <code>vec4(vec3(1.0), holo);</code></strong></p> <p>Wcześniej przezroczystość była sterowana tylko przez sam <code>fresnel</code>, teraz to połączenie <code>stripes * fresnel + fresnel * 1.25</code>, więc:</p> 
<ul> 
<li>Środek modelu ma pasy, które znikają lub zmieniają się w czasie (uTime).</li>
 <li>Krawędzie są dodatkowo rozświetlone dzięki Fresnelowi.</li> 
 </ul>
<p><strong>Efekt końcowy:</strong>
</p> <p>Shader wygląda teraz jak 
bardziej zaawansowany hologram, gdzie paski się ruszają i świeci się na krawędziach. Środek obiektu ma delikatniejsze paski, a kontury są bardziej wyraźne i dynamiczne.</p>
    `,
	},
	{
		id: "12",
		title: "Opis o widocznosci elementów modelu wykonczanie podstawowej animacji hologramu",
		content: `
      <p>W najnowszej wersji fragment shadera wprowadzono istotną zmianę w sposobie obliczania efektu Fresnela, poprzez
  uwzględnienie orientacji renderowanej powierzchni względem kamery.</p>

<p>Dodano obsługę odwrotnych normalnych poprzez sprawdzenie, czy dana powierzchnia jest skierowana frontem do kamery, i
  w razie potrzeby odwrócenie normalnej. Dzięki temu efekt zachowuje się poprawnie niezależnie od tego, z której strony
  patrzymy na obiekt – co ma znaczenie przy modelach renderowanych dwustronnie lub z odwróconymi trójkątami.</p>

<p>Reszta działania pozostała taka sama: wyliczany jest efekt pasków na podstawie pozycji w pionie oraz przesuniętego w
  czasie współczynnika <code>uTime</code>, a wartość Fresnela dalej jest przesuwana o <code>+1.0</code> i potęgowana, co
  pozwala na lepsze uwypuklenie krawędzi modelu przy zachowaniu przezroczystego centrum.</p>

<p>Końcowa wartość przezroczystości (<code>alpha</code>) nadal opiera się na połączeniu pasków i Fresnela, co daje
  bardziej dynamiczny efekt hologramu, teraz jednak poprawnie działający również na „odwrocie” obiektu.</p>

    `,
	},
	{
		id: "13",
		title: "Tworzenie animacji glitcha",
		content: `
      <p>W tej wersji fragment shadera dodano dodatkową funkcjonalność, która wprowadza bardziej zaawansowane kontrolowanie
  efektu przezroczystości poprzez parametr <code>uFalloff</code>, który kontroluje, jak szybko efekt Fresnela zanika na
  brzegach. Użycie <code>falloff = smoothstep(uFalloff, 0.0, fresnel)</code> sprawia, że efekt przejścia od
  przezroczystości do pełnej widoczności staje się bardziej płynny i naturalny, dzięki funkcji <code>smoothstep</code>,
  która wygładza przejście.</p>

<p>Fresnel i paski są nadal obliczane w sposób podobny do poprzednich wersji, ale w tej wersji wprowadzono również
  modyfikację koloru obiektu. Efekt hologramu jest teraz bardziej zróżnicowany, ponieważ jego kolor jest interpolowany
  między zadanym <code>uColor</code> a białym, w zależności od intensywności efektu Fresnela, co daje bardziej
  zróżnicowaną wizualizację.</p>

<p>Na końcu wynikowy kolor jest uzyskiwany przez połączenie koloru obliczonego z Fresnelem oraz efektu
  <code>falloff</code>, który wygładza przejścia, co daje bardziej subtelną wizualizację hologramu. Całość jest
  następnie przekształcana na odpowiednią wartość alpha, co pozwala na uzyskanie głębszego efektu przezroczystości.</p>

    `,
	},
	{
		id: "14",
		title: "Dokończenie podstawowej animacji glitcha",
		content: `
      <p>W tej wersji dodano efekt <code>glitch</code>, który jest realizowany w vertex shaderze. Do pozycji wierzchołków
  dodawane są losowe zakłócenia (przesunięcia) na podstawie funkcji <code>random2D</code>, która generuje losowe
  wartości w płaszczyźnie <code>xz</code> oraz <code zx</code>, z uwzględnieniem czasu <code>uTime</code>. Dzięki temu
  geometria modelu zyskuje efekt „migotania” lub zakłóceń, które są dynamicznie zmienne w czasie.</p>

<p>W shaderze fragmentu pozostał ten sam efekt hologramu, oparty na paskach i Fresnelu, z dodatkowymi parametrami dla
  koloru i zaniku przezroczystości. Modyfikacja przezroczystości odbywa się za pomocą parametru <code>uFalloff</code>,
  który wygładza przejście na krawędziach, sprawiając, że efekt Fresnela staje się bardziej subtelny i płynny.</p>

<p>Kolor jest interpolowany pomiędzy zdefiniowanym kolorem <code>uColor</code> a białym, zależnie od intensywności
  efektu Fresnela. Całość kończy się nałożeniem efektu przezroczystości w oparciu o obliczoną wartość, tworząc
  zaawansowany efekt hologramu, który jest bardziej dynamiczny dzięki zmienności czasowej (przez <code>uTime</code>)
  oraz zakłóceniom pozycjonowania obiektu.</p>

<p>Warto zauważyć, że dzięki zastosowaniu <code>glitch</code> w vertex shaderze, geometria modelu zmienia się w sposób
  nieregularny, co nadaje jej bardziej chaotyczny, zakłócony wygląd. Efekt ten może być używany do uzyskania bardziej
  dramatycznych, niestabilnych wizualizacji w połączeniu z holograficznym efektem. </p>

    `,
	},
	{
		id: "15",
		title: "Wykończanie animacji i efekt on hover",
		content: `
      <p>W tej wersji kodu shaderów zastosowano dwa główne efekty: glitch w vertex shaderze oraz bardziej zaawansowane efekty wizualne (Fresnel, paski, i falloff) w fragmencie shaderze.</p>
<h3>Vertex Shader:</h3>
<ul>
  <li>Wprowadzono efekt glitcha, który polega na dodaniu losowych zakłóceń do pozycji wierzchołków w czasie.</li>
  <li>Glitch generuje losowe "ziarna" na podstawie zmiennej <code>uTime</code>, co powoduje, że zakłócenia zmieniają się co 2 sekundy.</li>
  <li>Ziarna są interpolowane, co pozwala na płynne przejścia między nimi.</li>
  <li>Wartości te wpływają na to, jak poruszają się wierzchołki modelu, nadając mu wrażenie niestabilności lub migotania, zmieniającego się w czasie.</li>
  <li>Ruch glitcha jest kontrolowany przez prędkość określoną przez <code>glitchSpeed</code>, a jego intensywność jest największa w okolicach centrum zakłócenia (które jest losowe i zmienia się w czasie).</li>
  <li>Zakłócenia mają również płynne wygaszanie, które następuje przy przejściu między poszczególnymi ziarniami, co sprawia, że efekt staje się bardziej naturalny.</li>
</ul>

<h3>Fragment Shader:</h3>
<ul>
  <li>Paski są nadal generowane, ale ich częstotliwość (kontrolowana przez <code>uFrequency</code>) jest modyfikowana w zależności od czasu 
	<code>uTime</code>, co powoduje dynamiczną zmianę wyglądu pasków.</li>
  <li>Zastosowano efekt Fresnela, który jest obliczany z kierunku widzenia względem powierzchni. 
	Dzięki temu efekt staje się bardziej widoczny na krawędziach obiektów, szczególnie przy dużych kątach widzenia. Fresnel jest podniesiony do potęgi 2.0, co sprawia, że przejścia są mniej dramatyczne, ale bardziej płynne w porównaniu do poprzednich wersji.</li>
  <li>Dodano parametr <code>falloff</code>, który modyfikuje intensywność efektu Fresnela na podstawie odległości. 
	Im bliżej krawędzi, tym efekt jest silniejszy. Wartość falloff jest obliczana za pomocą funkcji <code>smoothstep</code>, co zapewnia płynne przejście.</li>
  <li>Kolor finalny jest uzyskiwany przez interpolację między kolorem podanym w <code>uColor</code> a białym, 
	w zależności od intensywności hologramu, która jest uzależniona od efektu Fresnela oraz pasków.</li>
</ul>

<p>W efekcie całość tworzy dynamiczny, glitchowy wygląd z subtelnym efektem hologramu, który zmienia się w czasie.
 Zakłócenia w pozycjonowaniu wierzchołków oraz zmienne, wyraźniejsze przejścia na krawędziach obiektów tworzą interesujący, nieco niestabilny efekt wizualny.</p>
    `,
	},
	{
		id: "16",
		title: "Dodanie kontrolki do zmiany koloru tła",
		content: `
<p>W tej wersji kodu shaderów zastosowano dwa główne efekty: glitch w vertex shaderze oraz bardziej zaawansowane efekty wizualne (Fresnel, paski, i falloff) w fragmencie shaderze. Dodatkowo, zastosowano interakcję z użytkownikiem, która pozwala na dynamiczną zmianę parametrów shaderów w odpowiedzi na interakcję z kursorem.</p>

<h3>Vertex Shader:</h3>
<ul>
  <li>Wprowadzono efekt glitcha, który polega na dodaniu losowych zakłóceń do pozycji wierzchołków w czasie.</li>
  <li>Glitch generuje losowe "ziarna" na podstawie zmiennej <code>uTime</code>, co powoduje, że zakłócenia zmieniają się co 2 sekundy.</li>
  <li>Ziarna są interpolowane, co pozwala na płynne przejścia między nimi.</li>
  <li>Wartości te wpływają na to, jak poruszają się wierzchołki modelu, nadając mu wrażenie niestabilności lub migotania, zmieniającego się w czasie.</li>
  <li>Ruch glitcha jest kontrolowany przez prędkość określoną przez <code>glitchSpeed</code>, a jego intensywność jest największa w okolicach centrum zakłócenia (które jest losowe i zmienia się w czasie).</li>
  <li>Zakłócenia mają również płynne wygaszanie, które następuje przy przejściu między poszczególnymi ziarniami, co sprawia, że efekt staje się bardziej naturalny.</li>
  <li>Wartość intensywności glitcha jest kontrolowana przez <code>glitchStrength</code>, który zmienia się w zależności od odległości od centrum zakłócenia.</li>
  <li>Na każdą zmianę ziarna glitcha wprowadzona jest płynna zmiana jego intensywności, co wprowadza subtelność w przejściu między różnymi stanami glitcha.</li>
</ul>

<h3>Fragment Shader:</h3>
<ul>
  <li>Paski są nadal generowane, ale ich częstotliwość (kontrolowana przez <code>uFrequency</code>) jest modyfikowana w zależności od czasu <code>uTime</code>, co powoduje dynamiczną zmianę wyglądu pasków.</li>
  <li>Zastosowano efekt Fresnela, który jest obliczany z kierunku widzenia względem powierzchni. Dzięki temu efekt staje się bardziej widoczny na krawędziach obiektów, szczególnie przy dużych kątach widzenia. Fresnel jest podniesiony do potęgi 2.0, co sprawia, że przejścia są mniej dramatyczne, ale bardziej płynne w porównaniu do poprzednich wersji.</li>
  <li>Dodano parametr <code>falloff</code>, który modyfikuje intensywność efektu Fresnela na podstawie odległości. Im bliżej krawędzi, tym efekt jest silniejszy. Wartość falloff jest obliczana za pomocą funkcji <code>smoothstep</code>, co zapewnia płynne przejście.</li>
  <li>Kolor finalny jest uzyskiwany przez interpolację między kolorem podanym w <code>uColor</code> a białym, w zależności od intensywności hologramu, która jest uzależniona od efektu Fresnela oraz pasków.</li>
  <li>Efekt hologramu jest dynamicznie modyfikowany przez częstotliwość pasków, co powoduje, że obiekt zmienia swój wygląd w czasie.</li>
</ul>

<h3>Interakcja z użytkownikiem i dynamiczna zmiana parametrów:</h3>
<ul>
  <li>Za pomocą JavaScript dodano możliwość interakcji z użytkownikiem. Zmiana parametrów shaderów odbywa się w odpowiedzi na najechanie kursorem na obiekt w scenie.</li>
  <li>Podczas najechania kursora na obiekt, zmienia się częstotliwość pasków (parametr <code>uFrequency</code>) oraz kolor obiektu (parametr <code>uColor</code>). W ten sposób użytkownik może zmieniać wygląd obiektów na scenie w czasie rzeczywistym.</li>
  <li>Zmiana parametrów odbywa się płynnie, dzięki czemu przejścia między różnymi stanami shaderów są subtelne i naturalne.</li>
  <li>Po zdjęciu kursora z obiektu, parametry wracają do wartości początkowych, przywracając pierwotny wygląd obiektu.</li>
</ul>

<p>W efekcie całość tworzy dynamiczny, glitchowy wygląd z subtelnym efektem hologramu, który zmienia się w czasie. Zakłócenia w pozycjonowaniu wierzchołków oraz zmienne, wyraźniejsze przejścia na krawędziach obiektów tworzą interesujący, nieco niestabilny efekt wizualny. Dzięki dynamicznej interakcji z użytkownikiem, efekt staje się bardziej interaktywny i responsywny na działania użytkownika.</p>

    `,
	},
];
