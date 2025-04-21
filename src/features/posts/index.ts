//import typu POST z pliku types/Post.ts
import { type Post } from "./types/Post";

//Array postów zawierających id, tytuł i treść postu
export const posts: Post[] = [
	{
		id: "0",
		title: "Omówienie i inicjalizacja projektu Three.js",
		content: `
  <section class="post-content">
    <p>
      Three.js to jedna z najpopularniejszych bibliotek JavaScript służących do tworzenia grafiki
      trójwymiarowej w przeglądarce internetowej. Opiera się na technologii WebGL i umożliwia budowę
      złożonych, interaktywnych scen 3D bez konieczności pisania kodu WebGL. Jednym z
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

    <label>index.html</label>
    <pre style="background-color: #1d1f2a; padding: 10px; border-radius: 5px; color: #ffffff; overflow: auto;">
      <code>
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;Hologram - poradnik&lt;/title&gt;
  &lt;link rel="stylesheet" href="./styles/index.css"&gt;
&lt;/head&gt;

&lt;body&gt;
  &lt;canvas class="webgl"&gt;&lt;/canvas&gt;
  &lt;script type="module" src="./script/Canvas3D.ts"&gt;&lt;/script&gt;

&lt;/body&gt;

&lt;/html&gt;
      </code>
    </pre>

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
      rendererów często obejmuje także antyaliasing, który niweluje efekt „ząbkowania" na krawędziach
      obiektów.
    </p>

    <label>Canvas3D.ts</label>
    <pre style="background-color: #1d1f2a; padding: 10px; border-radius: 5px; color: #ffffff; overflow: auto;">
      <code>
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
      \`Canvas element with selector \${canvasSelector} not found\`
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
      </code>
    </pre>

<label>index.css</label>
<pre style="background-color: #1d1f2a; padding: 10px; border-radius: 5px; color: #ffffff; overflow: auto;">
<code>
*
{
    margin: 0;
    padding: 0;
}

html,
body
{
    overflow: hidden;
}

.webgl
{
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
}

</code>
</pre>

    <p>
      W przykładowej scenie dodawany jest również prosty obiekt geometryczny — płaszczyzna o białym kolorze
      Jej rotacja w przestrzeni pozwala na ustawienie jej w odpowiedniej orientacji względem kamery, 
			co jest szczególnie istotne przy prezentacji modeli trójwymiarowych.
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
		title: "Shadery i interfejs GUI w Three.js",
		content: `
      <section>
        <p>
          Współczesne aplikacje 3D w przeglądarkach coraz częściej wykorzystują niestandardowe shadery oraz interaktywne
          interfejsy użytkownika do manipulowania parametrami renderowania w czasie rzeczywistym. Three.js, jako rozbudowana
          biblioteka JavaScript, oferuje zestaw narzędzi, które umożliwiają tworzenie takich zaawansowanych środowisk
          graficznych. Przykładowy system inicjalizacji sceny 3D został wzbogacony o wsparcie dla shaderów GLSL oraz
          interfejsu GUI na bazie biblioteki lil-gui.
        </p>

        <p>
          Nowością w przedstawionej architekturze jest zastosowanie dedykowanego GUI, umożliwiającego, jako przykład, dynamiczną zmianę
          koloru tła renderera. Parametr koloru jest definiowany jako część konfiguracyjnego obiektu i aktualizowany na
          bieżąco w reakcji na działania użytkownika. Takie podejście zwiększa interaktywność aplikacji i wspiera szybkie
          prototypowanie.
        </p>

        <label>Canvas3D.ts</label>
        <pre style="background-color: #1d1f2a; padding: 10px; border-radius: 5px; color: #ffffff; overflow: auto;">
          <code>
<span style="color: #ff0000;">import GUI from "lil-gui";</span>          
</span>          
//Dodane pole dla gui
<span style="color: #ff0000;">private gui: GUI;</span>
private canvas: HTMLCanvasElement;
private scene: THREE.Scene;
private sizes: { width: number; height: number };
//...

//Dodane pole dla gui
<span style="color: #ff0000;">import GUI from "lil-gui";         
private setupGUI(): void {
  this.gui.addColor(this.rendererParameters, "bgColor").onChange(() => {
		this.renderer.setClearColor(this.rendererParameters.bgColor);
  });
}
</span> 
          </code>
        </pre>


        <p>
          Kolejnym kluczowym komponentem systemu jest użycie materiału opartego na shaderach. W miejsce gotowych materiałów
          Three.js zastosowano ShaderMaterial z własnymi programami wierzchołkowymi i fragmentowymi. Dzięki temu możliwe
          jest pełne przejęcie kontroli nad procesem renderowania, co otwiera drogę do implementacji efektów specjalnych,
          takich jak niestandardowe oświetlenie, animacje proceduralne czy efekty post-processingu.
				</p>
        <label>fragment.glsl</label>
        <pre style="background-color: #1d1f2a; padding: 10px; border-radius: 5px; color: #ffffff; overflow: auto;">
          <code>
void main()
{
    // Kolor finalny
    gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
    // Tonemapping z Three.js
    #include &lt;tonemapping_fragment>
    // Colorspace z Three.js
    #include &lt;colorspace_fragment>
}
          </code>
        </pre>

        <label>vertex.glsl</label>
        <pre style="background-color: #1d1f2a; padding: 10px; border-radius: 5px; color: #ffffff; overflow: auto;">
          <code>
void main()
{
    // Position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Final position
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}
          </code>
        </pre>

        <pre style="background-color: #1d1f2a; padding: 10px; border-radius: 5px; color: #ffffff; overflow: auto;">
          <code>
// Importuje shader wierzchołkowy
import vertexShader from "../shaders/vertex.glsl";
// Importuje shader fragmentów
import fragmentShader from "../shaders/fragment.glsl";

// Tworzy materiał oparty na shaderach
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});
        </code>
      </pre>
    
        <p>
          W konfiguracji <code>ShaderMaterial</code> bazuje na dwóch komponentach – shaderze wierzchołkowym
          (<code>vertex shader</code>) oraz shaderze fragmentów (<code>fragment shader</code>). Shader wierzchołkowy
          odpowiada za przekształcenie współrzędnych obiektu w przestrzeni modelu do przestrzeni widoku oraz projekcji, a
          także przekazuje współrzędne UV do dalszego etapu renderowania. Kluczową rolę pełni tu zmienna <code>vUv</code>,
          która przechowuje wartości współrzędnych UV każdego wierzchołka i przekazywana jest do shaderu fragmentów.
        </p>
    

        <p>
          Renderowana scena zawiera prosty obiekt geometryczny – płaszczyznę – który jest obracany w przestrzeni 3D i
          pokrywany materiałem zdefiniowanym przez shadery. Całość objęta jest pętlą animacyjną, w której aktualizowane są
          kontrolery i odświeżany jest rendering. Obsługa zdarzeń zmiany rozmiaru okna zapewnia responsywność i zachowanie
          prawidłowych proporcji niezależnie od urządzenia.
        </p>
      </section>
    `,
	},
	{
		id: "2",
		title: "Tworzenie gradientu z użyciem shaderów",
		content: `
	<section>
    <p>
      Shader fragmentów dokonuje obliczeń koloru końcowego piksela. W tym przypadku jego działanie opiera się na prostym
      przekształceniu – odczytywana jest wartość <code>x</code> ze współrzędnych UV (czyli poziome położenie piksela na
      powierzchni geometrycznej), a następnie używana jako wartość jasności koloru RGB. Efektem tego działania jest
      gradient poziomy: od czerni (po lewej stronie płaszczyzny) do bieli (po prawej). Całość renderowana jest z
      zachowaniem tonemappingu i przestrzeni kolorów, co pozwala uzyskać efekt spójny z domyślnymi ustawieniami silnika
      Three.js.
    </p>

		<p>
			Pierwsza wersja aplikacji wykorzystuje statyczny shader, w którym kolor każdego piksela ustalany jest na podstawie
			współrzędnej <code>vUv.x</code>. Oznacza to, że kolor zmienia się tylko w poziomie, tworząc efekt prostego
			gradientu. Choć taki efekt bywa wystarczający w wielu przypadkach, jego wartość użytkowa jest ograniczona – brak tu
			interakcji i możliwości dynamicznej kontroli nad wyglądem sceny.
		</p>

    <label>fragment.glsl</label>
    <pre style="background-color: #1d1f2a; padding: 10px; border-radius: 5px; color: #ffffff; overflow: auto;">
      <code>
varying vec2 vUv;

void main()
{
    // wyciągnięcie wartości x z uv
    float x = vUv.x;

    // Kolor finalny
    vec4 color = vec4(vec3(x), 1.0);
    gl_FragColor = color;
    // Tonemapping z Three.js
    #include &lt;tonemapping_fragment>
    // Colorspace z Three.js
    #include &lt;colorspace_fragment>
}
      </code>
    </pre>
		</section>  
    `,
	},
	{
		id: "3",
		title: "Tworzenie efektu 'żaluzji' z użyciem shaderów",
		content: `
      <section>

  <p>
    Zamieniając <code>uv</code> na <code>vPosition</code> w shaderze wierzchołkowym, mamy większą kontrolę nad obiektem.
    Shader wierzchołkowy przekształca pozycję wierzchołków z przestrzeni modelu na przestrzeń kamery oraz zapewnia
    przesyłanie tych informacji do kolejnego etapu renderowania. W tym przypadku tworzymy zmienną
    <code>vPosition</code>, która przechowuje pozycję wierzchołka w przestrzeni modelu. Następnie, w shaderze
    fragmentów, operujemy na tych danych, aby uzyskać finalny kolor fragmentu. Jest to możliwe dzięki wprowadzeniu
    zmiennej <code>vPosition</code> do shaderów fragmentów, która jest interpolowana między wierzchołkami.
  </p>

  <p>
    Poniżej znajduje się kod shaderów wierzchołkowego i fragmentowego, które tworzą efekt 'żaluzji'.
  </p>

  <label>vertex.glsl</label>
  <pre style="background-color: #1d1f2a; padding: 10px; border-radius: 5px; color: #ffffff; overflow: auto;">
  <code>
varying vec3 vPosition;

void main() 
{
// Pozycja modelu
vec4 modelPosition = modelMatrix * vec4(position, 1.0);

// Finalna pozycja
gl_Position = projectionMatrix * viewMatrix * modelPosition;

// Przesyłanie danych do fragmentu
vPosition = modelPosition.xyz;
}
  </code></pre>

  <label>fragment.glsl</label>
  <pre style="background-color: #1d1f2a; padding: 10px; border-radius: 5px; color: #ffffff; overflow: auto;">
    <code>
uniform float uFrequency;
varying vec2 vUv;

void main()
{
    // wyciągnięcie wartości y z uv
    float y = vUv.y;
    float strength = mod(y * uFrequency, 1.0);

    // Kolor finalny
    vec4 color = vec4(vec3(strength), 1.0);
    gl_FragColor = color;
    // Tonemapping z Three.js
    #include &lt;tonemapping_fragment>
    // Colorspace z Three.js
    #include &lt;colorspace_fragment>
}
              </code>
            </pre>
        
            <p>
              Dodano również kontrolę częstotliwości <code>uFrequency</code>, która pozwala na dynamiczną zmianę efektu. 
              Wartość ta jest przesyłana do shaderów fragmentów, co pozwala na zmianę koloru w zależności od położenia piksela.
            </p>
        
            
        
            </section>
    `,
	},
	{
		id: "4",
		title: "Wczytywanie modeli 3D w formacie GLTF",
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
		<a href="https://www.cgtrader.com/free-3d-models/character/sci-fi-character/r2-d2-8fd6505d-d14b-44c7-befb-caee9ec486cf" target="_blank" rel="noopener noreferrer">Link do modelu</a>
		Warto powiedzieć, że najlepiej jest używać modeli w formacie GLB, ponieważ jest to format wspierany przez wiele przeglądarek.
		Jednakże nie zawsze można znaleźć model w tym formacie, dlatego warto pobrać program do konwersji modeli 3d.
		Ja osobiscie używam <a href="https://www.blender.org/" target="_blank" rel="noopener noreferrer">Blender</a>. 
		Wczytuję model w formacie GLB i konwertuję go na GLTF.
	</p>

  <p>
    Po załadowaniu modelu, następnie przechodzimy do jego centrowania w przestrzeni 3D. Zastosowanie <code>Box3</code> z
    Three.js pozwala na obliczenie otaczającej objętości modelu, a następnie wycentrowanie go w przestrzeni, co jest
    kluczowe dla późniejszego renderowania w odpowiednich proporcjach. Model zostaje dodany do sceny, a kamera jest
    automatycznie dostosowywana do rozmiarów obiektu, co pozwala na właściwe ustawienie punktu widzenia.
  </p>

  <p>
    Warto zauważyć, że po załadowaniu modelu, każdemu jego elementowi domyślnie przypisuje się materiał. W tym przypadku jest to
    prosty materiał <code>MeshBasicMaterial</code>, który może zostać wymieniony na bardziej zaawansowany materiał
    oparty na shaderach w późniejszych etapach, co otwiera drogę do implementacji efektów takich jak hologramy,
    niestandardowe oświetlenie czy animacje proceduralne.
  </p>

  <p>
    Poniżej przedstawiamy kod, który ładuje model, centrowań go w przestrzeni oraz dostosowuje kamerę do jego rozmiaru:
  </p>

  <pre style="background-color: #1d1f2a; overflow: auto; color: #fff; padding: 10px; border-radius: 5px; overflow: auto;"><code class="language-typescript">
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
	private model: THREE.Group | null = null; // Wczytany model 3D

	constructor(canvasSelector: string) {
		// Inicjalizacja panelu debugowania
		this.gui = new GUI();

		// Pobieranie elementu canvas z DOM
		const canvasElement = document.querySelector(canvasSelector);
		if (!canvasElement) {
    // Wyrzucenie błędu jeśli element canvas nie został znaleziony
    throw new Error(
      \`Canvas element with selector \${canvasSelector} not found\`
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
    </section>
    `,
	},
	{
		id: "5",
		title: "Materiały domyślne modeli 3D w Three.js",
		content: `
        <section>
	
    <p>
     Potwierdznie, że domyślnie model 3d ma materiał.
    </p>

    <label>Canvas3D.ts</label>
    <pre style="background-color: #1d1f2a; overflow-x: auto; color: #fff; padding: 10px; border-radius: 5px; overflow: auto;">
    <code>
// dodanie podstawowego materiału
private material: THREE.MeshBasicMaterial; // Podstawowy materiał dla modelu

//...

// Tworzenie podstawowego materiału
this.material = new THREE.MeshBasicMaterial();

//..

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
    </code>
    </pre>

    <p>Jak widać, model się nie zmienił.</p>

    </section>
    `,
	},
	{
		id: "6",
		title: "Implementacja efektu 'żaluzji' na modelu 3D",
		content: `
    <p>
      W poprzednim etapie stworzyliśmy aplikację renderującą model 3D w Three.js z wykorzystaniem <code>GLTFLoader</code>, 
      <code>OrbitControls</code> i klasycznego materiału <code>MeshBasicMaterial</code>. Model był centrowany w przestrzeni 3D 
      i renderowany przy pomocy kamery z dynamicznymi kontrolkami. 
      Ten etap był niezbędny, aby przygotować grunt pod wprowadzenie bardziej zaawansowanych efektów wizualnych.
    </p>

    <p>
      Obecnie przeszliśmy do kluczowego momentu projektu – integracji shaderów GLSL
      w celu stworzenia efektu przypominającego hologram.
      Oto zmiany, które zostały wprowadzone w kodzie źródłowym oraz ich znaczenie:
    </p>

    <h2>1. Wprowadzenie ShaderMaterial zamiast MeshBasicMaterial</h2>
    <p>
      Dotychczas używany <code>MeshBasicMaterial</code> został zastąpiony niestandardowym materiałem <code>ShaderMaterial</code>, który wykorzystuje dwa pliki shaderów: <code>vertex.glsl</code> oraz <code>fragment.glsl</code>. Dzięki temu zyskujemy pełną kontrolę nad renderowaniem piksela i wierzchołka, co jest podstawą do implementacji efektu holograficznego.
    </p>

      <pre style="background-color: #1d1f2a; overflow-x: auto; color: #fff; padding: 10px; border-radius: 5px; overflow: auto;"><code>
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
    <pre style="background-color: #1d1f2a; overflow-x: auto; color: #fff; padding: 10px; border-radius: 5px; overflow: auto;"><code>
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
    <pre style="background-color: #1d1f2a; overflow-x: auto; color: #fff; padding: 10px; border-radius: 5px; overflow: auto;"><code>
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
      Interfejs GUI umożliwia użytkownikowi manipulowanie częstotliwością linii hologramu w czasie rzeczywistym, jednakże na razie nie będzie działać ze względu na to, 
      że nie została dodana zmienna <code>uFrequency</code> do <code>ShaderMaterial</code>.
    </p>

    <pre style="background-color: #1d1f2a; overflow-x: auto; color: #fff; padding: 10px; border-radius: 5px; overflow: auto;"><code>
this.gui.add(this.rendererParameters, "frequency").onChange(() => {
  this.rendererParameters.frequency = this.rendererParameters.frequency;
  if (this.material) {
  this.material.uniforms.uFrequency.value = this.rendererParameters.frequency;
    }
});
    </code></pre>
    </section>

    `,
	},
	{
		id: "7",
		title: "Animacja czasowa w shaderach",
		content: `
 <p>Teraz trzeba dodać nowy uniform <code>uTime</code> do <code>ShaderMaterial</code>, który przekazuje do shadera wartość
  upływającego czasu w sekundach. Dzięki temu możemy tworzyć dynamiczne, zmieniające się w czasie efekty wizualne.</p>

  <p>W klasie <code>Canvas3D</code> dodano instancję <code>THREE.Clock</code>, która pozwala śledzić upływ czasu od
    momentu uruchomienia aplikacji. Zmienna <code>elapsedTime</code> z tej klasy jest co klatkę przypisywana do uniformu
    <code>uTime</code>.</p>

  <label>Canvas3D.ts</label>
  <pre style="background-color: #1d1f2a; overflow-x: auto; color: #fff; padding: 10px; border-radius: 5px; overflow: auto;"><code>
//Dodanie zmiennej clock
private clock: THREE.Clock;
//...

//Inicjalizacja zmiennej clock
this.clock = new THREE.Clock();

//...

//Dodanie animacji na podstawie zmiennej clock
  private animate(): void {
    const tick = () => {
    const elapsedTime = this.clock.getElapsedTime();

    // Update material
    if (this.material) {
      this.material.uniforms.uTime.value = elapsedTime;
    }
    this.controls.update();
    // Render
    this.renderer.render(this.scene, this.camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

tick();
}
    </code></pre>

  <label>fragment.glsl</label>
  <pre style="background-color: #1d1f2a; overflow-x: auto; color: #fff; padding: 10px; border-radius: 5px; overflow: auto;"><code>
uniform float uFrequency;
uniform float uTime;
varying vec3 vPosition;

void main()
{
    // wyciągnięcie wartości y z uv
    float y = vPosition.y;
    float stripes = mod((y- uTime * 0.1) * uFrequency, 1.0);
    stripes = pow(stripes, 3.0);

    // Kolor finalny
    vec4 color = vec4(vec3(stripes), 1.0);
    gl_FragColor = color;
    // Tonemapping z Three.js
    #include &lt;tonemapping_fragment>
    // Colorspace z Three.js
    #include &lt;colorspace_fragment>
}
    </code></pre>
  <p>
		Zmodyfikowano GUI do kontrolowania <code>frequency</code>, dodając zakres od 1 do 50 oraz krok 1. Pozwala to
    użytkownikowi wygodnie manipulować gęstością efektu pasków w shaderze.
	</p>

  <p>
		W <code>fragmentShader</code> zaktualizowano obliczenia, dodając zależność od czasu: <code>(y - uTime * 0.1)</code>.
    Dzięki temu paski przemieszczają się w górę modelu.
	</p>

  <p>
		Dodano funkcję <code>pow(stripes, 3.0)</code>, która zaostrza gradient pasków, sprawiając, że są bardziej kontrastowe
    i lepiej widoczne, co potęguje wrażenie "holograficznego skanu".
	</p>
    `,
	},
	{
		id: "8",
		title: "Implementacja przezroczystości w shaderach",
		content: `
    <p>
			W <code>ShaderMaterial</code> trzeba było dodać właściwość <code>transparent: true</code>, co pozwala obsługiwać przezroczystość
			materiału i tym samym wykorzystać kanał alfa w fragmencie koloru. Bez tego kanał alfa (przezroczystość) nie działa.
		</p>
		<p>
			W <code>fragmentShader</code> zmieniono linię <code>vec4 color = vec4(vec3(stripes), 1.0);</code> na
			<code>vec4 color = vec4(vec3(1.0), stripes);</code>. Oznacza to, że teraz efekt pasków wpływa na przezroczystość
			(kanał alfa), a nie jasność koloru. 
			Poprzez wykorzystanie kanału alfa shader tworzy dynamiczny efekt pojawiania się i znikania fragmentów modelu, dając
			bardziej holograficzne, efemeryczne wrażenie.
		</p>
    
		<p>
			Dodano nową zmienną <code>vNormal</code> jako <code>varying</code>, która przenosi wektor normalnej z vertex shadera
			do fragment shadera. To umożliwia obliczenia zależne od kąta względem kamery.
		</p>
		<h3>Cały kod do tej pory:</h3>
		<label>Canvas3D.ts</label>
		<pre style="background-color: #1d1f2a; overflow-x: auto; color: #fff; padding: 10px; border-radius: 5px; overflow: auto;"><code>
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

type RendererParameters = {
	bgColor: string;
	frequency: number;
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
	constructor(canvasSelector: string) {
		// Debug
		this.gui = new GUI();

		// Canvas
		const canvasElement = document.querySelector(canvasSelector);
		if (!canvasElement) {
      throw new Error(
        \`Canvas element with selector \${canvasSelector} not found\`
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
			bgColor: "#1d1f2a",
			frequency: 20,
		};

		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
		});
		this.renderer.setClearColor(this.rendererParameters.bgColor);
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
	}

	private setupGUI(): void {
		this.gui.addColor(this.rendererParameters, "bgColor").onChange(() => {
			this.renderer.setClearColor(this.rendererParameters.bgColor);
		});
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
	}

	private createMaterial(): void {
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			transparent: true,
			uniforms: {
				uFrequency: { value: this.rendererParameters.frequency },
				uTime: { value: 0 },
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
  		</code>
		</pre>

  <label>fragment.glsl</label>
  <pre style="background-color: #1d1f2a; overflow-x: auto; color: #fff; padding: 10px; border-radius: 5px; overflow: auto;"><code>
uniform float uFrequency;
uniform float uTime;
varying vec3 vPosition;

void main()
{
    // wyciągnięcie wartości y z uv
    float y = vPosition.y;
    float stripes = mod((y- uTime * 0.1) * uFrequency, 1.0);
    stripes = pow(stripes, 3.0);

    // Kolor finalny
    vec4 color = vec4(vec3(1.0), stripes);
    gl_FragColor = color;
    // Tonemapping z Three.js
    #include &lt;tonemapping_fragment>
    // Colorspace z Three.js
    #include &lt;colorspace_fragment>
}
  		</code>
		</pre>

  <label>vertex.glsl</label>
  <pre style="background-color: #1d1f2a; overflow-x: auto; color: #fff; padding: 10px; border-radius: 5px; overflow: auto;"><code>
uniform float uFrequency;
uniform float uTime;
varying vec3 vPosition;

void main()
{
    // Position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Final position
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // Varyings
    vPosition = modelPosition.xyz;
}
  		</code>
		</pre>
    `,
	},
	{
		id: "9",
		title: "Efekt Fresnela",
		content: `
		<p>
			<strong>Efekt Fresnela</strong> to zjawisko optyczne, które opisuje, jak światło odbija się od powierzchni w
			zależności od kąta patrzenia. Zgodnie z tym efektem:
		</p>

		<p>
			Wprowadzono obliczenie efektu <b>Fresnela</b> — iloczyn skalarny znormalizowanej różnicy pozycji kamery i fragmentu z
			normalą powierzchni: <code>float fresnel = dot(normalize(viewDirection), vNormal);</code>. Efekt ten daje bardziej
			realistyczne krawędziowe podświetlenie powierzchni zależne od kąta widzenia.</p>
		<p>Zmieniono wartość kanału alfa w kolorze końcowym z <code>stripes</code> na <code>fresnel</code>:
			<code>vec4 color = vec4(vec3(1.0), fresnel);</code>. Teraz przezroczystość modelu zależy od kąta patrzenia względem
			normalnej powierzchni, co daje efekt pojawiania się geometrii głównie na obrzeżach — typowy dla efektu Fresnela.
			<br/>
			<a href="https://pl.wikipedia.org/wiki/Równania_Fresnela" target="_blank" rel="noopener noreferrer">Więcej o efekcie Fresnela</a>
		</p>

		<p>
			<strong>Im bardziej się patrzy na powierzchnię pod kątem (czyli po krawędzi), tym bardziej ją widać.</strong> A im
			się patrzy bardziej "na wprost", tym mniej widoczna się staje (częściej przeźroczysta lub mniej błyszcząca).
			</p>
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

<pre style="background-color: #1d1f2a; overflow: auto; color: #fff; padding: 10px; border-radius: 5px;"><code>
uniform float uFrequency;
uniform float uTime;
varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
    // wyciągnięcie wartości y z uv
    float y = vPosition.y;
    float stripes = mod((y- uTime * 0.1) * uFrequency, 1.0);
    stripes = pow(stripes, 3.0);

    // Fresnel
    vec3 viewDirection = vPosition - cameraPosition;
    float fresnel = dot(normalize(viewDirection), vNormal);

    // Kolor finalny
    vec4 color = vec4(vec3(1.0), fresnel);
    gl_FragColor = color;
    // Tonemapping z Three.js
    #include &lt;tonemapping_fragment>
    // Colorspace z Three.js
    #include &lt;colorspace_fragment>
}
</code></pre>
    `,
	},
	{
		id: "10",
		title: "Optymalizacja efektu Fresnela",
		content: `
		<p>W klasycznym Fresnelu interesuje nas odwrotność tego — bo to właśnie krawędzie mają być bardziej widoczne:</p>
<pre><code>float fresnel = 1.0 - dot(viewDir, vNormal);</code></pre>
<p>Wartość fresnela zawsze będzie w zakresie od 0 do 1.</p>
<p>0 oznacza, że obiekt jest całkowicie przeźroczysty (lub matowy) i nie odbija światła.</p>
<p>1 oznacza, że obiekt jest całkowicie błyszczący i odbija światło.</p>
<p>Wartość 0.5 oznacza, że obiekt jest połowę przeźroczysty i połowę błyszczący.</p>

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

<label>fragment.glsl</label>
<pre style="background-color: #1d1f2a; overflow: auto; color: #fff; padding: 10px; border-radius: 5px;"><code>
uniform float uFrequency;
uniform float uTime;
varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
    // wyciągnięcie wartości y z uv
    float y = vPosition.y;
    float stripes = mod((y- uTime * 0.1) * uFrequency, 1.0);
    stripes = pow(stripes, 3.0);

    // Fresnel
    vec3 viewDirection = vPosition - cameraPosition;
    float fresnel = dot(normalize(viewDirection), vNormal) + 1.0;
    fresnel = pow(fresnel, 3.0);

    // Kolor finalny
    vec4 color = vec4(vec3(1.0), fresnel);
    gl_FragColor = color;
    // Tonemapping z Three.js
    #include &lt;tonemapping_fragment>
    // Colorspace z Three.js
    #include &lt;colorspace_fragment>
}
</code></pre>
    `,
	},
	{
		id: "11",
		title: "Łączenie efektu Fresnela z animacją hologramu",
		content: `
     <p>Teraz dodamy wcześniej stworzony efekt animacji hologramu do efektu Fresnela. Poniżej opisuję, co zostało zmienione lub dodane:</p>
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

<label>fragment.glsl</label>
<pre style="background-color: #1d1f2a; overflow-x: auto; color: #fff; padding: 10px; border-radius: 5px;"><code>
uniform float uFrequency;
uniform float uTime;
varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
    // wyciągnięcie wartości y z uv
    float y = vPosition.y;
    float stripes = mod((y- uTime * 0.1) * uFrequency, 1.0);
    stripes = pow(stripes, 3.0);

    // Fresnel
    vec3 viewDirection = vPosition - cameraPosition;
    float fresnel = dot(normalize(viewDirection), vNormal) + 1.0;
    fresnel = pow(fresnel, 3.0);

    float holo = stripes * fresnel;
    holo += fresnel * 1.25;

    // Kolor finalny
    vec4 color = vec4(vec3(1.0), holo);
    gl_FragColor = color;
    // Tonemapping z Three.js
    #include &lt;tonemapping_fragment>
    // Colorspace z Three.js
    #include &lt;colorspace_fragment>
}
</code></pre>


    `,
	},
	{
		id: "12",
		title: "Kontrola widoczności elementów modelu i animacja hologramu",
		content: `
      <p>
				Teraz zmienimy sposób obliczania efektu Fresnela, poprzez
				uwzględnienie orientacji renderowanej powierzchni względem kamery.
			</p>

			<p>
				Dodano obsługę odwrotnych normalnych poprzez sprawdzenie, czy dana powierzchnia jest skierowana frontem do kamery, i
				w razie potrzeby odwrócenie normalnej. Dzięki temu efekt zachowuje się poprawnie niezależnie od tego, z której strony
				patrzymy na obiekt – co ma znaczenie przy modelach renderowanych dwustronnie lub z odwróconymi trójkątami.
			</p>

			<p>
				Reszta działania pozostała taka sama: wyliczany jest efekt pasków na podstawie pozycji w pionie oraz przesuniętego w
				czasie współczynnika <code>uTime</code>, a wartość Fresnela dalej jest przesuwana o <code>+1.0</code> i potęgowana, co
				pozwala na lepsze uwypuklenie krawędzi modelu przy zachowaniu przezroczystego centrum.
			</p>

<label>fragment.glsl</label>
<pre style="background-color: #1d1f2a; overflow-x: auto; color: #fff; padding: 10px; border-radius: 5px;"><code>
uniform float uFrequency;
uniform float uTime;
varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
    vec3 normal = normalize(vNormal);
    if(!gl_FrontFacing){
        normal *= - 1.0;
    }
    // wyciągnięcie wartości y z uv
    float stripes = mod((vPosition.y- uTime * 0.1) * uFrequency, 1.0);
    stripes = pow(stripes, 3.0);

    // Fresnel
    vec3 viewDirection = vPosition - cameraPosition;
    float fresnel = dot(normalize(viewDirection), normal) + 1.0;
    fresnel = pow(fresnel, 3.0);

    float holo = stripes * fresnel;
    holo += fresnel * 1.25;

    // Kolor finalny
    vec4 color = vec4(vec3(1.0), holo);
    gl_FragColor = color;
    // Tonemapping z Three.js
    #include &lt;tonemapping_fragment>
    // Colorspace z Three.js
    #include &lt;colorspace_fragment>
}
</code></pre>
    `,
	},
	{
		id: "13",
		title: "Tworzenie animacji glitcha",
		content: `
  	<p>
			Teraz dodajemy funkcjonalność, która wprowadza bardziej zaawansowane kontrolowanie
			efektu przezroczystości poprzez parametr <code>uFalloff</code>, który kontroluje, jak szybko efekt Fresnela zanika na
			brzegach. Użycie <code>falloff = smoothstep(uFalloff, 0.0, fresnel)</code> sprawia, że efekt przejścia od
			przezroczystości do pełnej widoczności staje się bardziej płynny i naturalny, dzięki funkcji <code>smoothstep</code>,
			która wygładza przejście.
		</p>

	<p>
		Dodatkowo dodałem nowy parametr <code>uColor</code>, który pozwala na zmianę koloru efektu hologramu.
		Ale to jedynie kosmetyczna zmiana.
	</p>

	<p>Fresnel i paski są nadal obliczane w sposób podobny do poprzednich wersji, ale w tej wersji wprowadzono również
		modyfikację koloru obiektu. Efekt hologramu jest teraz bardziej zróżnicowany, ponieważ jego kolor jest interpolowany
		między zadanym <code>uColor</code> a białym, w zależności od intensywności efektu Fresnela, co daje bardziej
		zróżnicowaną wizualizację.</p>

<p>Na końcu wynikowy kolor jest uzyskiwany przez połączenie koloru obliczonego z Fresnelem oraz efektu
  <code>falloff</code>, który wygładza przejścia, co daje bardziej subtelną wizualizację hologramu. Całość jest
  następnie przekształcana na odpowiednią wartość alpha, co pozwala na uzyskanie głębszego efektu przezroczystości.</p>

<label>fragment.glsl</label>
<pre style="background-color: #1d1f2a; overflow-x: auto; color: #fff; padding: 10px; border-radius: 5px;"><code>

uniform float uFrequency;
uniform float uTime;
uniform vec3 uColor;
uniform float uFalloff;

varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
    vec3 normal = normalize(vNormal);
    if(!gl_FrontFacing){
        normal *= - 1.0;
    }
    // wyciągnięcie wartości y z uv
    float stripes = mod((vPosition.y- uTime * 0.1) * uFrequency, 1.0);
    stripes = pow(stripes, 3.0);

    // Fresnel
    vec3 viewDirection = vPosition - cameraPosition;
    float fresnel = dot(normalize(viewDirection), normal) + 1.0;
    fresnel = pow(fresnel, 3.0);

    // Falloff
    float falloff = smoothstep(uFalloff, 0.0, fresnel);

    float holo = stripes * fresnel;
    holo += fresnel * 1.25;
    holo *= falloff;
    
    // Kolor finalny
    vec3 colorRGB = mix(uColor, vec3(1.0), holo);
    vec4 finalColor = vec4(colorRGB, holo);
    gl_FragColor = finalColor;
    // Tonemapping z Three.js
    #include &lt;tonemapping_fragment>
    // Colorspace z Three.js
    #include &lt;colorspace_fragment>
}

</code></pre>

<label>Canvas3D.ts</label>
<pre style="background-color: #1d1f2a; overflow-x: auto; color: #fff; padding: 10px; border-radius: 5px;"><code>
//...


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
		this.gui.addColor(this.rendererParameters, "bgColor").onChange(() => {
			this.renderer.setClearColor(this.rendererParameters.bgColor);
		});
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
		<span style="color: #f00;">
		// Dodano nowy parametr Falloff
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
		</span>
			<span style="color: #0f0;">
			// Dodano nowy parametr Color
		this.gui.addColor(this.rendererParameters, "color").onChange(() => {
			if (this.material) {
				this.material.uniforms.uColor.value = this.rendererParameters.color;
			}
		});
		</span>
	}

	private createMaterial(): void {
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			transparent: true,
			blending: THREE.AdditiveBlending,
			// depthTest: false,
			depthWrite: false,
			side: 2,
			uniforms: {
				uFrequency: { value: this.rendererParameters.frequency },
				uTime: { value: 0 },
				<span style="color: #f00;"> 
				// Dodano nowy parametr Falloff
				uFalloff: { value: this.rendererParameters.falloff },
				</span>
				<span style="color: #0f0;">
				// Dodano nowy parametr Color
				uColor: { value: this.rendererParameters.color },
				</span>
			},
		});
	}

	//...

</pre>

    `,
	},
	{
		id: "14",
		title: "Implementacja efektu glitch w shaderze wierzchołkowym",
		content: `
      <p>Teraz dodamy efekt <b>glitch</b>, który jest realizowany w <code>vertex shaderze</code>. Do pozycji wierzchołków
  dodawane są losowe zakłócenia (przesunięcia) na podstawie funkcji <code>random2D</code>, która generuje pseudolosowe
  wartości w płaszczyźnie <code>xz</code> oraz <code>zx</code>, z uwzględnieniem czasu <code>uTime</code>. Dzięki temu
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
  niestabilnych wizualizacji w połączeniu z holograficznym efektem. </p>

<p style="font-style: italic;">Trzeba też dodać nową funkcję np. w folderze <code>utils</code> w pliku <code>random2d.glsl</code>.</p>

<label>random2d.glsl</label>
<pre style="background-color: #1d1f2a; overflow-x: auto; color: #fff; padding: 10px; border-radius: 5px;"><code>
float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}
</code></pre>

<label>vertex.glsl</label>
<pre style="background-color: #1d1f2a; overflow-x: auto; color: #fff; padding: 10px; border-radius: 5px;"><code>
#include "./utils/random2d.glsl"

uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
    // Position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Glitch
    modelPosition.x += random2D(modelPosition.xz + uTime);
    modelPosition.z += random2D(modelPosition.zx + uTime);

    // Final position
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // Normal model
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);



    // Varyings
    vPosition = modelPosition.xyz;
    vNormal = modelNormal.xyz;
}
</code></pre>
    `,
	},
	{
		id: "15",
		title: "Udoskonalenie animacji glitch z efektem płynnego przejścia",
		content: `
      <p>Teraz warto naprawić animację glitcha. Przede wszystkim zmienimy sposób generowania losowych zakłóceń.</p>
			<h3>Vertex Shader:</h3>
			<ul>
				<li>Glitch generuje losowe "ziarna" na podstawie zmiennej <code>uTime</code>, co powoduje, że zakłócenia zmieniają się co 2 sekundy.</li>
				<li>Wartości te wpływają na to, jak poruszają się wierzchołki modelu, nadając mu wrażenie niestabilności lub migotania, zmieniającego się w czasie.</li>
				<li>Ruch glitcha jest kontrolowany przez prędkość określoną przez <code>glitchSpeed</code>, a jego intensywność jest największa w okolicach centrum zakłócenia (które jest losowe i zmienia się w czasie).</li>
				<li>Zakłócenia mają również płynne wygaszanie, które następuje przy przejściu między poszczególnymi ziarniami, co sprawia, że efekt staje się bardziej naturalny.</li>
			</ul>

<label>vertex.glsl</label>
<pre style="background-color: #1d1f2a; overflow-x: auto; color: #fff; padding: 10px; border-radius: 5px;"><code>
#include "./utils/random2d.glsl"

uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
    // Position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Glitch
    // Generujemy losowe "ziarna" dla różnych aspektów glitcha
    float glitchSeed = floor(uTime * 0.5); // Zmienia się co 2 sekundy
    float nextGlitchSeed = glitchSeed + 1.0; // Następne ziarno
    float transitionFactor = fract(uTime * 0.5); // Współczynnik przejścia między ziarnami
    
    // Interpolujemy między bieżącym a następnym ziarnem
    float locationSeed = mix(
        random2D(vec2(glitchSeed, 0.0)),
        random2D(vec2(nextGlitchSeed, 0.0)),
        smoothstep(0.8, 1.0, transitionFactor) // Płynne przejście pod koniec cyklu
    );
    
    float durationSeed = mix(
        random2D(vec2(glitchSeed, 1.0)),
        random2D(vec2(nextGlitchSeed, 1.0)),
        smoothstep(0.8, 1.0, transitionFactor)
    );
    
    // Określamy centrum glitcha (losowe miejsce)
    float glitchCenterY = -5.0 + locationSeed * 10.0;
    
    // Glitch porusza się w górę z losową prędkością
    float glitchSpeed = 1.0 + durationSeed * 2.0; // Prędkość między 1.0 a 3.0
    float movingGlitchY = glitchCenterY + mod(uTime * glitchSpeed, 15.0); // Porusza się w górę i resetuje

    // Siła glitcha zależy od odległości od poruszającego się centrum
    float glitchDistance = abs(modelPosition.y - movingGlitchY);
    float glitchStrength = smoothstep(1.5, 0.0, glitchDistance); // Silniejszy bliżej centrum
    
    // Dodajemy losowe fluktuacje do siły glitcha
    glitchStrength *= sin(uTime * 4.0 + modelPosition.y) * 0.5 + 0.5;
    
    // Dodajemy płynne wygaszanie przy zmianie ziarna
    glitchStrength *= 1.0 - smoothstep(0.7, 0.99, transitionFactor);
    
    glitchStrength *= 0.15; // Kontrola ogólnej siły efektu
    
    // Aplikujemy glitch
    modelPosition.x += (random2D(modelPosition.xz + uTime * 0.5) - 0.5) * glitchStrength;
    modelPosition.z += (random2D(modelPosition.zx + uTime * 0.7) - 0.5) * glitchStrength;

    // Final position
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // Normal model
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

    // Varyings
    vPosition = modelPosition.xyz;
    vNormal = modelNormal.xyz;
}
</code></pre>
    `,
	},
	{
		id: "16",
		title: "Dodanie kontrolki do zmiany koloru tła",
		content: `
<p>
		Jako osstatni krok, spróbujmy ulepszyć efekt glitcha. Tak naprawdę bardzo dużo zmian było robione metodą prób i błędów.
		Po dłuższym czasie udało mi się ustalić odpowiednie wartości i sposób działania efektu.
		Poniżej przedstawię cały kod w wersji finalnej i tam opiszę co zostało zmienione. 
</p>

	<p>
		Dodatkowo, dodałem efekt glitcha przy najechaniu myszą.
		Wartość <code>uHoverGlitch</code> kontroluje intensywność efektu glitcha przy najechaniu myszą.
		Wychwytywanie najechania myszą jest de facto możliwe poprzez używanie raycastera, który jest dostępny w Three.js.
		Raycaster sprawia, że wszystkie obiekty mają własne zdarzenia, które można łatwo wyłapać.
		W tym przypadku, chcemy wyłapać najechanie myszą na obiekt, który ma skrypt Canvas3D.
	</p>

<label>vertex.glsl</label>
<pre style="background-color: #1d1f2a; overflow-x: auto; color: #fff; padding: 10px; border-radius: 5px;"><code>
#include "./utils/random2d.glsl"

uniform float uTime;
uniform float uHoverGlitch;

varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
    // Position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Glitch
    // Generujemy losowe "ziarna" dla różnych aspektów glitcha
    float glitchSeed = floor(uTime * 0.8);
    float nextGlitchSeed = glitchSeed + 1.0;
    float transitionFactor = fract(uTime * 0.8);
    
    
    // Interpolujemy między bieżącym a następnym ziarnem
    float locationSeed = mix(
        random2D(vec2(glitchSeed, 0.0)),
        random2D(vec2(nextGlitchSeed, 0.0)),
        smoothstep(0.8, 1.0, transitionFactor) // Płynne przejście pod koniec cyklu
    );
    
    float durationSeed = mix(
        random2D(vec2(glitchSeed, 1.0)),
        random2D(vec2(nextGlitchSeed, 1.0)),
        smoothstep(0.8, 1.0, transitionFactor)
    );
    
    // Określamy centrum glitcha (losowe miejsce)
    float glitchCenterY = -5.0 + locationSeed * 10.0;
    float glitchCenterY2 = 0.0 + random2D(vec2(glitchSeed + 0.5, 0.3)) * 10.0 - 5.0;
    
    
    // Glitch porusza się w górę z losową prędkością
    float glitchSpeed = 1.0 + durationSeed * 2.0;
    float movingGlitchY = glitchCenterY + mod(uTime * glitchSpeed, 15.0);
    float movingGlitchY2 = glitchCenterY2 + mod(uTime * (glitchSpeed * 0.7), 15.0); // Drugi glitch z inną prędkością
    

    // Siła glitcha zależy od odległości od poruszającego się centrum
    float glitchDistance = min(
        abs(modelPosition.y - movingGlitchY),
        abs(modelPosition.y - movingGlitchY2)
    );
    float glitchStrength = smoothstep(1.8, 0.0, glitchDistance); // Zwiększony zasięg
    
    // Dodajemy losowe fluktuacje do siły glitcha
    glitchStrength *= sin(uTime * 4.0 + modelPosition.y) * 0.5 + 0.5;
    
    // Dodajemy dodatkowy czynnik, który zapewnia, że glitch pojawia się regularnie
    float regularGlitch = step(0.7, sin(uTime * 0.4) * 0.5 + 0.5); // Regularny puls co kilka sekund
    glitchStrength = max(glitchStrength, regularGlitch * 0.1 * (random2D(vec2(position.x + uTime, position.y - uTime)) * 0.8 + 0.2));
    
    // Dodajemy płynne wygaszanie przy zmianie ziarna
    glitchStrength *= 1.0 - smoothstep(0.7, 1.0, transitionFactor);
    
    glitchStrength *= 0.2; // Zwiększona ogólna siła efektu
    
    // Dodajemy efekt glitcha przy najechaniu myszą
    float hoverGlitchEffect = random2D(vec2(position.x * 50.0 + uTime, position.y * 50.0 - uTime)) * uHoverGlitch * 0.2;
    
    // Aplikujemy glitch
    modelPosition.x += (random2D(modelPosition.xz + uTime * 0.5) - 0.5) * glitchStrength;
    modelPosition.z += (random2D(modelPosition.zx + uTime * 0.7) - 0.5) * glitchStrength;
    
    // Aplikujemy glitch przy najechaniu
    modelPosition.x += (random2D(position.xy + uTime * 2.0) - 0.5) * hoverGlitchEffect;
    modelPosition.y += (random2D(position.yz + uTime * 1.5) - 0.5) * hoverGlitchEffect;
    modelPosition.z += (random2D(position.zx + uTime * 1.8) - 0.5) * hoverGlitchEffect;

    // Final position
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // Normal model
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

    // Varyings
    vPosition = modelPosition.xyz;
    vNormal = modelNormal.xyz;
}
</code></pre>

<label>fragment.glsl</label>
<pre style="background-color: #1d1f2a; overflow-x: auto; color: #fff; padding: 10px; border-radius: 5px;"><code>
uniform float uFrequency;
uniform float uTime;
uniform vec3 uColor;
uniform float uFalloff;

varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
    vec3 normal = normalize(vNormal);
    if(!gl_FrontFacing){
        normal *= - 1.0;
    }
    // wyciągnięcie wartości y z uv
    float stripes = mod((vPosition.y- uTime * 0.2) * uFrequency, 1.0);
    stripes = pow(stripes, 2.0);

    // Fresnel
    vec3 viewDirection = vPosition - cameraPosition;
    float fresnel = dot(normalize(viewDirection), normal) + 1.0;
    fresnel = fresnel * 0.9;

    // Falloff
    float falloff = smoothstep(uFalloff, 0.0, fresnel);

    float holo = stripes * fresnel;
    holo += fresnel * 0.75;
    holo *= falloff;
    
    // Kolor finalny
    vec3 colorRGB = mix(uColor, vec3(1.0), holo);
    vec4 finalColor = vec4(colorRGB, holo);
    gl_FragColor = finalColor;
    // Tonemapping z Three.js
    #include &lt;tonemapping_fragment>
    // Colorspace z Three.js
    #include &lt;colorspace_fragment>
}
</code></pre>

<label>Canvas3D.ts</label>
<pre style="background-color: #1d1f2a; overflow-x: auto; color: #fff; padding: 10px; border-radius: 5px;"><code>

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
				\`Canvas element with selector \${canvasSelector} not found\`
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
			frequency: 20,
			falloff: 0.8,
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

		<span style="color: #0f0;">
		// Raycaster dla detekcji najechania na mesh
		const raycaster = new THREE.Raycaster();
		// Vector2 dla pozycji myszy
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
		</span>
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
		<span style="color: #0f0;">
		// Dodano nowy parametr HoverGlitchIntensity
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
		</span>
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
				<span style="color: #0f0;">
				// Dodano nowy parametr HoverGlitchIntensity
				uHoverGlitch: { value: 0.0 },
				</span>
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


</code></pre>

    `,
	},
];
