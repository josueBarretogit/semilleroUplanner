const API_BASE_URL = "http://localhost:3000"

let params = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:127.0) Gecko/20100101 Firefox/127.0",

  }
}

async function searchMangas() {

  const result = document.getElementById("result");
  result.innerHTML = loader();

  const searchTerm = document.getElementById("buscador").value;

  try {

    let response = await fetch(`${API_BASE_URL}/manga/title/${searchTerm}`, params)
    let asJson = await response.json()

    console.log(asJson)
    renderMangasFound(asJson)
    mostrarDialogo()
  } catch (error) {
    console.error(error)
  }

}

function renderMangasFound(response) {
  if (Array.isArray(response.data)) {
    let result = ``;
    for (const manga of response.data) {
      console.log(manga)
      result += `<p id="${manga.id}" onClick="goToManga('${manga.id}')"> ${manga.attributes.title.en}</p>`
    }

    const div = document.getElementById("result");
    div.innerHTML = result

  }

}

async function goToManga(id) {
  const chaptersDiv = document.getElementById("chapters");
  chaptersDiv.innerHTML = loader();

  try {

    let response = await fetch(`${API_BASE_URL}/manga/id/${id}`)
    let asJson = await response.json()

    console.log(asJson)

    renderMangaInfo(asJson)

  } catch (error) {
    console.error(error)
  }
}

function renderMangaInfo(manga) {

  if (Array.isArray(manga.data)) {
    let result = renderMangaCover(manga);
    for (const chapter of manga.data) {
      result += renderChapter(chapter)
    }

    const div = document.getElementById("chapters");
    div.innerHTML = result

  }
}

/**
 * @param {{ id : string }} chapter 
 * */
function renderChapter(chapter) {
  return `<p id="${chapter.id}">${formatChapterTitle(chapter)}
            <a href='${formatMangadexChapterUrl(chapter.id)}'>mangadex link</a>
          </p>`
}

/**
 * @param {string} coverName 
 * */
function renderMangaCover(coverName) {
  return `<img src="${API_BASE_URL}/cover/${coverName}">`
}

function formatChapterTitle(chapter) {
  return `Vol. ${chapter.attributes.volume} Ch. ${chapter.attributes.chapter} | ${chapter.attributes.title}`
}

function formatMangadexChapterUrl(id) {
  return `https://mangadex.org/chapter/${id}`
}

function loader() {
  return `
<div class="loader">

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a5" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#FF156D"></stop><stop offset=".3" stop-color="#FF156D" stop-opacity=".9"></stop><stop offset=".6" stop-color="#FF156D" stop-opacity=".6"></stop><stop offset=".8" stop-color="#FF156D" stop-opacity=".3"></stop><stop offset="1" stop-color="#FF156D" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a5)" stroke-width="15" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#FF156D" stroke-width="15" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>

</div>

    `
}

// css window width
function mostrarDialogo() {
  let dialog = document.getElementById("dialog")

  dialog.style.color = "red"
  dialog.style.display = "block"

  setTimeout(() => {
    dialog.style.color = "black"
    dialog.style.display = "none"
  }, Duration.fromSec(2))
}


function fromSec(duration) {
  return duration * 1000
}

class Duration {
  constructor(duration) {
    this.duration = duration
  }

  static fromSec(sec) {
    return sec * 1000
  }

  static fromMillis(millis) {
    return millis
  }

  static fromMinutes(minute) {
    return Duration.fromSec(minute * 60)
  }
}

