const apiAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album/"

const urlParameters = new URLSearchParams(location.search)
const albumID = urlParameters.get("id")

const infoAlbum = document.getElementById("info-album")
const tracklist = document.getElementById("tracklist")
const shuffleImg = document.getElementById("little-img")
const altroDaTitle = document.getElementById("altro-da")

fetch(apiAlbum + albumID)
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error(response.status)
    }
  })
  .then((data) => {
    console.log(data)
    shuffleImg.setAttribute("src", data.artist.picture_small)

    altroDaTitle.innerText = `Altro di ${data.artist.name}`
    const timeArray = (data.duration / 60).toString().split("")
    const dotIndex = timeArray.indexOf(".")
    const min = timeArray.slice(0, dotIndex).join("")
    let sec = timeArray.slice(dotIndex + 1, dotIndex + 3).join("")
    if (sec.length < 2) {
      sec = sec + "0"
    }

    infoAlbum.innerHTML = `
    <img src="${data.cover_medium}" class="rounded-3 m-5" alt="foto_album" />
             <div>
               <p>Album</p>
               <h1 class="fw-bold" style="font-size: 5em">${data.title}</h1>
               <div class="d-flex align-items-center">
                 <img
                   id="image-album"
                   src="${data.artist.picture_small}"
                   class="rounded-circle me-3"
                   alt="foto_artista" />
                 <p class="fw-bold m-0">
                   ${data.artist.name} • ${data.release_date.slice(0, 4)} • <span> ${data.nb_tracks} </span> brani, <span> ${min} </span> min
                   <span> ${sec} </span> sec.
                 </p>
               </div>
             </div>`

    data.tracks.data.forEach((track, i) => {
      const timeArray = (track.duration / 60).toString().split("")
      console.log(timeArray)
      const dotIndex = timeArray.indexOf(".")
      const min = timeArray.slice(0, dotIndex).join("")
      let sec = timeArray.slice(dotIndex + 1, dotIndex + 3).join("")
      if (sec.length < 2) {
        sec = sec + "0"
      }

      tracklist.innerHTML += `<div class="row align-items-center">
                <div class="col-1 text-center fs-5">${i + 1}</div>
                <div class="col-10">
                  <div class="d-flex flex-column">
                    <p class="fw-bold mb-1 fs-3">${track.title_short}</p>
                    <p class="text-secondary fs-5 mb-0">${track.artist.name}</p>
                  </div>
                </div>
                <div class="col-1 m-0">
                  <p class="fs-5">${min}:${sec}</p>
                </div>
              </div>`
    })
  })
  .catch((err) => console.log(err))

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
//
//
//
//
//
//
