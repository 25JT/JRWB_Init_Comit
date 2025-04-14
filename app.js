import  conexion  from "./public/conexion.js";
import express from "express";



const app = express();
const port = 3000; 

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get('/', function (req, res) {
    res.render('index', { message: 'Datos insertados correctamente.'});
});


//inicia servidor

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});


// // consulta de prueba 
// conexion.query('SELECT * FROM cliente', (error, results) => {
//     if (error) throw error;
//     console.log("consutla de pruena exitosa");
    
//     console.log(results); // Muestra los resultados en la consola
//   })