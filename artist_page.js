// 1. Configurazione Endpoint
const searchApi = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const artistApi = "https://striveschool-api.herokuapp.com/api/deezer/artist/";

// 2. Recupero ID dall'URL
const params = new URLSearchParams(window.location.search);
const artistId = params.get("id") || "356798482"; //fa fallback su olly nel caso

// 3. Riferimenti agli elementi DOM
const artistBanner = document.getElementById("artist-banner");
const artistName = document.getElementById("artist-name");
const tracklistContainer = document.getElementById("tracklist-container");
const albumsContainer = document.getElementById("albums-container");
const featuringContainer = document.getElementById("featuring-container");
const audio = document.getElementById("audio-player");

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
      if (artistName) artistName.innerText = artist.name;
      if (artistBanner) {
        artistBanner.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${artist.picture_xl})`;
        artistBanner.style.backgroundSize = "cover";
        artistBanner.style.backgroundPosition = "center center";
      }

      // numero fan nel banner
      const fanCount = document.getElementById("fan-count");
      if (fanCount) fanCount.innerText = `${artist.nb_fan.toLocaleString()} `;

      // Popolamento la sezione INFORMAZIONI
      const infoFanCount = document.getElementById("info-fan-count");
      const artistBio = document.getElementById("artist-bio");
      const infoImg = document.getElementById("artist-info-img");

      if (infoFanCount) infoFanCount.innerText = artist.nb_fan.toLocaleString();
      if (infoImg) infoImg.src = artist.picture_xl;
      if (artistBio) {
        artistBio.innerText = `${artist.name} è un artista di grande successo internazionale. Attualmente vanta una community di oltre ${artist.nb_fan.toLocaleString()} fan su Deezer che seguono ogni sua nuova uscita.`;
      }

      // SECONDA FETCH: Brani Popolari
      return fetch(searchApi + artist.name);
    })
    // .then((response) => {
    //   if (response.ok) {
    //     return response.json()
    //   } else {
    //     console.log("errore generico")
    //   }
    // })
    // .then((data) => {
    //   console.log(data)

    //   data.data.forEach((info, i) => {
    //     // info.album.cover_small
    //     // info.id
    //     // info.title_short
    //     tracklistContainer.innerHTML += `<div class="row align-items-center">
    //             <div class="col-1 text-center fs-5">${i + 1}</div>
    //             <div class="col-1">
    //               <img
    //                 src=${info.album.cover_small}
    //                 alt="foto_album"
    //                 class="rounded-3"
    //               />
    //             </div>
    //             <div class="col-5">
    //               <div class="d-flex flex-column flex-grow-1">
    //                 <p class="fw-bold mb-1 fs-3">${info.title_short}</p>
    //                 <p class="text-secondary fs-5 mb-0">
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     width="16"
    //                     height="16"
    //                     fill="currentColor"
    //                     class="bi bi-play-btn rounded-3"
    //                     viewBox="0 0 16 16"
    //                   >
    //                     <path
    //                       d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"
    //                     />
    //                     <path
    //                       d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"
    //                     />
    //                   </svg>
    //                   Video musicale
    //                 </p>
    //               </div>
    //             </div>
    //             <div class="col-4">
    //               <p>${info.id}</p>
    //             </div>
    //             <div class="col-1 m-0">
    //               <p class="fs-5">3:04</p>
    //             </div>
    //           </div>`
    //   })
    // })
    // .catch((err) => {
    //   console.log("err", err)
    // })

    .then((res) => res.json())
    .then((searchData) => {
      populateTracklist(searchData.data);
      // TERZA FETCH: Album (Discografia)
      return fetch(artistApi + artistId + "/albums");
    })
    .then((res) => res.json())
    .then((albumsData) => {
      populateAlbums(albumsData.data.slice(0, 10));
      // QUARTA FETCH: Album con l'artista
      return fetch(artistApi + artistId + "/related");
    })
    .then((res) => res.json())
    .then((relatedData) => {
      populateFeaturing(relatedData.data);
    })
    .catch((err) => console.error("Si è verificato un errore:", err));
};

/**
 * Funzione per creare la lista dei brani
 */
const populateTracklist = function (tracks) {
  if (!tracklistContainer) return;
  tracklistContainer.innerHTML = "";

  // Filtra i brani per assicurarci di mostrare solo quelli dell'artista corrente
  const filteredTracks = tracks.filter((t) => t.artist.id == artistId);
  const tracksToShow =
    filteredTracks.length > 0
      ? filteredTracks.slice(0, 10)
      : tracks.slice(0, 10);

  tracksToShow.forEach((track, index) => {
    const row = document.createElement("div");
    row.classList.add(
      "row",
      "align-items-center",
      "mb-2",
      "track-row",
      "p-2",
      "mx-0",
    );
    row.style.cursor = "pointer";

    row.innerHTML = `
      <div class="col-1 text-secondary text-end small">${index + 1}</div>
      <div class="col-1">
        <img src="${track.album.cover_small}" class="rounded shadow-sm" alt="cover" style="width: 40px">
      </div>
      <div class="col-6">
        <p class="m-0 fw-bold text-white text-truncate small">${track.title}</p>
        <p class="m-0 x-small text-secondary">${track.artist.name}</p>
      </div>
      <div class="col-2 text-secondary small d-none d-md-block text-truncate">
        ${track.rank.toLocaleString()}
      </div>
      <div class="col-2 text-secondary small text-end pe-4">
        ${formatDuration(track.duration)}
      </div>
    `;

    row.addEventListener("click", () => {
      updateFooterPlayer(track);
    });

    tracklistContainer.appendChild(row);
  });
};

/**
 * Funzione per creare la griglia degli album
 */
const populateAlbums = function (albums) {
  if (!albumsContainer) return;
  albumsContainer.innerHTML = "";

  albums.forEach((album) => {
    const col = document.createElement("div");
    col.classList.add("col-6", "col-md-4", "col-lg-2", "mb-4");

    col.innerHTML = `
      <div class="card bg-transparent border-0 h-100 album-card" style="cursor: pointer;">
        <img src="${album.cover_medium}" class="card-img-top rounded shadow mb-2" alt="${album.title}">
        <div class="card-body p-0">
          <p class="m-0 fw-bold text-white text-truncate small">${album.title}</p>
          <p class="m-0 text-secondary x-small">${new Date(album.release_date).getFullYear()} • Album</p>
        </div>
      </div>
    `;

    col.onclick = () => {
      window.location.href = `album_page.html?id=${album.id}`;
    };

    albumsContainer.appendChild(col);
  });
};

/**
 * Funzione per popolare la sezione "Con [artista]"
 */
const populateFeaturing = function (artists) {
  if (!featuringContainer) return;
  featuringContainer.innerHTML = "";

  const toShow = artists ? artists.slice(0, 6) : [];
  toShow.forEach((artist) => {
    const col = document.createElement("div");
    col.classList.add("col-6", "col-md-4", "col-lg-2", "mb-4");

    col.innerHTML = `
      <div class="card bg-transparent border-0 h-100 album-card" style="cursor: pointer;">
        <img src="${artist.picture_medium}" class="card-img-top rounded shadow mb-2" alt="${artist.name}">
        <div class="card-body p-0">
          <p class="m-0 fw-bold text-white text-truncate small">${artist.name}</p>
          <p class="m-0 text-secondary x-small">Artista</p>
        </div>
      </div>
    `;

    col.onclick = () => {
      window.location.href = `artist_page.html?id=${artist.id}`;
    };

    featuringContainer.appendChild(col);
  });
};

const updateFooterPlayer = function (track) {
  const footerImg = document.getElementById("current-track-img");
  const footerTitle = document.getElementById("current-track-title");
  const footerArtist = document.getElementById("current-track-artist");
  const masterPlay = document.getElementById("masterPlay");

  if (footerImg) footerImg.src = track.album.cover_small;
  if (footerTitle) footerTitle.innerText = track.title;
  if (footerArtist) footerArtist.innerText = track.artist.name;

  if (audio) {
    audio.src = track.preview;
    audio
      .play()
      .catch((e) => console.log("Riproduzione interrotta o non disponibile"));
    if (masterPlay) masterPlay.innerHTML = '<i class="bi bi-pause-fill"></i>';
  }
};

const formatDuration = function (seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
};

// Avvio
window.onload = initArtistPage;
