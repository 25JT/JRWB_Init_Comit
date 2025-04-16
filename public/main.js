AOS.init({
  duration: 1000,
  once: true, // solo se anima una vez
});

document.getElementsByClassName("textlog")[0].innerHTML = "JR WEB";
console.log("Hola mundo desde main.js");

function abrirvideo(elementoVideo) {
  const ruta = elementoVideo.getAttribute("src"); // Captura el src del video clickeado
  const video = document.getElementById('videoPlayer'); // El del modal

  

  video.src = ruta;
  video.load();
  video.currentTime = 0;
  video.play();

  const modal = new bootstrap.Modal(document.getElementById('videoModal'));
  modal.show();
}





