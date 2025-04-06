import { Post } from "../types/Post";

//Funkcja zwracająca link do strony z postem
const getBaseUrl = (id: string) => `/features/3d-stages/${id}_stage/index.html`;

//Klasa rozszerzająca HTMLElement i tworząca nowy element blog-post
export class PostComponent extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	set post(post: Post) {
		if (!this.shadowRoot) return;
		//TODO: wrzucić style  do CSS-a
		this.shadowRoot.innerHTML = `
   <style>
        :host {
          display: block;
          margin: 20px;
          padding: 20px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .post-title {
          font-size: 24px;
          color: #333;
          margin-bottom: 10px;
        }
        .post-date {
          color: #666;
          font-size: 14px;
          margin-bottom: 15px;
        }
        .post-content {
          line-height: 1.6;
          color: #444;
        }
        .post-iframe {
          width: 100%;
          height: 400px;
          border: none;
          border-radius: 4px;
        }
        .iframe-container {
          position: relative;
          width: 100%;
          height: 400px;
          margin-top: 20px;
          margin-bottom: 20px;
          overflow: hidden;
        }
        .loader {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 75px;
          height: 75px;
          border: 5px solid #f3f3f3;
          border-top: 5px solid #000000;
          border-radius: 50%;
          animation: spin 2s linear infinite;
          z-index: 1;
        }
        @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .hidden {
          display: none;
        }
        .open-button {
          display: block;
          width: 100%;
          background-color: #000;
          color: #fff;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 10px;
          border: none;
          text-align: center;
        }
      </style>
          <article>
        <h2 class="post-title">${post.title}</h2>
        <div class="post-content">${post.content}</div>
        <div class="iframe-container">
          <div class="loader" id="loader-${post.id}"></div>
          <iframe class="post-iframe" src="${getBaseUrl(post.id)}" id="iframe-${
			post.id
		}" onload="this.getRootNode().host.hideLoader('${post.id}')"></iframe>
        </div>
        <a href="${getBaseUrl(
				post.id
			)}" target="_blank" rel="noopener noreferrer" style="width: 100%;">
          <button class="open-button">Otwórz w nowej karcie</button>
        </a>
      </article>
    `;
	}

	//Ukrywanie loader'a
	hideLoader(postId: string) {
		if (!this.shadowRoot) return;
		const loader = this.shadowRoot.getElementById(`loader-${postId}`);
		if (loader) {
			loader.classList.add("hidden");
		}
	}
}

customElements.define("blog-post", PostComponent);
