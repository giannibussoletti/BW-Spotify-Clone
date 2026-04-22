const search = "https://striveschool-api.herokuapp.com/api/deezer/search?q="
// arrayparolericerca${input.value}
const albumDetails =
  "https://striveschool-api.herokuapp.com/api/deezer/album/75621062"
const artistDetails =
  "https://striveschool-api.herokuapp.com/api/deezer/album/75621062"

// js di roberto
// elementi del dom
const dropdownForSearch = document.getElementById("dropdownForSearch")
const inputNavbarValue = document.getElementById("inputNavbar")
const audio = document.getElementById("audio")
const nameArtist = document.querySelectorAll(".name_artist")
const videoSong = document.getElementById("video_song")
const videoCorrelatiCard = document.querySelectorAll(".card-video-correlati")
const nameSong = document.getElementById("name_song")

const nameArtistsidebar = function () {
  fetch(search + inputNavbarValue.value)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("errore", response.status)
      }
    })
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.log("errore dio babbuino", err)
    })
}
nameArtistsidebar()
