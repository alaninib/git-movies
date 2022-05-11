"use strict"
import { getMovieForId } from "./helpers/getMovies.js";
import { paintModal } from "./helpers/pain.js";

let infoModal = document.querySelector(".info-modal");

// trae data para modal y lo envia a pintar
const setModal = (moveId) => {
  getMovieForId(moveId)
  .then(dataMovie => paintModal(dataMovie))
  .then(() => infoModal.classList.add("active"));
}

//escuchadores de eventos del modal
const listenerModal = () => {
  //desactiva la vista del modal haciendo click fuera del contenido de él;
  infoModal.addEventListener("click", e => {
    console.log(e.target)
    if(e.target.classList.contains("active")){
      infoModal.classList.remove("active");
    }
  })
}


export { listenerModal, setModal };