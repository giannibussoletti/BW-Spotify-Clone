const search = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
// arrayparolericerca${input.value}
const albumDetails =
  "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";
const artistDetails =
  "https://striveschool-api.herokuapp.com/api/deezer/artist/${idArtisti}";
const dropdownForSearch = document.getElementById(" dropdownForSearch");
const inputNavbarValue = document.getElementById("inputNavbar");
inputNavbarValue.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
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
        data.data.forEach((tracks) => {
          const elementoLista = document.createElement("li");
          const link = tracks.link;
          const title = tracks.title;
          const img = tracks.picture;
          const name = tracks.name;
          elementoLista.innerHTML = `${title}-${name}`;
          dropdownForSearch.appendChild(elementoLista);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
