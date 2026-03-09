// Elements
import "./elements/artist-cover.js";
import "./elements/song-item.js";
import "./elements/spot-footer.js";
// Pages
import "./pages/page-artists.js";
import "./pages/page-home.js";
import "./pages/page-player.js";
import "./pages/page-songs.js";
import "./pages/page-favorites.js";
import "./pages/page-search.js";

const router = () => {
  const main = document.querySelector("main");
  const hashs = (window.location.hash || "#home").split("/");

  if (hashs[0] == "#home") main.innerHTML = "<page-home />";
  else if (hashs[0] == "#player") main.innerHTML = "<page-player />";
  else if (hashs[0] == "#artists" && hashs[1])
    main.innerHTML = `<page-artist-songs artist-id="${hashs[1]}" />`;
  else if (hashs[0] == "#artists" && !hashs[1])
    main.innerHTML = "<page-artists />";
  else if (hashs[0] == "#favorites") main.innerHTML = "<page-favorites />";
  else if (hashs[0] == "#search") main.innerHTML = "<page-search />";
};

window.addEventListener("hashchange", router);

const btnSearch = document.querySelector("#search-trigger");
btnSearch.addEventListener("click", () => {
  document.querySelector("#search-input").classList.toggle("active");
  window.location.hash = "#search";
});

const inputSearch = document.querySelector("#search-input");
inputSearch.addEventListener("change", () => {
  window.location.hash = "#search/" + encodeURIComponent(inputSearch.value);
});

router();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/src/public/sw.js');
};

// ↓ REMPLACE tout ce qui était là avant ↓
window.addEventListener('offline', () => {
  document.body.classList.add('offline');
  btnSearch.disabled = true;
});

window.addEventListener('online', () => {
  document.body.classList.remove('offline');
  btnSearch.disabled = false;
});

if (!navigator.onLine) {
  document.body.classList.add('offline');
  btnSearch.disabled = true;
}
