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
        TODO: opis
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
