// 1. Configurazione Endpoint
const searchApi = "https://striveschool-api.herokuapp.com/api/deezer/search?q="
const artistApi = "https://striveschool-api.herokuapp.com/api/deezer/artist/"

// 2. Recupero ID dall'URL
const params = new URLSearchParams(window.location.search)
const artistId = params.get("id") || "356798482" //fa fallback su olly nel caso

// 3. Riferimenti agli elementi DOM
const artistBanner = document.getElementById("artist-banner")
const artistName = document.getElementById("artist-name")
const tracklistContainer = document.getElementById("tracklist-container")
const albumsContainer = document.getElementById("albums-container")
const featuringContainer = document.getElementById("featuring-container")
const audio = document.getElementById("audio-player")

/**
 * Funzione principale che inizializza la pagina
 */
const initArtistPage = function () {
  // PRIMA FETCH: Dettagli Artista
  fetch(artistApi + artistId)
    .then((res) =>
      res.ok ? res.json() : Promise.reject("Errore caricamento artista"),
    )
    .then((artist) => {
      // Popoliamo Header/Banner
      if (artistName) artistName.innerText = artist.name
      if (artistBanner) {
        artistBanner.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${artist.picture_xl})`
        artistBanner.style.backgroundSize = "cover"
        artistBanner.style.backgroundPosition = "center center"
      }

      // numero fan nel banner
      const fanCount = document.getElementById("fan-count")
      if (fanCount) fanCount.innerText = `${artist.nb_fan.toLocaleString()} `

      // Popolamento la sezione INFORMAZIONI
      const infoFanCount = document.getElementById("info-fan-count")
      const artistBio = document.getElementById("artist-bio")
      const infoImg = document.getElementById("artist-info-img")

      if (infoFanCount) infoFanCount.innerText = artist.nb_fan.toLocaleString()
      if (infoImg) infoImg.src = artist.picture_xl
      if (artistBio) {
        artistBio.innerText = `${artist.name} è un artista di grande successo internazionale. Attualmente vanta una community di oltre ${artist.nb_fan.toLocaleString()} fan su Deezer che seguono ogni sua nuova uscita.`
      }

      // SECONDA FETCH: Brani Popolari
      return fetch(searchApi + artist.name)
    })
    .then((res) => res.json())
    .then((searchData) => {
      populateTracklist(searchData.data)
      // TERZA FETCH: Album (Discografia)
      return fetch(artistApi + artistId + "/albums")
    })
    .then((res) => res.json())
    .then((albumsData) => {
      console.log(albumsData)
      populateAlbums(albumsData.data.slice(0, 6))

      albumsData.data.slice(7, 11).forEach((element) => {
        const divSCopIn = document.getElementById("div_scop_in")

        divSCopIn.innerHTML += `<div
                class="card bg-transparent border-0 w-25 mt-3 d-flex"
              >
              <a href="./album_page.html?id=${element.id}" class='text-decoration-none text-light'>
                <img
                  src="${element.cover_medium}"
                  class="card-img-top"
                  alt="foto_album"
                />
                <div class="card-body">
                  <p class="card-text fs-5 m-0">${element.title}</p>
                </div>
                </a> 
              </div>`
      })
    })

    .catch((err) => console.error("Si è verificato un errore:", err))
}

/**
 * Funzione per creare la lista dei brani
 */
const populateTracklist = function (tracks) {
  if (!tracklistContainer) return
  tracklistContainer.innerHTML = ""

  // Filtra i brani per assicurarci di mostrare solo quelli dell'artista corrente
  const filteredTracks = tracks.filter((t) => t.artist.id == artistId)
  const tracksToShow =
    filteredTracks.length > 0
      ? filteredTracks.slice(0, 10)
      : tracks.slice(0, 10)

  tracksToShow.forEach((track, index) => {
    const row = document.createElement("div")
    row.classList.add(
      "row",
      "align-items-center",
      "mb-2",
      "track-row",
      "p-2",
      "mx-0",
    )
    row.style.cursor = "pointer"

    row.innerHTML = `
      <div class="col-1 text-secondary text-end small">${index + 1}</div>
      <div class="col-1">
        <img src="${track.album.cover_small}" class="rounded shadow-sm" alt="cover" style="width: 40px">
      </div>
      <div class="col-6">
        <p class="m-0 fs-5 fw-bold text-white text-truncate small">${track.title}</p>
        <p class="m-0 fs-6 x-small text-secondary">${track.artist.name}</p>
      </div>
      <div class="col-2 text-secondary small d-none d-md-block text-truncate">
        ${track.rank.toLocaleString()}
      </div>
      <div class="col-2 text-secondary small text-end pe-4">
        ${formatDuration(track.duration)}
      </div>
    `

    row.addEventListener("click", () => {
      updateFooterPlayer(track)
    })

    tracklistContainer.appendChild(row)
  })
}

/**
 * Funzione per creare la griglia degli album
 */
const populateAlbums = function (albums) {
  if (!albumsContainer) return
  albumsContainer.innerHTML = ""
  console.log(albums)

  albums.forEach((album) => {
    const col = document.createElement("div")
    col.classList.add("col-6", "col-md-4", "col-lg-2", "mb-4")

    col.innerHTML = `
      <div class="card bg-transparent border-0 h-100 album-card" style="cursor: pointer;">
        <img src="${album.cover_medium}" class="card-img-top rounded shadow mb-2" alt="${album.title}">
        <div class="card-body p-0">
          <p class="m-0 fw-bold text-white text-truncate small">${album.title}</p>
          <p class="m-0 text-secondary x-small">${new Date(album.release_date).getFullYear()} • Album</p>
        </div>
      </div>
    `
    col.onclick = () => {
      window.location.href = `album_page.html?id=${album.id}`
    }

    albumsContainer.appendChild(col)
  })
}

/**
 * Funzione per popolare la sezione "Con [artista]"
 */
const populateFeaturing = function (artists) {
  if (!featuringContainer) return
  featuringContainer.innerHTML = ""

  const toShow = artists ? artists.slice(0, 6) : []
  toShow.forEach((artist) => {
    const col = document.createElement("div")
    col.classList.add("col-6", "col-md-4", "col-lg-2", "mb-4")

    col.innerHTML = `
      <div class="card bg-transparent border-0 h-100 album-card" style="cursor: pointer;">
        <img src="${artist.picture_medium}" class="card-img-top rounded shadow mb-2" alt="${artist.name}">
        <div class="card-body p-0">
          <p class="m-0 fw-bold text-white text-truncate small">${artist.name}</p>
          <p class="m-0 text-secondary x-small">Artista</p>
        </div>
      </div>
    `

    col.onclick = () => {
      window.location.href = `artist_page.html?id=${artist.id}`
    }

    featuringContainer.appendChild(col)
  })
}

const updateFooterPlayer = function (track) {
  const footerImg = document.getElementById("current-track-img")
  const footerTitle = document.getElementById("current-track-title")
  const footerArtist = document.getElementById("current-track-artist")
  const masterPlay = document.getElementById("masterPlay")

  if (footerImg) footerImg.src = track.album.cover_small
  if (footerTitle) footerTitle.innerText = track.title
  if (footerArtist) footerArtist.innerText = track.artist.name

  if (audio) {
    audio.src = track.preview
    audio
      .play()
      .catch((e) => console.log("Riproduzione interrotta o non disponibile"))
    if (masterPlay) masterPlay.innerHTML = '<i class="bi bi-pause-fill"></i>'
  }
}

const formatDuration = function (seconds) {
  const min = Math.floor(seconds / 60)
  const sec = seconds % 60
  return `${min}:${sec < 10 ? "0" : ""}${sec}`
}

// Avvio
window.onload = initArtistPage
