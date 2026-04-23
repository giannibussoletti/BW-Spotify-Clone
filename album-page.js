const apiAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const apiSearchQuery =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const urlParameters = new URLSearchParams(location.search);
const albumID = urlParameters.get("id");

const infoAlbum = document.getElementById("info-album");
const tracklist = document.getElementById("tracklist");
const shuffleImg = document.getElementById("little-img");
const altroDaTitle = document.getElementById("altro-da");
const altroDischi = document.getElementById("altri-dischi");

fetch(apiAlbum + albumID)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  })
  .then((data) => {
    // shuffleImg.setAttribute("src", data.artist.picture_small)

    altroDaTitle.innerText = `Altro da ${data.artist.name}`;
    const timeArray = (data.duration / 60).toString().split("");
    const dotIndex = timeArray.indexOf(".");
    const min = timeArray.slice(0, dotIndex).join("");
    let sec = timeArray.slice(dotIndex + 1, dotIndex + 3).join("");
    if (sec.length < 2) {
      sec = sec + "0";
    }
    //Header info album
    infoAlbum.innerHTML = `
    <img src="${data.cover_medium}" class="rounded-3 m-5" alt="foto_album" />
             <div>
               <p>Album</p>
               <h1 class="fw-bold" style="font-size: 5em">${data.title}</h1>
               <div class="d-flex align-items-center">
                 <img
                   id="image-album"
                   src="${data.artist.picture_small}"
                   class="rounded-circle me-3"
                   alt="foto_artista" />
                 <p class="fw-bold m-0">
                   <a class="text-decoration-none text-white" href="./artist_page.html?id=${data.artist.id}">${data.artist.name}</a> • ${data.release_date.slice(0, 4)} • <span> ${data.nb_tracks} </span> brani, <span> ${min} </span> min
                   <span> ${sec} </span> sec.
                 </p>
               </div>
             </div>`;
    // Tracklist loop
    data.tracks.data.forEach((track, i) => {
      const timeArray = (track.duration / 60).toString().split("");
      const dotIndex = timeArray.indexOf(".");
      const min = timeArray.slice(0, dotIndex).join("");
      let sec = timeArray.slice(dotIndex + 1, dotIndex + 3).join("");
      if (sec.length < 2) {
        sec = sec + "0";
      }

      tracklist.innerHTML += `<div class="row align-items-center mb-2">
                <div class="col-1 text-center fs-5">${i + 1}</div>
                <div class="col-10">
                  <div class="d-flex flex-column">
                    <p class="fw-bold mb-1 fs-5">${track.title_short}</p>
                    <p class="text-secondary fs-6 mb-0">${track.artist.name}</p>
                  </div>
                </div>
                <div class="col-1 m-0">
                  <p class="fs-5">${min}:${sec}</p>
                </div>
              </div>`;
    });
  });

//Altro da artista loop
fetch(apiSearchQuery + data.artist.name)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  })
  .then((data) => {
    data.data.slice(0, 10).forEach((info) => {
      altroDischi.innerHTML += `
    <div class="col">
        <div class="card bg-transparent border-0 mt-3">
            <a href="./album_page.html?id=${info.album.id}"><img src="${info.album.cover_medium}" class="card-img-top" alt="foto_album" /></a>
            <div class="card-body">
            <p class="card-text m-0"><a class="text-white text-decoration-none" href="./album_page.html?id=${info.album.id}">${info.title_short}</a></p>
            <p class="card-text"><a class="text-secondary text-decoration-none" href="./album_page.html?id=${info.album.id}">${info.album.title}</a></p>
        </div>
    </div>
        `;
    });
  })
  .catch((err) => console.log(err));

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
