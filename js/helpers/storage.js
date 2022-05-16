"use strict"

const saveSearchMovie = (data) => {
  console.log(data)
  localStorage.setItem("searchMovie", JSON.stringify(data))
}

const getSearchMovie = () => {
  let dataMovies = JSON.parse(localStorage.getItem("searchMovie")) || [];
  return dataMovies.Search;
}

//guarda las peliculas favoritas
const saveFavorites = (favoritesMovies) => {
  localStorage.setItem("favoritesMovies", JSON.stringify(favoritesMovies))
}

//toma las peliculas favoritas
const getFavoritesMovies = (idUser = null) => {
  let favoriteMovies = JSON.parse(localStorage.getItem("favoritesMovies")) || [];
  if(idUser){
    favoriteMovies = favoriteMovies.filter(movie => movie.id_user.toString() === idUser.toString())
  }
  return favoriteMovies
}

//guarda el usuario cuando se logea por primera ves;
const saveUserLogin = (userLogin) => {
  localStorage.setItem("userLoginMovies", JSON.stringify(userLogin));
}

//busca todos los usuarios ya logeado en el tiempo
const getAllUserLogin = () => {
  let allUserLogin = JSON.parse(localStorage.getItem("userLoginMovies")) || [];
  return allUserLogin;
}

//busca y envía usuario ya logeado en el tiempo por credenciales
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

//configura sessionStorage 
const openSession = (userActiveLogin) => {
  sessionStorage.setItem("usuarioActivo", JSON.stringify(userActiveLogin))
}

const getOpenSesion = () => {
  let openSesion = JSON.parse(sessionStorage.getItem("usuarioActivo"));
  return openSesion;
}

export { 
  saveSearchMovie, 
  getSearchMovie, 
  saveFavorites, 
  getFavoritesMovies, 
  saveUserLogin, 
  getUserLogedInTime, 
  getAllUserLogin, 
  openSession,
  getOpenSesion
};