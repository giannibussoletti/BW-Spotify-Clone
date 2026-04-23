const search = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
// arrayparolericerca${input.value}
const albumDetails =
  "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";
const artistDetails =
  "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";

const dropdownForSearch = document.getElementById("dropdownForSearch");
const inputNavbarValue = document.getElementById("inputNavbar");
const audio = document.getElementById("audio");

// Inject Consigliati
const consigliati = document.getElementById("consigliati");
const getConsigli = function () {
  fetch(search + "Childish Gambino")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((data) => {
      data.data.slice(0, 8).forEach((track) => {
        const id = track.id;

        const titoloAlbum = track.title;
        const imgAlbum = track.album.cover_medium;
        const artistaAlbum = track.artist.name;

        const cardCarosello = document.createElement("div");
        cardCarosello.classList.add(
          "card",
          "d-flex",
          "border-0",
          "bg-transparent",
          "flex",
        );
        cardCarosello.innerHTML = `<div class="col m-0 p-2">
        <div class="d-flex align-items-center bg-dark bg-opacity-75 rounded-2 p-2">
        <img class="rounded-start-2"
        style="height: 50px; width: 50px"
        src="${imgAlbum}" />
        <p class="m-0 ms-3 fw-bold"><a class="text-decoration-none text-white" href="./album_page.html?id=${track.album.id}">${titoloAlbum}</a></p>
        </div>
        </div>`;
        consigliati.appendChild(cardCarosello);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
getConsigli();
// Inject carosello
const artistiCarousel = document.getElementById("artisti-carousel");
const sezioneVideo = document.getElementById("video-row");
const carouselPerTe = document.getElementById("per-te-carousel");
const getAlbum = function () {
  fetch(search + "rock")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((data) => {
      data.data.forEach((track) => {
        const id = track.id;

        const titoloAlbum = track.title;
        const imgAlbum = track.album.cover_medium;
        const artistaAlbum = track.artist.name;
        const cardCarosello = document.createElement("div");
        cardCarosello.classList.add(
          "card",
          "col-6",
          "m-3",
          "position-relative",
        );
        cardCarosello.innerHTML = `<img src="${imgAlbum}" alt="Preferiti Spotify" class="img-fluid rounded-1 mt-3">
                       <div class="card-body">
                       <p class="card-text fs-5">${artistaAlbum}</p>
                       <a href="#" class="btn text-black rounded-circle position-absolute" style="bottom:40%;right: 10%; z-index:10; background-color:#3BE477" ><i class="bi bi-play-fill"></i></a>
                       </div>`;
        carouselPerTe.appendChild(cardCarosello);
        //
        //
        //
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
getAlbum();

const getArtist = function () {
  fetch(search + "underground rok")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error((response) => response.status);
      }
    })
    .then((artist) => {
      artist.data.forEach((info) => {
        const cardArtista = document.createElement("div");
        cardArtista.classList.add(
          "card",
          "col",
          "m-3",
          "position-relative",
          "bg-transparent",
        );
        cardArtista.innerHTML += `<a href="./artist_page.html?id=${info.artist.id}"><img src="${info.artist.picture_medium}" alt="Preferiti Spotify" class="img-fluid rounded-circle mt-3 w-100"></a>
                       <div class="card-body">
                       <p class="card-text text-center fs-5">${info.artist.name}</p>

                       </div>`;
        artistiCarousel.appendChild(cardArtista);
      });
    })
    .catch((err) => console.log(err));
};
getArtist();

// funzione di gianni
// preset object per video
const videoArrayObj = [
  {
    name: "Rancore",
    video: "./assets/video/rancore.mp4",
    image:
      "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/thisisv3/5DkmrXKeWgDS86KKEw45o6/it",
  },
  {
    name: "Tony Pitony",
    video: "./assets/video/tonypitony.mp4",
    image:
      "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/thisisv3/07yfI2D37Ir0pGQ8huDd4j/it",
  },
];

videoArrayObj.forEach((video) => {
  sezioneVideo.innerHTML += `<div class="col p-4">
            <p class="mb-2 p-0 text-secondary">Per i fan di ${video.name}</p>

            <div class="row position-relative rounded-2 m-0">
              <video class="rounded-2 p-0">
                <source src="${video.video}" type="video/mp4" />
              </video>
              <div
                class="rounded-top-2 row m-0 position-absolute video-top align-items-center pt-3 pb-5">
                <div class="col">
                  <img
                    class="img-fluid"
                    src="${video.image}"
                    alt="" />
                </div>
                <div class="col-9">
                  <h3 class="m-0 fw-bold">This is ${video.name}</h3>
                  <p style="font-size: 0.8rem" class="m-0">playlist - spotify</p>
                </div>
              </div>
              <div
                class="row rounded-bottom-2 bottom-0 m-0 position-absolute video-bottom align-items-center py-3">
                <div class="col rounded-bottom-2">
                  <p class="m-0"></p>
                  <p style="font-size: 0.8rem" class="my-5 pt-5 pb-3">
                    This is ${video.name}. Tutti i brani in un'unica playlist.
                  </p>
                </div>
              </div>
            </div>
          </div>`;
});

const videoAutoplay = document.querySelectorAll("video");
videoAutoplay.forEach((video) => {
  video.addEventListener("mouseenter", () => {
    video.play();
  });
  video.addEventListener("mouseleave", () => {
    video.pause();
  });
});

// comandi Caroselli creato per & Artisti
const rightMovement = function (event) {
  if (event === 0) {
    carouselPerTe.scrollBy(consigliati.offsetWidth / 2, 0);
  } else if (event === 1) {
    artistiCarousel.scrollBy(artistiCarousel.offsetWidth / 2, 0);
  }
};
window.rightMovement = rightMovement;
const leftMovement = function (event) {
  if (event === 0) {
    carouselPerTe.scrollBy(-consigliati.offsetWidth / 2, 0);
  } else if (event === 1) {
    artistiCarousel.scrollBy(-artistiCarousel.offsetWidth / 2, 0);
  }
};
window.leftMovement = leftMovement;
// funzione di movimento carosello
function scrollLeftBtn() {
  document.getElementById("scroll").scrollBy({
    left: -200,
    behavior: "smooth",
  });
}
function scrollRightBtn() {
  document.getElementById("scroll").scrollBy({
    left: 200,
    behavior: "smooth",
  });
}

// mettete dei puttana di commenti

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
getLibrary("kanye West");

// questa è un altra funzione
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
          // bottonePlay.addEventListener("click", function () {
          //   const bottonePlay = document.getElementById("bottonePlay")
          //   if (audio.paused) {
          //     audio.play()
          //     bottonePlay.innerHTML = ` <i class="bi bi-play-fill"></i> `
          //   } else {
          //     audio.pause()
          //     bottonePlay.innerHTML = `<i class="bi bi-pause-fill"></i>`
          //   }
          // })
          const bottonePlay = document.querySelectorAll(".bottonePlay");
          bottonePlay.forEach((element) => {
            element.addEventListener("click", function () {
              if (audio.paused) {
                audio.play();
                element.innerHTML = ` <i class="bi bi-play-fill"></i> `;
              } else {
                audio.pause();
                element.innerHTML = `<i class="bi bi-pause-fill"></i>`;
              }
            });
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

// funzione del buon roberto NON TOCCARE

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
//funzione del play
bottonePlay.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    this.innerHTML = ` <i class="bi bi-pause-fill"></i> `;
  } else {
    audio.pause();
    this.innerHTML = `<i class="bi bi-play-fill"></i>`;
  }
});
audio.addEventListener("loadedmetadata", function () {
  progressBar.max = Math.floor(audio.duration);
  durationLabel.innerText = formatTime(audio.duration);
  const percentage = (audio.currentTime / audio.duration) * 100;
  progressBar.style.background = `linear-gradient(to right, #1db954 ${percentage}%, #535353 ${percentage}%)`;
});
audio.addEventListener("timeupdate", function () {
  progressBar.value = Math.floor(audio.currentTime);
  currentTimeLabel.innerText = formatTime(audio.currentTime);
});
progressBar.addEventListener("input", function () {
  audio.currentTime = progressBar.value;
});
function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
//funzione volume
volumeBar.addEventListener("input", function () {
  const value = this.value;
  audio.volume = value;
  const volumePercentage = value * 100;
  this.style.background = `linear-gradient(to right, #1db954 ${volumePercentage}%, #535353 ${volumePercentage}%)`;
  const icon = volumeIcon.querySelector("i");
  if (value == 0) {
    icon.className = "bi bi-volume-mute";
  } else if (value < 0.5) {
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
