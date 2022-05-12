"use strict"

import { getDataMovies } from "./resultManage.js";

const lupaNav = document.querySelector("header .options .fa-magnifying-glass");
const lupaSearchTitle = document.querySelector("header .search .fa-magnifying-glass");
const searchMovie = document.querySelector("header .search");
const msjError = document.querySelector(".msjError");
const favoriteIcon = document.querySelector(".favorite-icon");
const favorites = document.querySelector(".favorites");
let titleToSearch = document.querySelector("header .search input");


//seteador de error
const setError = (msj) => {
  msjError.classList.add("active");
  msjError.textContent = msj;
  titleToSearch.value = "";
  setTimeout(() => msjError.classList.remove("active"), 3000)
}

//le envia el titulo a la funcion importada (resultManage.js) para mostrar las movies;
const sendTitle = () => {
  getDataMovies(titleToSearch.value.trim());
}

//validacion del input de título de la pélicula
const validaInputTitle = () => {
  let status = true;
  if(titleToSearch.value.trim() === ""){
    setError("Ingrese título a buscar");
    status = false;
    return
  }
  return status;
}


const listenerHeader = () => {
  document.addEventListener("DOMContentLoaded", e => {
    titleToSearch.focus();
  })
  
  //tecla enter para enviar busqueda por título
  document.addEventListener("keydown", e => {
    if(e.code.includes("Enter") && validaInputTitle()) sendTitle();
  })

  //activa barra de búsqueda en responsivo;
  lupaNav.addEventListener("click", e => {
    searchMovie.classList.toggle("active")
    titleToSearch.focus();
    lupaNav.classList.toggle("fa-times");
  })

  //busca titulo
  lupaSearchTitle.addEventListener("click", e => {
    if(validaInputTitle()) sendTitle();
  })

  //activa barra favoritos
  favoriteIcon.addEventListener("click", e => {
    favorites.classList.add("active");
  })

}

export { listenerHeader, setError };