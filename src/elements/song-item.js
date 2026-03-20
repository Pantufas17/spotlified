customElements.define(
  "song-item",
  class extends HTMLElement {
    // Définit la liste des attributs qui seront observés et donc appelerons attributeChangedCallback
    // lorsqu'il y a une modification
    static observedAttributes = ["favorite", "href", "title", "song-id"];

    // Appelé lorsque que l'on insert l'élément dans le DOM, typiquement au moment de:
    // songList.appendChild(newElement)
    connectedCallback() {
      this.render();
    }

    attributeChangedCallback() {
      this.render();
    }

    render() {
      const icon =
        this.getAttribute("favorite") == "true"
          ? "favorite"
          : "favorite_border";

      this.innerHTML = `
<a href="#songs/${this.getAttribute("song-id")}" class="list-item-title">
  ${this.getAttribute("title")} 
</a>    <div class="list-item-actions">
      <button type="button" class="icon-button favorite-button">
        <span class="material-icons">${icon}</span>
      </button>
      <button type="button" class="icon-button play-button">
        <span class="material-icons">play_arrow</span>
      </button>
    </div>`;

      this.querySelector(".play-button").addEventListener("click", (event) => {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent("play_click"));
      });

      this.querySelector(".favorite-button").addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("favorite_click"));
      });
    }
  },
);
