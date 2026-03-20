import { getSong } from "../api.js";

customElements.define(
  "page-song",
  class extends HTMLElement {
    connectedCallback() {
      const songId = this.getAttribute("song-id");

      getSong(songId).then((song) => {
        this.innerHTML = `
          <h4>${song.title}</h4>
          <p>${song.artist.name}</p>
        `;
      });
    }
  }
);
