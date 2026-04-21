const searchWorld =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=avril";
const albumDetails =
  "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";
const artistDetails =
  "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";

const carouselRow = document.getElementById("carouselRow");

const getAlbum = function () {
  fetch(searchWorld)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((data) => {
      console.log(data);
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
//                        <div class="card col-6">
//                        <img src="https://www.placecats.com/100/100" alt="Preferiti Spotify" class="img-fluid rounded-1">
//                        <div class="card-body">
//                        <p class="card-text">Brano1</p>
//                        <a href="#" class="btn btn-success text-black"></a>
//                        </div>
//                        </div>
//                        <div class="card col-6">
//                        <img src="https://www.placecats.com/100/100" alt="Preferiti Spotify" class="img-fluid rounded-1">
//                        <div class="card-body">
//                        <p class="card-text">Brano2</p>
//                        <a href="#" class="btn btn-success text-black"></a>
//                        </div>
//                        </div>
//                     </div>
//                 </div>
//             </div>
//             <!-- seconda slide -->
//                <div class="carousel-item active">
//                  <div class="container-fluid">
//                     <div class="row">
//                        <div class="card col-6">
//                        <img src="https://www.placecats.com/100/100" alt="Preferiti Spotify" class="img-fluid rounded-1">
//                        <div class="card-body">
//                        <p class="card-text">Brano3</p>
//                        <a href="#" class="btn btn-success text-black"></a>
//                        </div>
//                        </div>
//                        <div class="card col-6">
//                        <img src="https://www.placecats.com/100/100" alt="Preferiti Spotify" class="img-fluid rounded-1">
//                        <div class="card-body">
//                        <p class="card-text">Brano</p>
//                        <a href="#" class="btn btn-success text-black"></a>
//                        </div>
//                        </div>
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
