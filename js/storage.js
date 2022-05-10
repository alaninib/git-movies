"use strict"

const saveSearchMovie = (data) => {
  console.log(data)
  localStorage.setItem("searchMovie", JSON.stringify(data))
}

const getSearchMovie = () => {
  let dataMovies = JSON.parse(localStorage.getItem("searchMovie")) || [];
  return dataMovies.Search;
}

export { saveSearchMovie, getSearchMovie };