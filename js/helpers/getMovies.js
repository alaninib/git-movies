"use strict"

//busca data según el tiítulo ingresado
const getDataMovie = async (titleMovie) => {
  try{
    const response = await fetch(`http://www.omdbapi.com/?apikey=cef468ad&s=${titleMovie}`);
    if(!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
    let data = await response.json();
    return data.Search;
  }
  catch (error) {
    console.log(error);
  }
}

//busca la data por el id enviado
const getMovieForId =  async(idMovie) => {
  try {
    let response = await fetch(`http://www.omdbapi.com/?apikey=cef468ad&i=${idMovie}`);
    if(!response.ok) throw new Error(`error: ${response.statusText} - ${response.status}`);
    else{
      let data = await response.json();
      return data;
    }
    
  } catch (error) {
    console.log(error)
  }
}

export {getDataMovie, getMovieForId};