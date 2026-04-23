const query = "rock";
const searchWorld = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`;
// // arrayparolericerca${input.value}
// const albumDetails = "https://striveschool-api.herokuapp.com/api/deezer/album/75621062"
// const artistDetails = "https://striveschool-api.herokuapp.com/api/deezer/album/75621062"

const cardContainer = document.getElementById("card-container");
// funzione estrazione random color
// array di colori
const colors = [
  "#DC148C",
  "#006450",
  "#8400E7",
  "#1E3264",
  "#608108",
  "#AF2896",
  "#608108",
  "#AF2896",
];
//funzione nav barconst
cardSfoglia = document.querySelectorAll(".card-sfoglia");
const inputNavbarValue = document.getElementById("inputNavbar");
inputNavbarValue.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getLibrary(inputNavbarValue.value);
    fetch(search + inputNavbarValue.value)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .then((data) => {
        console.log(data);
        dropdownForSearch.innerHTML =
          '<li class="list-group-item text-white fs-4" value="">Ricerche recenti</li>';
        data.data.slice(0, 5).forEach((tracks, i) => {
          const elementoLista = document.createElement("li");
          const link = tracks.preview;
          const title = tracks.title;
          const name = tracks.artist.name;
          const img = tracks.album.cover_medium;
          elementoLista.classList.add("list-group-item", "p-2");
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
          `;
          dropdownForSearch.appendChild(elementoLista);
          elementoLista.addEventListener("click", function (event) {
            nameArtistsidebar(inputNavbarValue.value, img);
            audio.src = link;
            audio.play();
            dropdownForSearch.innerHTML = "";
            const branoInEsecuzione = document.getElementById(
              "brano-in-esecuzione",
            );
            branoInEsecuzione.innerHTML = "";
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
              </div>`;
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
// funzione generazione random di card

fetch(searchWorld)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    for (let i = 0; i < data.data.length; i++) {
      const placeholder = document.querySelectorAll(".card-plahol");
      placeholder.forEach((i) => {
        i.classList.add("d-none");
      });
      const nomeArtisti = data.data[i].artist.name;
      const fotoArtisti = data.data[i].artist.picture_medium;
      const idArtisti = data.data[i].artist.id;

      cardContainer.classList.add("d-flex");
      const card = document.createElement("div");
      const randomIndex = Math.floor(Math.random() * colors.length);
      const randomColor = colors[randomIndex];
      // card.style.backgroundColor = randomColor
      card.classList.add(
        "col-12",
        "col-md-6",
        "col-xl-3",
        "justify-content-between",
        "card-sfoglia",
      );

      card.style.overflow = "clip";
      card.innerHTML = `
      <a class="text-white text-decoration-none" href="./artist_page.html?id=${idArtisti}"><div class="d-flex rounded-4 h-100 position-relative" style="overflow:clip; background-color:${randomColor}; min-height:140px;">
      <h3 style="z-index:10" class="p-3 fw-bold" id="name-singer">${nomeArtisti}</h3>
                <img
                  src=${fotoArtisti}
                  class="rounded-4"
                  alt="foto_artista"
                  style="
                    rotate: 30deg;
                    position: absolute;
                    bottom:-30px;
                    right:-10px;
                    width:130px;
                    height:130px;
                  "
                /></div></a>`;

      cardContainer.appendChild(card);
    }
  })
  .catch((err) => {
    console.log("Errore", err);
  });

// document.addEventListener("click", function (e) {
//   const card = e.target.closest(".card-sfoglia")
//   if (card) {
//     const artistName = card.querySelector("#name-singer").innerText
//     window.location.href = `artist_page.html?id=${artistName}`
//     // Nota: se passi il nome, il mio artist_page.js lo gestirà tramite la search
//   }
// })

//sidebar start function
const search = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const getLibrary = function (searchValue) {
  fetch(search + searchValue)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((data) => {
      const appendLibrary = document.getElementById("appendLibrary");
      appendLibrary.innerHTML = "";

      data.data.forEach((track, i) => {
        const titoloAlbum = track.title;
        const imgAlbum = track.album.cover_medium;
        const artistaAlbum = track.artist.name;
        const cardLibrary = document.createElement("div");
        cardLibrary.classList.add("col-12", "d-flex", "m-2", "flex-wrap");
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
              </div>`;
        appendLibrary.appendChild(cardLibrary);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
getLibrary("miley cyrus");

//funzione del buon roberto che ha rotto tutto e ha fatto andare alessia a dormire alle 3 di notte
const nomeArtista = document.querySelectorAll(".name_artist");
const videoSong = document.getElementById("video_song");
const cardCorrelati = document.querySelectorAll(".card-video-correlati");
const nameSong = document.getElementById("name_song");
const infoArtista = document.getElementById("info_artista");
const nameArtistsidebar = function (x, y) {
  fetch(search + x)
    .then((response) => {
      if (!response.ok) throw new Error("Errore " + response.status);
      return response.json();
    })
    .then((data) => {
      const primoRisultato = data.data[0];
      //titolo della canzone
      if (nameSong) {
        nameSong.innerText = primoRisultato.title;
      }
      //nomi degli artisti
      const tuttiGliArtisti = document.querySelectorAll(".name_artist");
      tuttiGliArtisti.forEach((span) => {
        span.innerText = primoRisultato.artist.name;
      });

      //video
      if (videoSong) {
        videoSong.src = y;
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
          </div>`;
      });
      //info artista
      infoArtista.src = y;
    })
    .catch((err) => console.error("Errore nel recupero dati:", err));
};

const expandBtnEnd = document.getElementById("expand_btn_end");
const sideBarEnd = document.getElementById("sidebar_end");

expandBtnEnd.addEventListener("click", function () {
  sideBarEnd.classList.toggle("col-6");
  sideBarEnd.classList.toggle("bg-black");
  videoSong.classList.add("w-25");
});

const expandBtnStart = document.getElementById("expand_btn_start");
const sideBarStart = document.getElementById("sidebar_start");
const arrowBtn = document.querySelectorAll(".arrow-btn");

expandBtnStart.addEventListener("click", function () {
  sideBarStart.classList.toggle("z-3");
  sideBarStart.classList.toggle("bg-black");
  sideBarStart.classList.toggle("col-6");
  arrowBtn.forEach((element) => {
    element.classList.toggle("d-none");
  });
});

const fullHiddenBtn = document.getElementById("full_hidden_btn");
const centralPart = document.getElementById("central-part");
const spaceShowBtn = document.getElementById("space_show_btn");

fullHiddenBtn.addEventListener("click", function () {
  sideBarEnd.classList.toggle("collapsed");
  if (centralPart.classList.contains("col-lg-8")) {
    centralPart.classList.replace("col-lg-8", "col-lg-10");
    centralPart.classList.replace("indipendent-scroll", "indipendent-scroll-2");
    centralPart.classList.replace("main-page", "page");
  } else {
    centralPart.classList.replace("col-lg-10", "col-lg-8");
    centralPart.classList.replace("indipendent-scroll-2", "indipendent-scroll");
    centralPart.classList.replace("page", "main-page");
  }

  spaceShowBtn.appendChild(newBtnSpace);
});
const audio = document.getElementById("audio");
const progressBar = document.getElementById("range3");
const volumeBar = document.getElementById("volumeBar");
const volumeIcon = document.getElementById("volumeIcon");
const bottonePlay = document.getElementById("bottonePlay");
const currentTimeLabel = document.querySelector(".d-flex span.ms-2");
const durationLabel = document.querySelector(".col-6 .d-flex span:last-child");
//funzione colore
function aggiornaColoreProgressBar() {
  const min = progressBar.min || 0;
  const max = progressBar.max || 100;
  const val = progressBar.value;
  const percentuale = ((val - min) / (max - min)) * 100;
  progressBar.style.background = `linear-gradient(to right, #ffffff ${percentuale}%, #535353 ${percentuale}%)`;
}
//funzione play
function updateRangeColor(inputElement) {
  const value = inputElement.value;
  const max = inputElement.max || 100;
  const percentage = (value / max) * 100;
  const color = inputElement.id === "range3" ? "#ffffff" : "#1db954";
  inputElement.style.background = `linear-gradient(to right, ${color} ${percentage}%, #535353 ${percentage}%)`;
}

bottonePlay.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    this.innerHTML = `<i class="bi bi-pause-fill"></i>`;
  } else {
    audio.pause();
    this.innerHTML = `<i class="bi bi-play-fill"></i>`;
  }
});

audio.addEventListener("loadedmetadata", function () {
  progressBar.max = Math.floor(audio.duration);
  if (durationLabel) durationLabel.innerText = formatTime(audio.duration);
  updateRangeColor(progressBar);
});

audio.addEventListener("timeupdate", function () {
  progressBar.value = Math.floor(audio.currentTime);
  if (currentTimeLabel)
    currentTimeLabel.innerText = formatTime(audio.currentTime);
  updateRangeColor(progressBar);
});

progressBar.addEventListener("input", function () {
  audio.currentTime = progressBar.value;
  updateRangeColor(this);
});
function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
//funzione volume
volumeBar.addEventListener("input", function () {
  audio.volume = this.value;
  updateRangeColor(this);

  const icon = volumeIcon.querySelector("i");
  if (this.value == 0) {
    icon.className = "bi bi-volume-mute";
  } else if (this.value < 0.5) {
    icon.className = "bi bi-volume-down";
  } else {
    icon.className = "bi bi-volume-up";
  }
});
let lastVolume = 1;
volumeIcon.addEventListener("click", function () {
  const icon = this.querySelector("i");

  if (audio.volume > 0) {
    lastVolume = audio.volume;
    audio.volume = 0;
    volumeBar.value = 0;
    icon.className = "bi bi-volume-mute";
  } else {
    audio.volume = lastVolume;
    volumeBar.value = lastVolume;
    icon.className = lastVolume < 0.5 ? "bi bi-volume-down" : "bi bi-volume-up";
  }
});
