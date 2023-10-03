import {loader, getDuration} from "./functions.js"; 

const botonConsultar = document.getElementById("btnSearch");

botonConsultar.addEventListener('click', function(){
  const playlistURL = document.getElementById("inputUrl").value;

  if( playlistURL=="" ){
    return;
  }else{
    loader("show");

    const playlistId = playlistURL.split("list=")[1].split("&")[0];
  
    getDuration(playlistId);
  
    //loader("hide")
  }
  
})


