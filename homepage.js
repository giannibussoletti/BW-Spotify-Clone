// js di zio gianni
// Inject Consigliati
const consigliati = document.getElementById("consigliati")

for (let i = 0; i < 8; i++) {
  consigliati.innerHTML += `
<div class="col mb-3 d-flex align-items-center">
  <img
    style="height: 66px; width: 66px"
    src="https://cdn-images.dzcdn.net/images/artist/71eeb9e2eeb375df35a3c0654a5a01ab/1000x1000-000000-80-0-0.jpg" />
  <p class="m-0 ms-3">Storie d'amore</p>
</div>
`
}

// Inject carosello

const carouselPerTe = document.getElementById("per-te-carousel")
const artistiCarousel = document.getElementById("artisti-carousel")
const sezioneVideo = document.getElementById("video-row")

for (let i = 0; i < 15; i++) {
  carouselPerTe.innerHTML += `

            <div style="max-width:200px;" class="card border-0 px-2 bg-transparent"> 
              <img src="https://cdn-images.dzcdn.net/images/cover/e16455433a84c7e19025403ae3eec52d/250x250-000000-80-0-0.jpg" class="card-img-top w-100 rounded-1" alt="..." />
              <div class="card-body p-0 pt-2">
                <p class="card-text">
                  Best of queen, Jimi Hendrix, Edith Piaf
                </p>
              </div>
            </div>

          `
  //
  //
  //
  //
  artistiCarousel.innerHTML += `

            <div style="max-width:200px;" class="card border-0 px-2 bg-transparent">
              <img src="https://cdn-images.dzcdn.net/images/artist/7dc65523befdb7b865eb3f8595bbbd40/500x500-000000-80-0-0.jpg" class="card-img-top w-100 rounded-circle" alt="..." />
              <div class="card-body p-0 pt-2">
              <h6 style="font-size:.9em;" class="card-title pb-0 mb-1">Willie Peyote</h6>
                <p class="card-text">
                  Artista
                </p>
              </div>
            </div>

          `
}
for (let i = 0; i < 4; i++) {
  sezioneVideo.innerHTML += `<div class="col p-4">
            <p class="mb-2 p-0">Per i fan di rancore</p>

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
          </div>`
}

const rightMovement = function (event) {
  if (event === 0) {
    carouselPerTe.scrollBy(consigliati.offsetWidth / 2, 0)
  } else if (event === 1) {
    artistiCarousel.scrollBy(artistiCarousel.offsetWidth / 2, 0)
  }
  // else {
  //     newReleasesElementId.scrollBy(watchAgainElementId.offsetWidth, 0)
  //   }
}
const leftMovement = function (event) {
  if (event === 0) {
    carouselPerTe.scrollBy(-consigliati.offsetWidth / 2, 0)
  } else if (event === 1) {
    artistiCarousel.scrollBy(-artistiCarousel.offsetWidth / 2, 0)
  }
  //  else {
  //     newReleasesElementId.scrollBy(-watchAgainElementId.offsetWidth, 0)
  //   }
}

// js di ALe
// funzione di movimento carosello
function scrollLeftBtn() {
  document.getElementById("scroll").scrollBy({
    left: -200,
    behavior: "smooth",
  })
}
function scrollRightBtn() {
  document.getElementById("scroll").scrollBy({
    left: 200,
    behavior: "smooth",
  })
}
// fine movimento carosello
