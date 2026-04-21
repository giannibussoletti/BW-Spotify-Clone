const searchGeneries =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=genres";
// arrayparolericerca${input.value}
const albumDetails =
  "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";
const artistDetails =
  "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";

const carouselRow = document.getElementById("carouselRow");

const getAlbum = function () {
  fetch(searchGeneries)
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
        const rowCarosello = document.getElementById("carouselRow");
        const cardCarosello = document.createElement("div");
        cardCarosello.classList.add(
          "card",
          "col-6",
          "m-3",
          "position-relative",
        );
        cardCarosello.innerHTML = `<img src="${imgAlbum}" alt="Preferiti Spotify" class="img-fluid rounded-1">
                       <div class="card-body">
                       <p class="card-text">${titoloAlbum} • ${artistaAlbum}</p>
                       <a href="#" class="btn text-black rounded-circle position-absolute" style="bottom:35%;right: 10%; background-color:#3BE477" ><i class="bi bi-play-fill"></i></a>
                       </div>`;
        rowCarosello.appendChild(cardCarosello);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
getAlbum();

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
