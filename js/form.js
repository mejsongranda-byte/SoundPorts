import { getSongs, saveSongs } from "./storage.js";
import { generateId, formatDate } from "./utils.js";

const form = document.getElementById("songForm");
const cancelBtn = document.getElementById("cancelBtn");
const saveBtn = document.getElementById("saveBtn");

const titleInput = document.getElementById("title");
const artistInput = document.getElementById("artist");
const albumInput = document.getElementById("album");
const imageInput = document.getElementById("image");
const audioUrlInput = document.getElementById("audioUrl");
const audioFileInput = document.getElementById("audioFile");

cancelBtn.addEventListener("click", redirectToHome);
form.addEventListener("submit", handleSubmit);

function validateForm() {
  saveBtn.disabled = false;
}

function redirectToHome() {
  window.location.href = "index.html";
}

function handleSubmit(event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const artist = artistInput.value.trim();
  const audioUrl = audioUrlInput.value.trim();
  const audioFile = audioFileInput.files[0];

  if (!title || !artist) {
    alert(
      "Ошибка! Пожалуйста, заполните обязательные поля: Название и Исполнитель."
    );
    return;
  }

  if (!audioUrl && !audioFile) {
    alert("Добавьте ссылку на аудио или загрузите файл!");
    return;
  }

  if (audioFile) {
    if (audioFile.size > 4 * 1024 * 1024) {
      alert("Файл слишком большой! Максимум 4MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function () {
      saveSong(reader.result);
    };
    reader.readAsDataURL(audioFile);
  } else {
    saveSong(audioUrl);
  }
}

function saveSong(audioSource) {
  try {
    const newSong = {
      id: generateId(),
      title: titleInput.value.trim(),
      artist: artistInput.value.trim(),
      album: albumInput.value.trim() || "Сингл",
      image: imageInput.value.trim(),
      audio: audioSource,
      isListened: false,
      createdAt: formatDate(),
    };

    const songs = getSongs();
    songs.push(newSong);
    saveSongs(songs);
    window.location.href = "index.html";
  } catch (error) {
    alert(
      "Ошибка сохранения. Возможно, файл слишком тяжелый для памяти браузера."
    );
  }
}

validateForm();
