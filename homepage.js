const search = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
// arrayparolericerca${input.value}
const albumDetails =
  "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";
const artistDetails =
  "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";

// js di zio gianni
// Inject Consigliati
const searchConsigliati =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=italiana";
const consigliati = document.getElementById("consigliati");
const getConsigli = function () {
  fetch(search + "italiana")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((data) => {
      console.log(data);
      data.data.forEach((track) => {
        const id = track.id;
        console.log(id);
        const titoloAlbum = track.title;
        const imgAlbum = track.album.cover_medium;
        const artistaAlbum = track.artist.name;
        console.log(titoloAlbum, imgAlbum, artistaAlbum);
        const cardCarosello = document.createElement("div");
        cardCarosello.classList.add("card", "col-6", "d-flex");
        cardCarosello.innerHTML = `<div class="w-25"><img src="${imgAlbum}" class="img-fluid"/></div>
              <div class="d-flex flex-column">
              <p class="m-0 ms-3">${titoloAlbum}</p>
              <p class="m-0 ms-3">${artistaAlbum}</p>
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
  fetch(search + "caparezza")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((data) => {
      console.log(data);
      data.data.forEach((track) => {
        const id = track.id;
        console.log(id);
        const titoloAlbum = track.title;
        const imgAlbum = track.album.cover_medium;
        const artistaAlbum = track.artist.name;
        console.log(titoloAlbum, imgAlbum, artistaAlbum);
        const cardCarosello = document.createElement("div");
        cardCarosello.classList.add(
          "card",
          "col-6",
          "m-3",
          "position-relative",
        );
        cardCarosello.innerHTML = `<img src="${imgAlbum}" alt="Preferiti Spotify" class="h-50 img-fluid rounded-1">
                       <div class="card-body">
                       <p class="card-text">${titoloAlbum} • ${artistaAlbum}</p>
                       <a href="#" class="btn text-black rounded-circle position-absolute" style="bottom:30%;right: 10%; z-index:10; background-color:#3BE477" ><i class="bi bi-play-fill"></i></a>
                       </div>`;
        carouselPerTe.appendChild(cardCarosello);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
getAlbum();
const getLibrary = function () {
  fetch(search + "greenday")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((data) => {
      console.log(data);
      data.data.forEach((track) => {
        const titoloAlbum = track.title;
        const imgAlbum = track.album.cover_medium;
        const artistaAlbum = track.artist.name;
        const appendLibrary = document.getElementById("appendLibrary");
        const cardLibrary = document.createElement("div");
        cardLibrary.classList.add("col-12", "d-flex", "m-2");
        cardLibrary.innerHTML = `<img
                src="${imgAlbum}"
                alt="Preferiti Spotify"
                class="img-fluid w-25 rounded-1 me-1" />
              <div class="d-flex flex-column">
                <h6>${titoloAlbum}</h6>
                <div class="d-flex">
                  <p>Album</p>
                  <p class="ms-1">• ${artistaAlbum}</p>
                </div>
              </div>`;
        appendLibrary.appendChild(cardLibrary);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
getLibrary();
for (let i = 0; i < 4; i++) {
  sezioneVideo.innerHTML += `<div class="col p-4">
            <p class="mb-2 p-0 text-secondary">Per i fan di rancore</p>

            <div class="row position-relative rounded-2 m-0">
              <video class="rounded-2 p-0">
                <source src="./output.mp4" type="video/mp4" />
              </video>
              <div
                class="rounded-top-2 row m-0 position-absolute video-top align-items-center pt-3 pb-5">
                <div class="col">
                  <img
                    class="img-fluid"
                    src="https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/thisisv3/5DkmrXKeWgDS86KKEw45o6/it"
                    alt="" />
                </div>
                <div class="col-9">
                  <h3 class="m-0 fw-bold">This is Rancore</h3>
                  <p style="font-size: 0.8rem" class="m-0">playlist - spotify</p>
                </div>
              </div>
              <div
                class="row rounded-bottom-2 bottom-0 m-0 position-absolute video-bottom align-items-center py-3">
                <div class="col rounded-bottom-2">
                  <p class="m-0"></p>
                  <p style="font-size: 0.8rem" class="my-5 pt-5 pb-3">
                    This is Rancore. Tutti i brani in un'unica playlist.
                  </p>
                </div>
              </div>
            </div>
          </div>`;
}

const rightMovement = function (event) {
  if (event === 0) {
    carouselPerTe.scrollBy(consigliati.offsetWidth / 2, 0);
  } else if (event === 1) {
    artistiCarousel.scrollBy(artistiCarousel.offsetWidth / 2, 0);
  }
  // else {
  //     newReleasesElementId.scrollBy(watchAgainElementId.offsetWidth, 0)
  //   }
};
const leftMovement = function (event) {
  if (event === 0) {
    carouselPerTe.scrollBy(-consigliati.offsetWidth / 2, 0);
  } else if (event === 1) {
    artistiCarousel.scrollBy(-artistiCarousel.offsetWidth / 2, 0);
  }
  //  else {
  //     newReleasesElementId.scrollBy(-watchAgainElementId.offsetWidth, 0)
  //   }
};

// js di ALe
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
// fine movimento carosello
// funzione per l'input
const inputNavbar = document.getElementById("inputNavbar");
const cercaCanzoni =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=${inputNavbar.value}";
