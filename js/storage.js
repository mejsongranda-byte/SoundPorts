export function getSongs() {
  const songs = localStorage.getItem("songs");
  return songs ? JSON.parse(songs) : [];
}

export function saveSongs(songs) {
  localStorage.setItem("songs", JSON.stringify(songs));
} 