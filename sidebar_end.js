// js di roberto
// elementi del dom
const nameArtist = document.querySelectorAll(".name_artist")
const videoSong = document.getElementById("video_song")
const videoCorrelatiCard = document.querySelectorAll(".card-video-correlati")
const nameSong = document.getElementById("name_song")

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "vertical",
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
})
