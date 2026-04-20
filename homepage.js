// Inject Consigliati
const consigliati = document.getElementById("consigliati")

for (let i = 0; i < 8; i++) {
  consigliati.innerHTML += `
<div class="col mb-3 d-flex align-items-center">
  <img
    style="height: 48px; width: 48px"
    src="https://cdn-images.dzcdn.net/images/artist/71eeb9e2eeb375df35a3c0654a5a01ab/1000x1000-000000-80-0-0.jpg" />
  <p class="m-0 ms-3" style="font-size: 0.8em">Storie d'amore</p>
</div>
`
}

// Inject carosello

const carouselPerTe = document.getElementById("per-te-carousel")
const artistiCarousel = document.getElementById("artisti-carousel")

for (let i = 0; i < 15; i++) {
  carouselPerTe.innerHTML += `

            <div style="max-width:150px;" class="card border-0 px-2">
              <img src="https://cdn-images.dzcdn.net/images/cover/e16455433a84c7e19025403ae3eec52d/250x250-000000-80-0-0.jpg" class="card-img-top w-100 rounded-1" alt="..." />
              <div class="card-body p-0 pt-2">
                <p style="font-size:0.8em;" class="card-text">
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

            <div style="max-width:150px;" class="card border-0 px-2">
              <img src="https://cdn-images.dzcdn.net/images/artist/7dc65523befdb7b865eb3f8595bbbd40/500x500-000000-80-0-0.jpg" class="card-img-top w-100 rounded-circle" alt="..." />
              <div class="card-body p-0 pt-2">
              <h6 style="font-size:.9em;" class="card-title pb-0 mb-1">Willie Peyote</h6>
                <p style="font-size:0.8em;" class="card-text">
                  Artista
                </p>
              </div>
            </div>

          `
}

const rightMovement = function (event) {
  if (event === 0) {
    carouselPerTe.scrollBy(consigliati.offsetWidth, 0)
  } else if (event === 1) {
    artistiCarousel.scrollBy(artistiCarousel.offsetWidth, 0)
  }
  // else {
  //     newReleasesElementId.scrollBy(watchAgainElementId.offsetWidth, 0)
  //   }
}
const leftMovement = function (event) {
  if (event === 0) {
    carouselPerTe.scrollBy(-consigliati.offsetWidth, 0)
  } else if (event === 1) {
    artistiCarousel.scrollBy(-artistiCarousel.offsetWidth, 0)
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
