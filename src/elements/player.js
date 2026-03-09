import formatTimestamp from '../lib/formatTimestamp.js';

let currentSong = null;
let listSongs = null;

export const getState = () => ({ currentSong, listSongs });

export const playSong = (song, songs) => {
  currentSong = song;
  listSongs = songs;
  window.location.hash = "#player";
};
