const query = "b"
const searchWorld = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`
// arrayparolericerca${input.value}
const albumDetails = "https://striveschool-api.herokuapp.com/api/deezer/album/75621062"
const artistDetails = "https://striveschool-api.herokuapp.com/api/deezer/album/75621062"

const cardSfoglia = document.querySelectorAll(".card-sfoglia")
console.log(cardSfoglia)

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
    for (let i = 0; i < 5; i++) {
      const nomeArtisti = data.data[i].artist.name
      const fotoArtisti = data.data[i].artist.picture_medium

      console.log(nomeArtisti)
      console.log(fotoArtisti)

      const container = document.getElementById("card-container")
      container.classList.add("d-flex")
      const card = document.createElement("div")
      const randomIndex = Math.floor(Math.random() * colors.length)
      const randomColor = colors[randomIndex]
      card.style.backgroundColor = randomColor
      card.classList.add(
        "col-12",
        "col-md-6",
        "col-xl-3",
        "rounded-4",
        "d-flex",
        "justify-content-between",
        "card-sfoglia",
      )

      card.style.overflow = "clip"
      card.innerHTML = `
      <h3 class="p-3 fw-bold" id="name-singer">${nomeArtisti}</h3>
                <img
                  src=${fotoArtisti}
                  class="rounded-4 w-50"
                  alt="foto_artista"
                  style="
                    rotate: 30deg;
                    position: relative;
                    top: 32px;
                    right: -10px;
                  "
                />`

      container.appendChild(card)
    }
  })
  .catch((err) => {
    console.log("Errore", err)
  })
