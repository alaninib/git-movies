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

const saveUserLogin = (userLogin) => {
  localStorage.setItem("userLoginMovies", JSON.stringify(userLogin));
}

const getAllUserLogin = () => {
  let allUserLogin = JSON.parse(localStorage.getItem("userLoginMovies")) || [];
  return allUserLogin;
}

const getUserLogedInTime = (usuario, password) => {
  let userFound;
  let userLoged = JSON.parse(localStorage.getItem("userLoginMovies")) || [];
  if(userLoged.length > 0){
    userLoged.forEach(item => {
      if(item.usuario === usuario && item.password === password) userFound = item;
    })
  }
  return userFound;
}

export { saveSearchMovie, getSearchMovie, saveFavorites, getFavoritesMovies, saveUserLogin, 
  getUserLogedInTime, getAllUserLogin };