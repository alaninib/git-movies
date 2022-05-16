"use strict"

import { 
  getUserLogedInTime, 
  saveUserLogin, 
  getAllUserLogin, 
  openSession } from "./js/helpers/storage.js";

const formulario = document.getElementById("form");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const allImgLogin = document.querySelectorAll(".gallery-users__item img");
let allUser = [];

//captura la imagen de login seleccionada
const getImgLoginSelected = () => {
  let imgSelected = formulario.querySelector(".gallery-users__item img.active").src;
  console.log(imgSelected)
  imgSelected = imgSelected.substring(imgSelected.indexOf("/img"), imgSelected.length);
  return imgSelected;
}

//captura datos del usuario
const setDataUser = () => {
  let formData = new FormData(formulario);
  let userDataObj = {};
  for(let item of formData){
    userDataObj[item[0]] = item[1];
  }
  userDataObj["id"] = Date.now();
  return userDataObj;
}

//valida si usario ya se ha logeado en el tiempo
const isUserExist = (dataUser) => {
  let {usuario, password} = dataUser;
  let userExist = getUserLogedInTime(usuario, password)
  if(userExist) return userExist;
}


//
const userActive = () => {
  let dataUser = setDataUser();
  let isUser = isUserExist(dataUser);
  let userActiveLogin;

  if(!isUser){
    //si el usuario no existe lo guarda y configura variable para abrir session
    allUser = [...allUser, dataUser];
    saveUserLogin(allUser);
    userActiveLogin = dataUser;
  }else{
    //si el usuario existe no guarda y configura variable para abrir session
    userActiveLogin = isUser;
  }
  userActiveLogin.img = getImgLoginSelected();
  openSession(userActiveLogin);
  window.location.href = "./paginas/buscaPeliculas.html"
}

//setea campo incorrecto
const setErrorLogin = (element) => {
  element.parentNode.classList.add("error");
}

//setea campo correcto
const setSuccessLogin = (element) => {
  element.parentNode.classList.remove("error");
}

//verifica campos exitosos
const isInputValid = () => {
  let status = true;
  formulario.querySelectorAll(".form-group").forEach(item => {
    if(item.classList.contains("error")) status = false;
  });
  return status;
}

//valida campos vacios
const validInput = () => {
  if(usuario.value.trim() === "" && password.value.trim() === ""){
    [usuario, password].forEach(item => setErrorLogin(item));
    return;
  }

  if(usuario.value.trim() === ""){
    setErrorLogin(usuario);
    return;
  }else{
    setSuccessLogin(usuario);
  }

  if(password.value.trim() === ""){
    setErrorLogin(password);
    return;
  }else{
    setSuccessLogin(password);
  }
}

//activa imagen de login seleccionada
const activeImgLogin = (image) => {
  allImgLogin.forEach(item => {
    console.log(item);
    item.classList.remove("active")
    console.log(item);
  });
  image.classList.add("active");
}

//eventos con escuchadores
const listenerLogin = () => {
  //imagen de para login
  allImgLogin.forEach(item => {
    item.addEventListener("click", e => {
      activeImgLogin(e.target);
    })
  })

  //enviar formulario
  formulario.addEventListener("submit", e => {
    e.preventDefault();
    validInput();
    if(isInputValid()) userActive();
  })
}

//setea la variable global "allUser" con los usuario que ya se han logeado
const getAllUsersLogin = () => {
  let usersFromLocal = getAllUserLogin();
  if(usersFromLocal.length > 0){
    allUser = getAllUserLogin();
  }
}

const mainLogin = (
  () => {
    getAllUsersLogin();
    listenerLogin();
  }
)()