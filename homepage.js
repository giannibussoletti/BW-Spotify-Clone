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
  fetch(search + "rihanna")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((data) => {
      console.log(data);
      data.data.slice(0, 8).forEach((track) => {
        const id = track.id;
        console.log(id);
        const titoloAlbum = track.title;
        const imgAlbum = track.album.cover_medium;
        const artistaAlbum = track.artist.name;
        console.log(titoloAlbum, imgAlbum, artistaAlbum);
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
        <p class="m-0 ms-3 fw-bold">${titoloAlbum}</p>
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
        cardCarosello.innerHTML = `<img src="${imgAlbum}" alt="Preferiti Spotify" class="img-fluid rounded-1 mt-3">
                       <div class="card-body">
                       <p class="card-text fs-5">${artistaAlbum}</p>
                       <a href="#" class="btn text-black rounded-circle position-absolute" style="bottom:40%;right: 10%; z-index:10; background-color:#3BE477" ><i class="bi bi-play-fill"></i></a>
                       </div>`;
        carouselPerTe.appendChild(cardCarosello);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
getAlbum();
// funzione di gianni
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
};
const leftMovement = function (event) {
  if (event === 0) {
    carouselPerTe.scrollBy(-consigliati.offsetWidth / 2, 0);
  } else if (event === 1) {
    artistiCarousel.scrollBy(-artistiCarousel.offsetWidth / 2, 0);
  }
};
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
      console.log(data);
      const appendLibrary = document.getElementById("appendLibrary");
      appendLibrary.innerHTML = "";

      data.data.forEach((track) => {
        const titoloAlbum = track.title;
        const imgAlbum = track.album.cover_medium;
        const artistaAlbum = track.artist.name;

        //
        //
        //
        //
        //
        //
        //
        //
        //
        //
        const cardLibrary = document.createElement("div");
        cardLibrary.classList.add("col-12", "d-flex", "m-2", "flex-wrap");
        cardLibrary.innerHTML = ` <img
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
getLibrary("kanye West");
// questa è un altra funzione
inputNavbarValue.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getLibrary(inputNavbarValue.value);
    console.log(inputNavbarValue.value);
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
        data.data.slice(0, 5).forEach((tracks) => {
          const elementoLista = document.createElement("li");
          const link = tracks.preview;
          const title = tracks.title;
          const name = tracks.artist.name;
          const img = tracks.album.cover_medium;
          console.log(link);
          elementoLista.classList.add("list-group-item", "p-2");
          elementoLista.innerHTML = `
          <div class="card rounded-2 p-0 h-100" >
          <div class="row g-0 d-flex">
          <div class="col-4 border-0"style="max-width:100px;">
          <img src="${img}" class="img-fluid rounded-2 border border-2">
          </div>
          <div class="col-8">
          <div class="card-body">
          <h6 class="card-title m-0 me-1">${title}</h6>
          <p class="card-text">• ${name}</p>
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
          });
          bottonePlay.addEventListener("click", function () {
            const bottonePlay = document.getElementById("bottonePlay");
            if (audio.paused) {
              audio.play();
              bottonePlay.innerHTML = ` <i class="bi bi-play-fill"></i> `;
            } else {
              audio.pause();
              bottonePlay.innerHTML = `
              
                    <i class="bi bi-pause-fill"></i>
                  
                    `;
            }
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
const cardCorrelati = document.getElementById("card_correlati");
const name_song = document.getElementById("name_song");
// const nameArtistsidebar = function (x, y) {
//   fetch(search + x)
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error("errore" + response.status);
//       }
//     })
//     .then((data) => {
//       const primoRisultato = data.data[0];

//       // 1. Aggiorna i nomi degli artisti nella lista/sidebar esistente
//       nomeArtista.forEach((el, index) => {
//         if (data.data[index]) {
//           el.innerText = data.data[index].artist.name;
//         }
//       });

//       // 2. Aggiorna il video
//       if (videoSong) videoSong.src = y;

//       // 3. Aggiorna la Card dei correlati (usando il primo risultato)
//       cardCorrelati.innerHTML = `
//       <img src="${primoRisultato.album.cover_medium}" class="card-img-top" alt="video_correlati" />
//       <div class="card-body">
//         <p class="card-text">
//           <span class="mt-2">${primoRisultato.album.title}</span>
//         </p>
//         <p class="m-0">
//           <span class="name_artist">${primoRisultato.artist.name}</span>
//         </p>
//       </div>`;

//       // 4. Aggiorna il titolo della canzone
//       // Assicurati che l'elemento 'name_song' non sia dentro 'cardCorrelati'
//       // altrimenti verrà rimosso quando sovrascrivi innerHTML sopra.
//       if (name_song) {
//         name_song.innerHTML = `<h3>${primoRisultato.title}</h3>`;
//       }
//     })
//     .catch((err) => {
//       console.log("errore", err);
//     });
// };
const nameArtistsidebar = function (x, y) {
  fetch(search + x)
    .then((response) => {
      if (!response.ok) throw new Error("Errore " + response.status);
      return response.json();
    })
    .then((data) => {
      const primoRisultato = data.data[0];
      console.log("Dati ricevuti:", primoRisultato);
      //titolo della canzone
      const titleElem = document.getElementById("name_song");
      if (titleElem) {
        titleElem.innerText = primoRisultato.title;
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
      if (cardCorrelati) {
        cardCorrelati.innerHTML = `
          <img src="${primoRisultato.album.cover_medium}" class="card-img-top" alt="video_correlati" />
          <div class="card-body">
            <p class="card-text">
              <span class="mt-2">${primoRisultato.album.title}</span>
            </p>
            <p class="m-0">
              <span class="name_artist">${primoRisultato.artist.name}</span>
            </p>
          </div>`;
      }
    })
    .catch((err) => console.error("Errore nel recupero dati:", err));
};
