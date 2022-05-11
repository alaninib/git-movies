"use strict"

const subTitle = document.querySelector(".sub-title");
const movieTemplate = document.getElementById("movie-template").content;
const favoriteTemplate = document.getElementById("favorite-template").content;
const containerMovie = document.querySelector(".container-movie");
const favoritesContainer = document.querySelector(".container-favorites");
let modal = document.querySelector(".info-modal .modal");
let fragment = document.createDocumentFragment();

const cleanContanerMovie = () => {
  containerMovie.textContent = "";
}

const paintMovie = (movieData) => {
  let {imdbID:id, Title: title, Poster: poster} = movieData;
  poster = poster.includes("N/A") ? "../img/default.png" : poster;
  let movieInfo = movieTemplate.cloneNode(true);
  movieInfo.querySelector(".movie").dataset.id = id;
  movieInfo.querySelector(".movie-poster img").setAttribute("src", `${poster}`);
  movieInfo.querySelector(".movie-poster img").setAttribute("alt", `${title.substring(0, title.indexOf(" "))}`);
  movieInfo.querySelector(".movie-title").textContent = title;
  movieInfo.querySelector(".movie-options .fa-star").dataset.id = id
  movieInfo.querySelector(".movie-options .fa-circle-info").dataset.id = id;
  fragment.appendChild(movieInfo);
  containerMovie.appendChild(fragment);
  subTitle.classList.add("active");
}

const paintModal = (movieData) => {
  let {Actors: actors, Plot: plot, Runtime: runtime, Year:year,
  Title:title, Rated:rated, Poster:poster} = movieData;
  poster = poster.includes("N/A") ? "../img/default.png" : poster;
  modal.querySelector("img").setAttribute("src", `${poster}`);
  modal.querySelector("img").setAttribute("alt", `${title ? title : "no disponible"}`);
  modal.querySelector(".modal-info__title").textContent = `${title ? title : "default"}`;
  modal.querySelector(".modal-info__year").textContent = `${year ? year : "no disponible"}`;
  modal.querySelector(".modal-minyear").textContent = `${rated ? rated : "no disponible"}`;
  modal.querySelector(".modal-info__time").textContent = `${runtime ? runtime : "no disponible"}`;
  modal.querySelector(".modal-info__desc").textContent = `${plot ? plot : "no disponible"}`;
  modal.querySelector(".modal-info__actors").textContent = `Actors: ${actors ? actors : "no disponible"}`;
}

const paintFavorites = (favoriteItem) => {
  let {id, title, poster} = favoriteItem;
  let favorite = favoriteTemplate.cloneNode(true);
  favorite.querySelector(".favorite").dataset.id = id;
  favorite.querySelector(".favorite-poster img").setAttribute("src", `${poster}`);
  favorite.querySelector(".favorite-poster img").setAttribute("alt", `${title.substring(0, title.indexOf(" "))}`);
  favorite.querySelector(".favorite-info__title").textContent = title;
  favorite.querySelector(".fa-circle-info").dataset.id = id;
  favorite.querySelector(".fa-trash-can").dataset.id = id;
  fragment.appendChild(favorite);
  favoritesContainer.appendChild(fragment);
}

export { paintMovie, paintModal, paintFavorites, cleanContanerMovie };