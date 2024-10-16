
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
  result.innerHTML = "Buscando mangas"

  const searchTerm = document.getElementById("buscador").value;

  try {

    let response = await fetch(`${API_BASE_URL}/manga/title/${searchTerm}`, params)
    let asJson = await response.json()

    console.log(asJson)
    renderMangasFound(asJson)
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
  chaptersDiv.innerHTML = "Buscando capitulos"

  try {

    let response = await fetch(`${API_BASE_URL}/manga/id/${id}`)
    let asJson = await response.json()

    console.log(asJson)

    renderChaptersOfMangas(asJson)

  } catch (error) {

    console.error(error)
  }
}

function renderChaptersOfMangas(manga) {

  if (Array.isArray(manga.data)) {
    let result = ``;
    for (const chapter of manga.data) {
      result += renderChapter(chapter)
    }

    const div = document.getElementById("chapters");
    div.innerHTML = result

  }
}

function renderChapter(chapter) {
  return `<p id="${chapter.id}">${formatChapterTitle(chapter)}
            <a href='${formatMangadexChapterUrl(chapter.id)}'>mangadex link</a>
          </p>`
}

function formatChapterTitle(chapter) {
  return `Vol. ${chapter.attributes.volume} Ch. ${chapter.attributes.chapter} | ${chapter.attributes.title}`
}

function formatMangadexChapterUrl(id) {
  return `https://mangadex.org/chapter/${id}`
}
