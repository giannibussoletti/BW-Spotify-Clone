const apiAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album/"
const apiSearchQuery = "https://striveschool-api.herokuapp.com/api/deezer/search?q="

const urlParameters = new URLSearchParams(location.search)
const albumID = urlParameters.get("id")

const infoAlbum = document.getElementById("info-album")
const tracklist = document.getElementById("tracklist")
const shuffleImg = document.getElementById("little-img")
const altroDaTitle = document.getElementById("altro-da")
const altroDischi = document.getElementById("altri-dischi")

fetch(apiAlbum + albumID)
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error(response.status)
    }
  })
  .then((data) => {
    // shuffleImg.setAttribute("src", data.artist.picture_small)

    altroDaTitle.innerText = `Altro di ${data.artist.name}`
    const timeArray = (data.duration / 60).toString().split("")
    const dotIndex = timeArray.indexOf(".")
    const min = timeArray.slice(0, dotIndex).join("")
    let sec = timeArray.slice(dotIndex + 1, dotIndex + 3).join("")
    if (sec.length < 2) {
      sec = sec + "0"
    }
    //Header info album
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
    // Tracklist loop
    data.tracks.data.forEach((track, i) => {
      const timeArray = (track.duration / 60).toString().split("")
      const dotIndex = timeArray.indexOf(".")
      const min = timeArray.slice(0, dotIndex).join("")
      let sec = timeArray.slice(dotIndex + 1, dotIndex + 3).join("")
      if (sec.length < 2) {
        sec = sec + "0"
      }

      tracklist.innerHTML += `<div class="row align-items-center mb-2">
                <div class="col-1 text-center fs-5">${i + 1}</div>
                <div class="col-10">
                  <div class="d-flex flex-column">
                    <p class="fw-bold mb-1 fs-5">${track.title_short}</p>
                    <p class="text-secondary fs-6 mb-0">${track.artist.name}</p>
                  </div>
                </div>
                <div class="col-1 m-0">
                  <p class="fs-5">${min}:${sec}</p>
                </div>
              </div>`
    })
    //Altro da artista loop
    fetch(apiSearchQuery + data.artist.name)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error(response.status)
        }
      })
      .then((data) => {
        data.data.slice(0, 10).forEach((info) => {
          console.log(info)
          altroDischi.innerHTML += `
    <div class="col">
        <div class="card bg-transparent border-0 mt-3">
            <a href="./album_page.html?id=${info.album.id}"><img src="${info.album.cover_medium}" class="card-img-top" alt="foto_album" /></a>
            <div class="card-body">
            <p class="card-text m-0"><a class="text-white text-decoration-none" href="./album_page.html?id=${info.album.id}">${info.title_short}</a></p>
            <p class="card-text"><a class="text-secondary text-decoration-none" href="./album_page.html?id=${info.album.id}">${info.album.title}</a></p>
        </div>
    </div>
        `
        })
      })
      .catch((err) => console.log(err))
  })
  .catch((err) => console.log(err))
