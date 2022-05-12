"use strict"

import { listenerHeader } from "./js/header.js";
import { listenerModal } from "./js/modal.js";
import { listenerFavorites, setInitialFavorites } from "./js/favoritos.js";
import { listenerResult } from "./js/resultManage.js";



const setMain = (
  () => {
    listenerResult();
    listenerHeader();
    listenerModal();
    listenerFavorites();
    setInitialFavorites();
})()
