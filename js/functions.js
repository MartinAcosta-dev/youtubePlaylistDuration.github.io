export const loader = (action) => {
    if(action == "show"){
        document.getElementById("loader").style.display = "block";
    }else{
        document.getElementById("loader").style.display = "none";
    }
}

export const apiKey = "AIzaSyDC3yFD2q3dXju7Bfr5xSrG2S-5AJhjTXo";


export const getDuration = async function (playlistId){

    let urlPlayList = "https://www.googleapis.com/youtube/v3/playlistItems?key="+apiKey+"&playlistId="+playlistId+"&part=snippet&maxResults=50";

    let res = await getPlaylistDuration(urlPlayList);
    
    let p = document.getElementById("result");
  
    p.innerHTML = '';
  
    p.innerHTML = res;
  
    let strHours = document.getElementById("strHours");
  
    strHours.style.display = "block";
  
}
  
  
  
const getVideosAsync = async (urlPlaylist) => {
    
    var arrayVideos = [];
  
    try {
        let resPlaylist = await fetch(urlPlaylist)
      let playlist = await resPlaylist.json();
     
      playlist.items.forEach(element => {
        arrayVideos.push(element.snippet.resourceId.videoId)
      });
  
      return arrayVideos; //Devuelve un vector lleno de IDs de videos
  
    } catch (error) {
      console.log(error)
    }
}
  
async function getArrayDurations (arreglo){
  
    var arrayDurations = [];
     
  
    for(var i=0; i<arreglo.length;i++){
  
      var videoID = arreglo[i];
  
      let urlVideo = "https://www.googleapis.com/youtube/v3/videos?key="+apiKey+"&part=contentDetails&id="+videoID;
  
      let resVideo = await fetch(urlVideo);
      let video = await resVideo.json();
  
      var duration = video.items[0].contentDetails.duration;
      
      arrayDurations.push(duration);
    }
  
    return arrayDurations;
    
}
  
  
async function getPlaylistDuration(urlPlayList){ 
    //Toma el array devuelto por getVideosAsync y por cada uno consulta a la api
  
    var totalDuration = 0;
    var videos = await getVideosAsync(urlPlayList);
  
    try {
      
      var arrayDurations = await getArrayDurations(videos);
  
      arrayDurations.forEach(element => {
        var duration = moment.duration(element); //Convertimos la duracion de iso 8006 a objeto tiempo
        duration = duration._milliseconds; //Obtenemos 
     
        totalDuration = totalDuration + duration;
  
      });
  
  
      totalDuration = moment.utc(totalDuration).format('HH:mm:ss');
      
      return totalDuration;
  
  
    } catch (error) {
      console.log(error)
    }
}
  