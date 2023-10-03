import {loader, getDuration} from "./functions.js"; 

const botonConsultar = document.getElementById("btnSearch");

botonConsultar.addEventListener('click', function(){
  const playlistURL = document.getElementById("inputUrl").value;

  if( playlistURL=="" ){
    return;
  }else{

    if(document.getElementById("divResult").innerHTML != ''){
      document.getElementById("divResult").style.display = "none"
      document.getElementById("divResult").innerHTML = ""
    }

    loader("show");

    const playlistId = playlistURL.split("list=")[1].split("&")[0];
  
    getDuration(playlistId);


  }
  
})


