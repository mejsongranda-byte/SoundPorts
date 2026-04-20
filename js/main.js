import { getSongs, saveSongs } from "./storage.js";

const container = document.getElementById("songsContainer");
const DEFAULT_COVER =
  "https://static.vecteezy.com/system/resources/previews/028/208/850/non_2x/abstract-background-with-glowing-music-notes-design-free-photo.jpg";

function renderSongs() {
  const songs = getSongs();
  container.innerHTML = "";

  if (songs.length === 0) {
    container.innerHTML = "<p class='page-title'>Список песен пуст</p>";
    return;
  }

  songs.forEach((song) => {
    const card = document.createElement("div");
    card.className = "song-card";

    const coverImage =
      song.image && song.image.trim() !== "" ? song.image : DEFAULT_COVER;

    card.innerHTML = `
      <img src="${coverImage}" alt="Cover" onerror="this.src='${DEFAULT_COVER}'">
      <h3>${song.title}</h3>
      <p><strong>${song.artist}</strong></p>
      <p class="album-info">${song.album || "Сингл"}</p>
      
      <audio controls class="native-player" src="${song.audio}"></audio>

      <div class="card-footer">
        <label>
          <input type="checkbox" class="status-checkbox" ${
            song.isListened ? "checked" : ""
          }>
          Прослушано
        </label>
        <button class="btn-secondary delete-btn">Удалить</button>
      </div>
    `;

    const audio = card.querySelector(".native-player");

    audio.addEventListener("play", () => {
      if (audio.duration === Infinity) {
        audio.currentTime = 1e101;
        setTimeout(() => {
          audio.currentTime = 0;
          audio.play();
        }, 10);
      }
    });

    card
      .querySelector(".status-checkbox")
      .addEventListener("change", () => toggleStatus(song.id));
    card
      .querySelector(".delete-btn")
      .addEventListener("click", () => deleteSong(song.id));

    container.appendChild(card);
  });
}

function deleteSong(id) {
  if (!confirm("Удалить песню?")) return;
  const songs = getSongs().filter((song) => song.id !== id);
  saveSongs(songs);
  renderSongs();
}

function toggleStatus(id) {
  const songs = getSongs();
  const song = songs.find((s) => s.id === id);
  if (song) {
    song.isListened = !song.isListened;
    saveSongs(songs);
  }
}

renderSongs();