import { playSong, getState } from '../elements/player.js';
import formatTimestamp from '../lib/formatTimestamp.js';

customElements.define("page-player", class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <audio id="audio-player" controls></audio>

      <div id="player">
        <div id="player-thumbnail">
          <img src="http://placecats.com/200/300" id="player-thumbnail-image" />
        </div>

        <div id="player-infos">
          <div id="player-infos-song">
            <span class="material-icons">music_note</span>
            <span id="player-infos-song-title">-</span>
          </div>
          <div id="player-infos-artist">
            <span class="material-icons">person</span>
            <span id="player-infos-artist-name">-</span>
          </div>
        </div>

        <div id="player-controls">
          <button type="button" class="player-control player-control-small" id="player-control-previous">
            <span class="material-icons">skip_previous</span>
          </button>
          <button type="button" class="player-control" id="player-control-play">
            <span class="material-icons">play_arrow</span>
          </button>
          <button type="button" class="player-control player-control-small" id="player-control-next">
            <span class="material-icons">skip_next</span>
          </button>
        </div>

        <div id="player-progress">
          <input type="range" id="player-progress-bar" />
          <div id="player-times">
            <span id="player-time-current">--:--</span>
            <span id="player-time-duration">--:--</span>
          </div>
        </div>
      </div>
    `;

    const startAudio = () => {
      const { currentSong, listSongs } = getState();
      if (!currentSong) return;

      const tagAudio = document.querySelector("#audio-player");
      const progressBar = document.querySelector("#player-progress-bar");

      tagAudio.src = currentSong.audio_url;
      tagAudio.play();

      document.querySelector("#player-infos-song-title").textContent = currentSong.title;
      document.querySelector("#player-infos-artist-name").textContent = currentSong.artist.name;
      document.querySelector("#player-thumbnail-image").src = currentSong.artist.image_url;

      tagAudio.addEventListener("loadedmetadata", () => {
        document.querySelector("#player-time-duration").textContent = formatTimestamp(tagAudio.duration);
        progressBar.max = tagAudio.duration;
      }, { once: true });

      progressBar.addEventListener("input", () => {
        tagAudio.currentTime = progressBar.value;
      });

      const pauseBtn = document.querySelector("#player-control-play");
      pauseBtn.addEventListener("click", () => {
        if (tagAudio.paused) {
          tagAudio.play();
          pauseBtn.innerHTML = `<span class="material-icons">pause</span>`;
        } else {
          tagAudio.pause();
          pauseBtn.innerHTML = `<span class="material-icons">play_arrow</span>`;
        }
      });

      let indexActuel = listSongs.indexOf(currentSong);

      const nextBtn = document.querySelector("#player-control-next");
      nextBtn.addEventListener("click", () => {
        indexActuel = indexActuel === listSongs.length - 1 ? 0 : indexActuel + 1;
        playSong(listSongs[indexActuel], listSongs);
        const { currentSong: updatedSong } = getState(); 
        tagAudio.src = updatedSong.audio_url;
        tagAudio.play();
        document.querySelector("#player-infos-song-title").textContent = updatedSong.title;
        document.querySelector("#player-infos-artist-name").textContent = updatedSong.artist.name;
        document.querySelector("#player-thumbnail-image").src = updatedSong.artist.image_url;
      });

      const previousBtn = document.querySelector("#player-control-previous");
      previousBtn.addEventListener("click", () => {
        indexActuel = indexActuel === 0 ? listSongs.length - 1 : indexActuel - 1;
        playSong(listSongs[indexActuel], listSongs);
        const { currentSong: updatedSong } = getState(); 
        tagAudio.src = updatedSong.audio_url;
        tagAudio.play();
        document.querySelector("#player-infos-song-title").textContent = updatedSong.title;
        document.querySelector("#player-infos-artist-name").textContent = updatedSong.artist.name;
        document.querySelector("#player-thumbnail-image").src = updatedSong.artist.image_url;
      });

      tagAudio.addEventListener("timeupdate", () => {
        document.querySelector("#player-time-current").textContent = formatTimestamp(tagAudio.currentTime);
        progressBar.value = tagAudio.currentTime;
      });

      tagAudio.addEventListener("ended", () => {
        nextBtn.click();
      });
    };

    startAudio();
  }
});
