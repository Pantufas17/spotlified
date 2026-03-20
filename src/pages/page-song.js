import { getSong } from "../api.js";
import { playSong } from "../elements/player.js";


customElements.define(
  "page-song",
  class extends HTMLElement {
    connectedCallback() {
      const songId = this.getAttribute("song-id");

      getSong(songId).then((song) => {
        this.innerHTML = `
    <h4>${song.title}</h4>
    <p>${song.artist.name}</p>
    <button type="button" class="icon-button play-button">
      <span class="material-icons">play_arrow</span>
    </button>
    <p>${song.lyrics}</p>
  `;

        this.querySelector(".play-button").addEventListener("click", () => {
          playSong(song, [song]);
          window.location.hash = "#player";
        });
      });
    }
  },
);
