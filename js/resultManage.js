"use strict"

import { setModal } from "./modal.js";
import { setFavorite } from "./favoritos.js";
import { getDataMovie } from "./helpers/getMovies.js";
import { paintMovie, cleanContanerMovie } from "./helpers/pain.js";
import { setError } from "./header.js";


const containerMovie = document.querySelector(".container-movie");

const getDataMovies = (titleInput) => {
  cleanContanerMovie();//limpio el contenedor desde acá porque se envian los nodos de uno en uno y no en un array;
  getDataMovie(titleInput)
  .then(dataMovie => {
    if(dataMovie === undefined)setError("No hay resultados...")
    else{
      dataMovie.forEach(item => paintMovie(item))
    }
  })
}

!__TENGO que validar que los items de las siguientes busquedas coincidan con los del carrito para marcarlos como favoritos

const listenerResult = () => {
  containerMovie.addEventListener("click", e => {
    //add favorites;
   let element = e.target;
   if(element.classList.contains("fa-regular")){
     element.classList.toggle("active");
   }

   if(element.classList.contains("fa-star")){
     setFavorite(element);
     document.querySelector("header .options .favorite-icon").classList.add("active");
   }

   if(element.classList.contains("fa-circle-info")){
     setModal(element.dataset.id);
   }
 })
}

export { listenerResult, getDataMovies };