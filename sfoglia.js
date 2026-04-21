const searchWorld =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=generi"
// arrayparolericerca${input.value}
const albumDetails =
  "https://striveschool-api.herokuapp.com/api/deezer/album/75621062"
const artistDetails =
  "https://striveschool-api.herokuapp.com/api/deezer/album/75621062"

const cardSfoglia = document.querySelectorAll(".card-sfoglia")
console.log(cardSfoglia)
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
console.log(colors)
// funzione estrazione indice random
const changeColor = function () {
  for (let i = 0; i < cardSfoglia.length; i++) {
    const randomIndex = Math.floor(Math.random() * colors.length)
    const randomColor = colors[randomIndex]
    console.log(randomColor)
    cardSfoglia[i].style.backgroundColor = randomColor
  }
}
changeColor()

// funzione generazione random di card
fetch(searchWorld)
