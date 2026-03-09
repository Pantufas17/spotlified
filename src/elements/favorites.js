const setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const getItem = (key) => localStorage.getItem(key) && JSON.parse(localStorage.getItem(key));

let listFavorites = getItem("favorites") || [];

export const addSong = (song) => {
  listFavorites.push(song);
  setItem("favorites", listFavorites); 
};

export const deleteSong = (songToDelete) => {
  listFavorites = listFavorites.filter((song) => song.id !== songToDelete.id);
  setItem("favorites", listFavorites); 
};

export const getSongs = () => {
  return listFavorites;
};

export const isFavorite = (song) => {
  return listFavorites.some((s) => s.id === song.id);
};
