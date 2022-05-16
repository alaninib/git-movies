"use strict"

import { getDataMovies, getOpenSessionUser, setCloseSessionUser } from "./resultManage.js";
import { paintUserProfile } from "./helpers/pain.js";

const lupaNav = document.querySelector("header .options .fa-magnifying-glass");
const lupaSearchTitle = document.querySelector("header .search .fa-magnifying-glass");
const searchMovie = document.querySelector("header .search");
const msjError = document.querySelector(".msjError");
const favoriteIcon = document.querySelector(".favorite-icon");
const favorites = document.querySelector(".favorites");
const userProfile = document.querySelector(".user-profile");
const optionMenu = document.querySelector("header nav .user-profile .options");
const closeSessionIcon = document.querySelector(".close-session-icon");
let titleToSearch = document.querySelector("header .search input");


//trae los datos del usuario logueado y los pinta
const sendToPaintUserLogin = () => {
  paintUserProfile(getOpenSessionUser());
}


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
    e.stopPropagation();
    optionMenu.classList.remove("active");
    searchMovie.classList.toggle("active")
    titleToSearch.focus();
    lupaNav.classList.toggle("fa-times");
  })

  //busca titulo
  lupaSearchTitle.addEventListener("click", e => {
    if(validaInputTitle()) sendTitle();
    optionMenu.classList.remove("active");
    console.log(optionMenu)
  })

  //activa barra favoritos
  favoriteIcon.addEventListener("click", e => {
    e.stopPropagation();
    favorites.classList.add("active");
    optionMenu.classList.remove("active");
  })

  //activa menu de usuario
  userProfile.addEventListener("click", e => {
    optionMenu.classList.toggle("active");
  })

  closeSessionIcon.addEventListener("click", e => {
    optionMenu.classList.remove("active");
    setCloseSessionUser();
  });
}

export { listenerHeader, setError, sendToPaintUserLogin };