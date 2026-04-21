const searchGeneries =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=badbunny";
// arrayparolericerca${input.value}
const albumDetails =
  "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";
const artistDetails =
  "https://striveschool-api.herokuapp.com/api/deezer/artist/${idArtisti}";

const getLibrary = function () {
  fetch(search + "avrillavigne")
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

// <!-- inizio carosello -->
//             <div id="carouselExample" class="carousel slide">
//             <div class="carousel-inner">
//             <!-- prima slide -->
//             <div class="carousel-item active">
//                  <div class="container-fluid">
//                     <div class="row" id="carouselRow">
//                     </div>
//                     </div>
//                 </div>
//             </div>
//             <!-- bottone precedente -->
//             <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
//             <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//             <span class="visually-hidden">Previous</span>
//             </button>
//             <!-- bottone prossimo -->
//             <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
//             <span class="carousel-control-next-icon" aria-hidden="true"></span>
//             <span class="visually-hidden">Next</span>
//             </button>
//           </div>
// <!-- fine carosello -->

// class ArtistiVari {
//   constructor(_firstName, _song, _album, _img, _id) {
//     this.firstName = _firstName;
//     this.song = _song;
//     this.album = _album;
//     this.img = _img;
//     this.id = _id;
//   }
// }

// const artistId = [454, 319, 275, 27];
const searchConsigliati =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=italiana";
const consigliati = document.getElementById("consigliati");
const getConsigli = function () {
  fetch(searchConsigliati)
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
        cardCarosello.classList.add("card", "col-6", "m-3");
        cardCarosello.innerHTML = `<img
                         style="height: 66px; width: 66px"
                         src="${imgAlbum}" />
                         <p class="m-0 ms-3">• ${artistaAlbum}</p>`;
        consigliati.appendChild(cardCarosello);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
getConsigli();
