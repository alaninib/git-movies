"use strict"

import { setModal } from "./modal.js";
import { paintFavorites } from "./helpers/pain.js";
import { saveFavorites, getFavoritesMovies } from "./helpers/storage.js";
import { notSelectFavorite } from "./resultManage.js";

const favorites = document.querySelector(".favorites");
const cantidadFavoritos = document.querySelector(".cantidad-favoritos");
const favoriteIcon = document.querySelector("header .options .favorite-icon");
let favoritesMovies = [];

//Trae las peliculas favoritas guardados en sesiones anteriores;
const setInitialFavorites = () => {
  favoritesMovies = getFavoritesMovies();
  if(favoritesMovies.length > 0){
    favoriteIcon.classList.add("active");
    setCountFavoritos();
    favoritesMovies.forEach(favorite => paintFavorites(favorite));
  }
}


//remueve el nodo de favorito
const removeNodoItem = (idMovie) => {
  favorites.querySelectorAll(".favorite").forEach(item =>{
    if(item.dataset.id  === idMovie) item.remove();
  })
}

//elimina de forma lógica los favoritos
const deleteItemFavorito = (idMovie) => {
  favoritesMovies = favoritesMovies.filter(item => item.id !== idMovie);
  saveFavorites(favoritesMovies);
  removeNodoItem(idMovie);
  notSelectFavorite(idMovie);
  setCountFavoritos();
  //si no queda ningun favorito, se desactiva la vista del icono favoritos (header) y de la section favorites
  if(favoritesMovies.length < 1) {
    favorites.classList.remove("active");
    favoriteIcon.classList.remove("active");
  };
}

//determina el numero de favoritos agregados
const setCountFavoritos = () => {
  cantidadFavoritos.textContent = favoritesMovies.length;
}

//crea el favorito, lo envia a pintar, guardar en el localstorage y setea la cantidad de favoritos;
const setFavorite = (movie) => {
  let element = movie.parentNode.parentNode;
  let movieObj = {
    id: element.dataset.id,
    poster: element.querySelector(".movie-poster img").src,
    title: element.querySelector(".movie-title").textContent
  }
  favoritesMovies = [...favoritesMovies, movieObj];
  paintFavorites(movieObj);
  saveFavorites(favoritesMovies);
  setCountFavoritos();
  favorites.classList.add("active");
}

//escuchadores de favoritos
const listenerFavorites = () => {
  favorites.addEventListener("click", e => {
    if(e.target.classList.contains("favorites"))favorites.classList.remove("active");
    if(e.target.classList.contains("fa-times")) favorites.classList.remove("active");
    if(e.target.classList.contains("fa-circle-info")) setModal(e.target.dataset.id);
    if(e.target.classList.contains("fa-trash-can")) deleteItemFavorito(e.target.dataset.id);
  })
}



export { setFavorite, listenerFavorites, setInitialFavorites, deleteItemFavorito};