export const loader = (action) => {
    if(action == "show"){
        document.getElementById("loader").style.display = "block";
    }else{
        document.getElementById("loader").style.display = "none";
    }
}

const showDuration = (playlistInfo) => {

  let results = `
    <div id="playlistTitle">${playlistInfo.title}</div>
    <img src="${playlistInfo.thumbnail}" alt="Playlist Thumbnail" title="Playlist Thumbnail">
    <div id="durationText">Duración:</div>
    <div id="duration">${playlistInfo.totalDuration}</div>
    <div id="labelDuration">(Horas, minutos, segundos)</div>
  `;

  loader("hide");

  document.getElementById("divResult").style.display = "block"
  document.getElementById("divResult").innerHTML = results;

}

export const apiKey = "xxx";


export const getDuration = async function (playlistId){

    let urlPlayList = "https://www.googleapis.com/youtube/v3/playlistItems?key="+apiKey+"&playlistId="+playlistId+"&part=snippet&maxResults=50";

    let playlistInfo = await getPlaylistDuration(urlPlayList);
    
    showDuration(playlistInfo)
  
}
  
  
  
const getVideosAsync = async (urlPlaylist) => {
    
  let playlistInfo = {
    "title": "",
    "thumbnail": "",
    "arrayVideos": []
  }
  
  try {
      let resPlaylist = await fetch(urlPlaylist)
      let playlist = await resPlaylist.json();
     
      playlistInfo.title = playlist.items[0].snippet.title;

      playlistInfo.thumbnail = playlist.items[0].snippet.thumbnails.high.url;

      playlist.items.forEach(element => {
        playlistInfo.arrayVideos.push(element.snippet.resourceId.videoId)
      });
  
    return playlistInfo; //Devuelve un array lleno de IDs de videos
  
    } catch (error) {
      console.log(error)
    }
}
  
async function getArrayDurations (arreglo){
  
    let arrayDurations = []; 
  
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
  
    let totalDuration = 0;
    let playlistInfo = await getVideosAsync(urlPlayList);
  
    let videos = playlistInfo.arrayVideos;

    try {
      
      let arrayDurations = await getArrayDurations(videos);
  
      arrayDurations.forEach(element => {
        let duration = moment.duration(element); //Convertimos la duracion de iso 8006 a objeto tiempo
        duration = duration._milliseconds; 
     
        totalDuration = totalDuration + duration;
  
      });
  
  
      totalDuration = moment.utc(totalDuration).format('HH:mm:ss');
    

      return ({
        "title": playlistInfo.title,
        "thumbnail": playlistInfo.thumbnail,
        "totalDuration": totalDuration        
      });
  
  
    } catch (error) {
      console.log(error)
    }
}
  