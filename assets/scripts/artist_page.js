const searchApi = "https://striveschool-api.herokuapp.com/api/deezer/search?q="
const artistApi = "https://striveschool-api.herokuapp.com/api/deezer/artist/"
const params = new URLSearchParams(window.location.search)
const artistId = params.get("id") || "428675" //fa fallback su olly nel caso
const artistBanner = document.getElementById("artist-banner")
const artistName = document.getElementById("artist-name")
const tracklistContainer = document.getElementById("tracklist-container")
const albumsContainer = document.getElementById("albums-container")
const featuringContainer = document.getElementById("featuring-container")
const apiAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album/"
const apiSearchQuery = "https://striveschool-api.herokuapp.com/api/deezer/search?q="
const progressBar = document.getElementById("range3")
const volumeBar = document.getElementById("volumeBar")
const volumeIcon = document.getElementById("volumeIcon")
const bottonePlay = document.getElementById("bottonePlay")
const currentTimeLabel = document.querySelector(".d-flex span.ms-2")
const durationLabel = document.querySelector(".col-6 .d-flex span:last-child")
const urlParameters = new URLSearchParams(location.search)
const albumID = urlParameters.get("id")
const search = "https://striveschool-api.herokuapp.com/api/deezer/search?q="
const infoAlbum = document.getElementById("info-album")
const tracklist = document.getElementById("tracklist")
const shuffleImg = document.getElementById("little-img")
const altroDaTitle = document.getElementById("altro-da")
const altroDischi = document.getElementById("altri-dischi")
const audio = document.getElementById("audio")
const inputNavbarValue = document.getElementById("inputNavbar")
//funzione nav bar
inputNavbarValue.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getLibrary(inputNavbarValue.value)
    fetch(search + inputNavbarValue.value)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error(res.status)
        }
      })
      .then((data) => {
        dropdownForSearch.innerHTML =
          '<li class="list-group-item text-white fs-4" value="">Ricerche recenti</li>'
        data.data.slice(0, 5).forEach((tracks, i) => {
          const elementoLista = document.createElement("li")
          const link = tracks.preview
          const title = tracks.title
          const name = tracks.artist.name
          const img = tracks.album.cover_medium
          elementoLista.classList.add("list-group-item", "p-2")
          elementoLista.innerHTML = `
          <div class="card rounded-2 p-0 h-100" >
          <div class="row g-0 d-flex">
          <div class="col-4 border-0"style="max-width:100px;">
          <a class="text-decoration-none text-white w-25 m-1" target="_blank" href="./album_page.html?id=${data.data[i].album.id}"><img
                src="${img}"
                alt="Preferiti Spotify"
                class="img-fluid rounded-1 me-1" /></a>
          </div>
          <div class="col-8">
          <div class="card-body">
          <h6><a class="text-decoration-none text-white" target="_blank" href="./album_page.html?id=${data.data[i].album.id}">${title}</a></h6>
          <p class="ms-1">• <a class="text-decoration-none text-white" target="_blank" href="./album_page.html?id=${data.data[i].album.id}">${name}</a></p>
          </div>
          </div>
          </div>
          </div>
          `
          dropdownForSearch.appendChild(elementoLista)
          elementoLista.addEventListener("click", function (event) {
            nameArtistsidebar(inputNavbarValue.value, img)
            audio.src = link
            audio.play()
            dropdownForSearch.innerHTML = ""
            const branoInEsecuzione = document.getElementById("brano-in-esecuzione")
            branoInEsecuzione.innerHTML = ""
            branoInEsecuzione.innerHTML = `<div class="d-flex">
                <img
                  style="width: 80px; height: auto;"
                  src="${img}"
                  alt="Preferiti Spotify"
                  class="img-fluid rounded-2 me-3" />
                <div class="d-flex flex-column justify-content-center">
                  <p class="m-0"><b>${title}</b></p>
                  <p class="m-0">• ${name}</p>
                </div>
                <div class="d-flex align-items-center ms-3">
                  <i class="bi bi-check-circle-fill text-success"></i>
                </div>
              </div>`
          })
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
})

//get library
const getLibrary = function (searchValue) {
  fetch(search + searchValue)
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .then((data) => {
      const appendLibrary = document.getElementById("appendLibrary")
      appendLibrary.innerHTML = ""

      data.data.forEach((track, i) => {
        const titoloAlbum = track.title
        const imgAlbum = track.album.cover_medium
        const artistaAlbum = track.artist.name
        const cardLibrary = document.createElement("div")
        cardLibrary.classList.add("col-12", "d-flex", "m-2", "flex-wrap")
        cardLibrary.innerHTML = ` <a class="text-decoration-none text-white w-25 m-1" target="_blank" href="./album_page.html?id=${data.data[i].album.id}"><img
                src="${imgAlbum}"
                alt="Preferiti Spotify"
                class="img-fluid rounded-1 me-1" /></a>
              <div class="d-flex flex-column" style="padding-top:0.5em;">
                <h6><a class="text-decoration-none text-white" target="_blank" href="./album_page.html?id=${data.data[i].album.id}">${titoloAlbum}</a></h6>
                <div class="d-flex">
                  <p>Album</p>
                  <p class="ms-1">• <a class="text-decoration-none text-white" target="_blank" href="./artist_page.html?id=${track.artist.id}">${artistaAlbum}</a></p>
                </div>
              </div>`
        appendLibrary.appendChild(cardLibrary)
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
getLibrary("mgk")
//funzione play

// function updateRangeColor(inputElement) {
//   const value = inputElement.value;
//   const max = inputElement.max || 100;
//   const percentage = (value / max) * 100;
//   const color = inputElement.id === "range3" ? "#ffffff" : "#1db954";
//   inputElement.style.background = `linear-gradient(to right, ${color} ${percentage}%, #535353 ${percentage}%)`;
// }

bottonePlay.addEventListener("click", function () {
  console.log("bottone")
  if (audio.paused) {
    audio.play()
    this.innerHTML = `<i class="bi bi-pause-fill"></i>`
  } else {
    audio.pause()
    this.innerHTML = `<i class="bi bi-play-fill"></i>`
  }
})
audio.addEventListener("play", () => {
  bottonePlay.innerHTML = `<i class="bi bi-pause-fill"></i>`
})

audio.addEventListener("pause", () => {
  bottonePlay.innerHTML = `<i class="bi bi-play-fill"></i>`
})

audio.addEventListener("loadedmetadata", function () {
  progressBar.max = Math.floor(audio.duration)
  if (durationLabel) durationLabel.innerText = formatTime(audio.duration)
  // updateRangeColor(progressBar);
})

audio.addEventListener("timeupdate", function () {
  progressBar.value = Math.floor(audio.currentTime)
  if (currentTimeLabel) currentTimeLabel.innerText = formatTime(audio.currentTime)
  // updateRangeColor(progressBar);
})

progressBar.addEventListener("input", function () {
  audio.currentTime = progressBar.value
  // updateRangeColor(this);
})
function formatTime(time) {
  if (isNaN(time)) return "0:00"
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
}

//funzione volume
volumeBar.addEventListener("input", function () {
  audio.volume = this.value
  updateRangeColor(this)

  const icon = volumeIcon.querySelector("i")
  if (this.value == 0) {
    icon.className = "bi bi-volume-mute"
  } else if (this.value < 0.5) {
    icon.className = "bi bi-volume-down"
  } else {
    icon.className = "bi bi-volume-up"
  }
})
let lastVolume = 1
volumeIcon.addEventListener("click", function () {
  const icon = this.querySelector("i")

  if (audio.volume > 0) {
    lastVolume = audio.volume
    audio.volume = 0
    volumeBar.value = 0
    icon.className = "bi bi-volume-mute"
  } else {
    audio.volume = lastVolume
    volumeBar.value = lastVolume
    icon.className = lastVolume < 0.5 ? "bi bi-volume-down" : "bi bi-volume-up"
  }
})

//dettagli artista
const initArtistPage = function () {
  fetch(artistApi + artistId)
    .then((res) => (res.ok ? res.json() : Promise.reject("Errore caricamento artista")))
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
      populateScopiDiPiu(albumsData.data)
      populatePlaylist(albumsData.data)
    })
    .catch((err) => console.error("Si è verificato un errore:", err))
}
//lista dei brani
const populateTracklist = function (tracks) {
  if (!tracklistContainer) return
  tracklistContainer.innerHTML = ""

  // Filtra i brani per assicurarci di mostrare solo quelli dell'artista corrente
  const filteredTracks = tracks.filter((t) => t.artist.id == artistId)
  const tracksToShow = filteredTracks.length > 0 ? filteredTracks.slice(0, 10) : tracks.slice(0, 10)

  tracksToShow.forEach((track, index) => {
    const row = document.createElement("div")
    row.classList.add("row", "align-items-center", "mb-2", "track-row", "p-2", "mx-0")
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
        // ${track.duration}
      </div>
    `

    row.addEventListener("click", () => {
      updateFooterPlayer(track)
    })

    tracklistContainer.appendChild(row)
  })
}

//album
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
          <p class="m-0 fw-bold text-white text-truncate">${album.title}</p>
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
          <p class="m-0 fw-bold text-white text-truncate">${artist.name}</p>
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

// const updateFooterPlayer = function (track) {
//   const footerImg = document.getElementById("current-track-img");
//   const footerTitle = document.getElementById("current-track-title");
//   const footerArtist = document.getElementById("current-track-artist");
//   const masterPlay = document.getElementById("masterPlay");

//   if (footerImg) footerImg.src = track.album.cover_small;
//   if (footerTitle) footerTitle.innerText = track.title;
//   if (footerArtist) footerArtist.innerText = track.artist.name;

//   if (audio) {
//     audio.src = track.preview;
//     audio
//       .play()
//       .catch((e) => console.log("Riproduzione interrotta o non disponibile"));
//     if (masterPlay) masterPlay.innerHTML = '<i class="bi bi-pause-fill"></i>';
//   }
// };

// const formatDuration = function (seconds) {
//   const min = Math.floor(seconds / 60);
//   const sec = seconds % 60;
//   return `${min}:${sec < 10 ? "0" : ""}${sec}`;
// };

//sezione scopri di più
const populateScopiDiPiu = function (albums) {
  const divScopIn = document.getElementById("div_scop_in")
  if (!divScopIn) return
  divScopIn.innerHTML = ""

  albums.slice(7, 13).forEach((album) => {
    divScopIn.innerHTML += `
      <div class="me-4 mt-3" style="width: 260px; cursor: pointer;" onclick="window.location.href='./album_page.html?id=${album.id}'">
        <img
          src="${album.cover_medium}"
          alt="${album.title}"
          class="rounded"
          style="width: 260px; height: 260px; object-fit: cover;"
        />
        <p class="fw-bold text-white text-truncate mt-2 mb-0">${album.title}</p>
        <p class="text-secondary mb-0">${new Date(album.release_date).getFullYear()} • Album</p>
      </div>`
  })
}

const populatePlaylist = function (albums) {
  const divPlaylistIn = document.getElementById("div_playlist_in")
  if (!divPlaylistIn) return
  divPlaylistIn.innerHTML = ""

  albums.slice(11, 17).forEach((album) => {
    divPlaylistIn.innerHTML += `
      <div class="me-4 mt-3" style="width: 260px; cursor: pointer;" onclick="window.location.href='./album_page.html?id=${album.id}'">
        <img
          src="${album.cover_medium}"
          alt="${album.title}"
          class="rounded"
          style="width: 260px; height: 260px; object-fit: cover;"
        />
        <p class="fw-bold text-white text-truncate mt-2 mb-0">${album.title}</p>
        <p class="text-secondary mb-0">${new Date(album.release_date).getFullYear()} • Album</p>
      </div>`
  })
}

const populateFanAlsoLike = function (tracks) {
  const container = document.getElementById("fan-also-like")
  if (!container) return
  container.innerHTML = ""

  const uniqueArtists = []
  const seenIds = []

  tracks.forEach((track) => {
    if (!seenIds.includes(track.artist.id) && track.artist.id != artistId) {
      seenIds.push(track.artist.id)
      uniqueArtists.push(track.artist)
    }
  })

  uniqueArtists.slice(0, 6).forEach((artist) => {
    container.innerHTML += `
      <div class="me-4 mt-3" style="width: 260px; cursor: pointer;" onclick="window.location.href='./artist_page.html?id=${artist.id}'">
        <img
          src="${artist.picture_medium}"
          alt="${artist.name}"
          class="rounded-circle"
          style="width: 260px; height: 260px; object-fit: cover;"
        />
        <p class="fw-bold text-white text-truncate mt-2 mb-0 small">${artist.name}</p>
        <p class="text-secondary mb-0" style="font-size: 0.75rem;">Artista</p>
      </div>`
  })
}

// Avvio
window.onload = initArtistPage
// aggiornamento side bar end bar nav bar e main bar
//sidebar start function

//funzione del buon roberto che ha rotto tutto e ha fatto andare alessia a dormire alle 3 di notte
const nomeArtista = document.querySelectorAll(".name_artist")
const videoSong = document.getElementById("video_song")
const cardCorrelati = document.querySelectorAll(".card-video-correlati")
const nameSong = document.getElementById("name_song")
const infoArtista = document.getElementById("info_artista")
const nameArtistsidebar = function (x, y) {
  fetch(search + x)
    .then((response) => {
      if (!response.ok) throw new Error("Errore " + response.status)
      return response.json()
    })
    .then((data) => {
      const primoRisultato = data.data[0]
      //titolo della canzone
      if (nameSong) {
        nameSong.innerText = primoRisultato.title
      }
      //nomi degli artisti
      const tuttiGliArtisti = document.querySelectorAll(".name_artist")
      tuttiGliArtisti.forEach((span) => {
        span.innerText = primoRisultato.artist.name
      })

      //video
      if (videoSong) {
        videoSong.src = y
      }
      //card dei correlati
      cardCorrelati.forEach((element, i) => {
        element.innerHTML = `
          <img src="${data.data[i].album.cover_medium}" class="card-img-top h-50" alt="video_correlati" />
          <div class="card-body">
            <p class="card-text">
              <span class="mt-2">${data.data[i].album.title}</span>
            </p>
            <p class="m-0">
              <span class="name_artist">${data.data[i].artist.name}</span>
            </p>
          </div>`
      })
      //info artista
      infoArtista.src = y
    })
    .catch((err) => console.error("Errore nel recupero dati:", err))
}

const expandBtnEnd = document.getElementById("expand_btn_end")
const sideBarEnd = document.getElementById("sidebar_end")

expandBtnEnd.addEventListener("click", function () {
  sideBarEnd.classList.toggle("col-6")
  sideBarEnd.classList.toggle("bg-black")
  videoSong.classList.add("w-25")
})

const expandBtnStart = document.getElementById("expand_btn_start")
const sideBarStart = document.getElementById("sidebar_start")
const arrowBtn = document.querySelectorAll(".arrow-btn")

expandBtnStart.addEventListener("click", function () {
  sideBarStart.classList.toggle("z-3")
  sideBarStart.classList.toggle("bg-black")
  sideBarStart.classList.toggle("col-6")
  arrowBtn.forEach((element) => {
    element.classList.toggle("d-none")
  })
})

const fullHiddenBtn = document.getElementById("full_hidden_btn")
const centralPart = document.getElementById("central-part")
const spaceShowBtn = document.getElementById("space_show_btn")

//  MANNAGGIA ALLA PU... PAZZA CIAO STEFANO, STA CAZZO DE FUNZIONE MANDAVA A PUTTANE TUTTO MANNAGGIA A JAVASCRIPT E ANCHE LINUS TORVALS
fullHiddenBtn.addEventListener("click", function () {
  sideBarEnd.classList.toggle("collapsed")
  if (centralPart.classList.contains("col-lg-8")) {
    centralPart.classList.replace("col-lg-8", "col-lg-10")
    centralPart.classList.replace("indipendent-scroll", "indipendent-scroll-2")
    centralPart.classList.replace("main-page", "page")
  } else {
    centralPart.classList.replace("col-lg-10", "col-lg-8")
    centralPart.classList.replace("indipendent-scroll-2", "indipendent-scroll")
    centralPart.classList.replace("page", "main-page")
  }
})

//   spaceShowBtn.appendChild(newBtnSpace)
// })

//funzione colore
function aggiornaColoreProgressBar() {
  const min = progressBar.min || 0
  const max = progressBar.max || 100
  const val = progressBar.value
  const percentuale = ((val - min) / (max - min)) * 100
  progressBar.style.background = `linear-gradient(to right, #ffffff ${percentuale}%, #535353 ${percentuale}%)`
}
