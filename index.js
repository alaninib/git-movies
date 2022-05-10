"use strict"

import { getDataMovie, getMovieForId } from "./js/getMovies.js";
import { getSearchMovie } from "./js/storage.js";
import { paintMovie, paintModal, paintFavorites } from "./js/pain.js";


const lupaNav = document.querySelector("header .options .fa-magnifying-glass");
const lupaSearchTitle = document.querySelector("header .search .fa-magnifying-glass");
const header = document.querySelector("header");
const searchMovie = document.querySelector("header .search");
const containerMovie = document.querySelector(".container-movie");
const msjError = document.querySelector(".msjError");
let infoModal = document.querySelector(".info-modal");
let titleToSearch = document.querySelector("header .search input");


const setError = (msj) => {
  msjError.classList.add("active");
  msjError.textContent = msj;
  titleToSearch.value = "";
  setTimeout(() => msjError.classList.remove("active"), 3000)
}

const sendToPaint = (iterable, funcion) => {
  iterable.forEach(item => funcion(item))
}


const listener = (
  () => {
    //activa barra de búsqueda en responsivo;
    lupaNav.addEventListener("click", e => {
      searchMovie.classList.toggle("active")
      lupaNav.classList.toggle("fa-times");
    })

    //busca titulo
    lupaSearchTitle.addEventListener("click", e => {
      if(titleToSearch.value.trim() === "") {
        setError("Debe ingresar título...");
      }else{
        containerMovie.textContent = "";
        getDataMovie(titleToSearch.value.trim())
        .then(dataMovie => {
          if(dataMovie === undefined)setError("No hay resultados...")
          else{
            sendToPaint(dataMovie, paintMovie);
          }
        })
      }
    })

    containerMovie.addEventListener("click", e => {
      //add favorites;
      if(e.target.classList.contains("fa-star")){
        if(e.target.getAttribute("title").includes("Favoritos")){
          e.target.classList.add("active");
          e.target.setAttribute("title", "Quitar favorito");
        }else{
          e.target.classList.remove("active")
          e.target.setAttribute("title", "Favoritos")
        }
      }

      if(e.target.classList.contains("fa-circle-info")){
        getMovieForId(e.target.dataset.id)
        .then(dataMovie => paintModal(dataMovie))
        .then(() => infoModal.classList.add("active"));
      }
    })

    infoModal.addEventListener("click", e => {
      if(e.target.classList.contains("active")){
        infoModal.classList.remove("active");
      }
    })
})()


const pintaFavoritos = (
  () => {
    let dataFavoritos = getSearchMovie();
    sendToPaint(dataFavoritos, paintFavorites)
  }
)()


