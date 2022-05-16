"use strict"

import { listenerHeader, sendToPaintUserLogin } from "./js/header.js";
import { listenerModal } from "./js/modal.js";
import { listenerFavorites, setInitialFavorites, getUserIdSession } from "./js/favoritos.js";
import { listenerResult } from "./js/resultManage.js";



const setMain = (
  () => {
    getUserIdSession();
    setInitialFavorites();
    sendToPaintUserLogin();
    listenerResult();
    listenerHeader();
    listenerModal();
    listenerFavorites();
})()
