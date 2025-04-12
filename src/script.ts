import "./style/global.css";
import "./features/posts/components/PostComponent";
import { posts } from "./features/posts";

//Funkcja główna
function main() {
	const appElement = document.querySelector<HTMLDivElement>("#app");
	//Sprawdzenie czy element #app istnieje
	if (!appElement) {
		console.error("Element #app nie został znaleziony!");
		return;
	}
	//Wstawienie elementów do #app
	appElement.innerHTML = `
     <header class="blog-header">
      <h1 class="blog-title">Hologram - Blog</h1>
      <p class="blog-description">
        <h2>Inicjalizacja projektu z TypeScript i Vite</h2>
        <p>Aby rozpocząć projekt z TypeScript i Vite, wystarczy użyć komendy: <code>npm create vite@latest</code> i wybrać szablon TypeScript. 
				Vite oferuje szybkie środowisko deweloperskie z natychmiastowym HMR (Hot Module Replacement). 
				Więcej informacji w <a href="https://vite.dev/guide/" target="_blank" rel="noopener noreferrer">oficjalnej dokumentacji Vite</a>.</p>
        
        <h2>Konfiguracja shaderów GLSL w projekcie</h2>
        <p>Aby używać shaderów GLSL w projekcie, należy:</p>
        <ol>
          <li>Utworzyć plik <code>glsl.d.ts</code> z deklaracją modułu:
          <pre><code>declare module "*.glsl" {
  const value: string;
  export default value;
}</code></pre>
          </li>
          <li>Zainstalować plugin vite-plugin-glsl: <code>npm install vite-plugin-glsl --save-dev</code></li>
          <li>Skonfigurować plugin w pliku <code>vite.config.ts</code></li>
        </ol>
        
        <h2>O projekcie hologramu 3D</h2>
        <p>Projekt hologramu 3D to interaktywna wizualizacja wykorzystująca Three.js i shadery GLSL do stworzenia efektu holograficznego. Wykorzystujemy model 3D z efektami przezroczystości, odbicia Fresnela i animacjami glitchu, aby stworzyć realistyczny efekt hologramu.</p>
        
        <h2>Three.js - biblioteka do grafiki 3D</h2>
        <p>Three.js to potężna biblioteka JavaScript do tworzenia i wyświetlania grafiki 3D w przeglądarce. Oferuje wysokopoziomowe API do pracy z WebGL. Szczegółową dokumentację znajdziesz na <a href="https://threejs.org/docs/" target="_blank">stronie Three.js</a>.</p>
        
        <h2>Shadery GLSL</h2>
        <p>GLSL (OpenGL Shading Language) to język programowania używany do pisania shaderów - programów wykonywanych bezpośrednio na GPU. Aby pracować z GLSL lokalnie:</p>
        <ol>
          <li>Zainstaluj rozszerzenie do swojego edytora (np. "Shader languages support for VS Code")</li>
          <li>Zainstaluj narzędzia do kompilacji shaderów, np. glslang: <code>npm install -g glslang-validator</code></li>
          <li>Użyj wtyczek do bundlerów, takich jak vite-plugin-glsl, aby importować pliki shaderów bezpośrednio do kodu</li>
        </ol>
      </p>
    </header>
    <main id="posts"></main>
  `;
	//Pobranie elementu #posts
	const postsContainer = document.querySelector("#posts");
	//Sprawdzenie czy element #posts istnieje
	if (postsContainer) {
		//Dodanie elementów do #posts
		posts.forEach((post) => {
			const postElement = document.createElement("blog-post") as any;
			postElement.post = post;
			postsContainer.appendChild(postElement);
		});
	}
}
//Sprawdzenie czy strona jest załadowana
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", main);
} else {
	main();
}
