import { addSong, deleteSong, getSongs as getFavorites, } from "../elements/favorites.js";
import { playSong } from "../elements/player.js";

customElements.define(
  "page-favorites",
  class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
      <h4>Favoris</h4>
      <div class="list"></div>
    `;

      const songs = getFavorites();
      const listFavorites = this.querySelector(".list");

      songs.forEach((song) => {
        const songItemFav = document.createElement("song-item");
        songItemFav.setAttribute("title", song.title);
        songItemFav.setAttribute("song-id", song.id);
        songItemFav.setAttribute("favorite", true);
        listFavorites.append(songItemFav);
        songItemFav.addEventListener("favorite_click", () => {
          deleteSong(song);
          songItemFav.remove();
        });

        songItemFav.addEventListener("play_click", ()=> {
          playSong(song, songs);
          window.location.hash = "#player";

        })
      }); 

    }  
  },
);
