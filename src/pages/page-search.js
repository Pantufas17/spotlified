import { searchSongs } from "../api.js";
import { isFavorite, addSong, deleteSong } from "../elements/favorites.js";
import "../elements/song-item.js";
import { playSong } from "../elements/player.js";

customElements.define(
  "page-search",
  class extends HTMLElement {
    async connectedCallback() {
      const query = decodeURIComponent(
        window.location.hash.split("/")[1] || "",
      );
      if (!query) return;
      this.innerHTML = `
        <h4>Résultats de "${query}"</h4>
        <div class="list"></div>
      `;

      const songs = await searchSongs(query);
      if (songs.length === 0) {
        this.innerHTML = `<h4>Aucun résultat pour "${query}"</h4>`;
        return;
      }
      const songListSearch = this.querySelector(".list");
      songListSearch.innerHTML = "";

      songs.forEach((song) => {
        const songItemSearch = document.createElement("song-item");
        songItemSearch.setAttribute("title", song.title);
        songItemSearch.setAttribute("favorite", isFavorite(song));
        songListSearch.append(songItemSearch);

        songItemSearch.addEventListener("favorite_click", () => {
          const fav = songItemSearch.getAttribute("favorite") == "true";
          songItemSearch.setAttribute("favorite", !fav);
          if (!fav) addSong(song);
          else deleteSong(song);
        });

        songItemSearch.addEventListener("play_click",() => {
          playSong(song,songs);
          window.location.hash = "#player";
        })
      });
    }
  },
);
