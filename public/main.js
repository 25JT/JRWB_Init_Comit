

document.getElementsByClassName("textlog")[0].innerHTML = "JR WEB";
console.log("Hola mundo desde main.js");

function abrirvideo() {
    const video = document.getElementById('videoPlayer');
    video.currentTime = 0; // Reinicia
    video.play();
  
    const modal = new bootstrap.Modal(document.getElementById('videoModal'));
    modal.show();
  }
  

