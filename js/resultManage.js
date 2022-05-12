"use strict"

import { setModal } from "./modal.js";
import { setFavorite, deleteItemFavorito } from "./favoritos.js";
import { getDataMovie } from "./helpers/getMovies.js";
import { paintMovie, cleanContanerMovie } from "./helpers/pain.js";
import { setError } from "./header.js";
import { getFavoritesMovies } from "./helpers/storage.js";


const containerMovie = document.querySelector(".container-movie");

//En el resultado de la búsqueda, desmarca el ícono add-favorito de la pelicula que fue eliminada de favoritos
const notSelectFavorite = (idMovie) => {
  document.querySelectorAll(".movie .fa-regular").forEach( item => {
    if(item.dataset.id === idMovie && item.classList.contains("active")){
      item.classList.remove("active");
    }
  })
}

//realiza la marca favorita
const checkFavorite = (movieId) => {
  document.querySelectorAll(".result-movies .movie").forEach(movie => {
    if(movie.dataset.id === movieId){
      movie.querySelector(".fa-regular").classList.add("active");
    }
  })
}

//verifica si en la nueva búsqueda hay alguna pelicula que ya este en favoritos para marcara como favorita;
const validaCheckfavorite = (dataMovies) => {
  let favoritesStorgage = getFavoritesMovies();
  if(favoritesStorgage.length > 0){
    dataMovies.forEach(itemD => {
      favoritesStorgage.forEach(itemF => {
        if(itemD.imdbID === itemF.id) checkFavorite(itemD.imdbID);
      })
    })
  }
}

//recibe título y realiza la solicitud de peliculas a la api;
const getDataMovies = (titleInput) => {
  cleanContanerMovie();//limpio el contenedor desde acá porque se envian los nodos de uno en uno y no en un array;
  getDataMovie(titleInput)
  .then(dataMovie => {
    if(dataMovie === undefined)setError("No hay resultados...")
    else{
      dataMovie.forEach(item => paintMovie(item))
      validaCheckfavorite(dataMovie);
    }
  })
}

const listenerResult = () => {
  containerMovie.addEventListener("click", e => {
    //add favorites;
    let element = e.target;
    if(element.classList.contains("fa-star")){
      //si la pelicula ya existe en favoritos, se sacará de la lista de favoritos;
      if(element.classList.contains("active")){
        element.setAttribute("title", "Agrega favoritos");
        deleteItemFavorito(element.dataset.id)
      }else{
      //si no esta en favoritos se agrega
        setFavorite(element);
        element.classList.add("active");
        element.setAttribute("title", "Quitar favoritos");
        document.querySelector("header .options .favorite-icon").classList.add("active");
      }
    }

    if(element.classList.contains("fa-circle-info")){
      setModal(element.dataset.id);
    }
  })
}

export { listenerResult, getDataMovies, notSelectFavorite };