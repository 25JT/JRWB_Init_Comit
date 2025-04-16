
//Animaciones

AOS.init({
  duration: 1000,
  once: true, // solo se anima una vez
});


var typed = new Typed('.msjp', {
  strings: ["🧐ABRE LA PUERTA A UN NUEVO MERCADO.🧐", "🧐CON JR WEB🧐"],
  typeSpeed: 50,
  loop: true,
  cursorChar: '|',
  backDelay: 1000,
  showCursor: false,
});

//fin animaciones

//video
document.getElementsByClassName("textlog")[0].innerHTML = "JR WEB";
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

//Llamado al servidor
document.getElementById("formularioContacto").addEventListener("submit", manejarEnvioFormulario);

async function manejarEnvioFormulario(event) {
  event.preventDefault(); // Evitar el envío del formulario por defecto

  const formdata = {
    nombre: document.getElementById("nombre").value,
    prefijo: document.getElementById("prefijo").value,
    telefono: document.getElementById("telefono").value,
    correo: document.getElementById("correo").value,
    mensaje: document.getElementById("mensaje").value
  }
  const btnEnviar = document.getElementById("enviar");
//  console.log(formdata); ver el formato de los datos
  
  const url = "/api/contacto";
  const method = "POST";
  

  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata),
    });
    const data = await response.json();
    // console.log(data); datos de repsuesta servidor

    Swal.fire({
      title: data.success ? "¡Éxito!" : "Error",
      text: data.message,
      icon: data.success ? "success" : "error",
      confirmButtonText: "Aceptar",
      className: "swal-custom",
      customClass: {
        confirmButton: "btn"
      },
      
    }).then(() => {
      if (data.success) {
        document.getElementById("formularioContacto").reset(); // Resetear el formulario
      }
    });

  } catch (error) {
    console.error("Error:", error);
  }


}

//wpp

function wpp(){
  const numero = 3165491376
  
  window.open(`https://api.whatsapp.com/send?phone=57${numero}&text=Hola%20JR%20WEB,%20quiero%20más%20información%20sobre%20sus%20servicios.`, "_blank");
}



