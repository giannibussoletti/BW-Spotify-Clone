const query = "rock"
const searchWorld = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`
// // arrayparolericerca${input.value}
// const albumDetails = "https://striveschool-api.herokuapp.com/api/deezer/album/75621062"
// const artistDetails = "https://striveschool-api.herokuapp.com/api/deezer/album/75621062"

const cardSfoglia = document.querySelectorAll(".card-sfoglia")

const cardContainer = document.getElementById("card-container")
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
]

// funzione generazione random di card
fetch(searchWorld)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    for (let i = 0; i < data.data.length; i++) {
      const nomeArtisti = data.data[i].artist.name
      const fotoArtisti = data.data[i].artist.picture_medium
      const idArtisti = data.data[i].artist.id

      cardContainer.classList.add("d-flex")
      const card = document.createElement("div")
      const randomIndex = Math.floor(Math.random() * colors.length)
      const randomColor = colors[randomIndex]
      // card.style.backgroundColor = randomColor
      card.classList.add(
        "col-12",
        "col-md-6",
        "col-xl-3",
        "justify-content-between",
        "card-sfoglia",
      )

      card.style.overflow = "clip"
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
                /></div></a>`

      cardContainer.appendChild(card)
    }
  })
  .catch((err) => {
    console.log("Errore", err)
  })

// document.addEventListener("click", function (e) {
//   const card = e.target.closest(".card-sfoglia")
//   if (card) {
//     const artistName = card.querySelector("#name-singer").innerText
//     window.location.href = `artist_page.html?id=${artistName}`
//     // Nota: se passi il nome, il mio artist_page.js lo gestirà tramite la search
//   }
// })
