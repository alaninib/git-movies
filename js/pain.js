"use strict"

const subTitle = document.querySelector(".sub-title");
const movieTemplate = document.getElementById("movie-template").content;
const favoriteTemplate = document.getElementById("favorite-template").content;
const movieContainer = document.querySelector(".container-movie");
const favoritesContainer = document.querySelector(".container-favorite");
let modal = document.querySelector(".info-modal .modal");
let fragment = document.createDocumentFragment();



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
  movieContainer.appendChild(fragment);
  subTitle.classList.add("active");
}

const paintModal = (movieData) => {
  let {Actors: actors, Plot: plot, Runtime: runtime, Year:year,
  Title:title, Rated:rated, Poster:poster} = movieData;
  console.log(movieData)
  poster = poster.includes("N/A") ? "../img/default.png" : poster;
  modal.querySelector("img").setAttribute("src", `${poster}`);
  modal.querySelector("img").setAttribute("alt", `${title ? title : "no existe titulo registrado"}`);
  modal.querySelector(".modal-info__title").textContent = `${title ? title : "default"}`;
  modal.querySelector(".modal-info__year").textContent = `${year}`;
  modal.querySelector(".modal-minyear").textContent = `${rated}`;
  modal.querySelector(".modal-info__time").textContent = `${runtime}`;
  modal.querySelector(".modal-info__desc").textContent = `${plot}`;
}

const paintFavorites = (favoriteItem) => {
  console.log(favoriteItem);
  let {imdbID:id, Title:title, Year:year, Poster:poster} = favoriteItem;
  let favorite = favoriteTemplate.cloneNode(true);
  favorite.querySelector("modal-info__title").textContent = title;
  favorite.querySelector("modal-info__year").textContent = year;
  favorite.querySelector("modal-minyear").textContent = year;
}

export { paintMovie, paintModal, paintFavorites };