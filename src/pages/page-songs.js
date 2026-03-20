import { getSongs } from "../api.js";
import { playSong } from "../elements/player.js";
import { addSong, deleteSong, getSongs as getFavorites, isFavorite } from "../elements/favorites.js";

customElements.define(
  "page-artist-songs",
  class extends HTMLElement {
    connectedCallback() {
      const artistId = this.getAttribute("artist-id");

      getSongs(artistId).then((songs) => {
        this.innerHTML = `
          <h4>
            Artistes > ${songs[0].artist.name}
          </h4>

          <div class="list">
          </div>
        `;
        const songList = this.querySelector(".list");
        // Itérer le tableau d'artistes reçus et créer les éléments correspondants
        songs.forEach((song) => {
          //V1
          const songItem = document.createElement("song-item");
          songItem.setAttribute("title", song.title);
          songItem.setAttribute("song-id", song.id);
          songItem.setAttribute("favorite", isFavorite(song)); 
          songList.append(songItem);

          // V2
          //songList.innerHTML += `<song-item title="${song.title}" />`
          songItem.addEventListener("play_click", () => {
            //console.log("Ca play!")
            playSong(song, songs);
            window.location.hash = "#player";
          });
          songItem.addEventListener("favorite_click", () => {
            const isFav = songItem.getAttribute("favorite") == "true";
            songItem.setAttribute("favorite", !isFav);
            if(!isFav){
              addSong(song);
            } else {
              deleteSong(song)
            }
          });
        });
      });
    }
  },
);
