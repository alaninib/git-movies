"use strict"

const saveSearchMovie = (data) => {
  console.log(data)
  localStorage.setItem("searchMovie", JSON.stringify(data))
}

const getSearchMovie = () => {
  let dataMovies = JSON.parse(localStorage.getItem("searchMovie")) || [];
  return dataMovies.Search;
}

const saveFavorites = (favoritesMovies) => {
  localStorage.setItem("favoritesMovies", JSON.stringify(favoritesMovies))
}

const getFavoritesMovies = () => {
  let favoriteMovies = JSON.parse(localStorage.getItem("favoritesMovies")) || [];
  return favoriteMovies
}

export { saveSearchMovie, getSearchMovie, saveFavorites, getFavoritesMovies };