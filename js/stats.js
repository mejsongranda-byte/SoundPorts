import { getSongs } from "./storage.js";

const songs = getSongs();

document.getElementById("totalSongs").textContent = songs.length;
document.getElementById("listenedSongs").textContent =
  songs.filter(s => s.isListened).length;
document.getElementById("notListenedSongs").textContent =
  songs.filter(s => !s.isListened).length;