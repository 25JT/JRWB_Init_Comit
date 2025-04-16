import conexion from "./public/conexion.js";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// Configuración para usar __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Ruta principal
app.get('/', function (req, res) {
    res.render('index', { message: 'Datos insertados correctamente.' });
});

// ✅ Nueva ruta para servir videos con soporte de rangos
app.get('/videos/:videoName', (req, res) => {
    const videoPath = path.join(__dirname, 'public', 'videos', req.params.videoName);

    if (!fs.existsSync(videoPath)) {
        return res.status(404).send('Video no encontrado');
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        if (start >= fileSize) {
            res.status(416).send('Requested range not satisfiable');
            return;
        }

        const chunkSize = end - start + 1;
        const file = fs.createReadStream(videoPath, { start, end });

        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4',
        });

        file.pipe(res);
    } else {
        res.writeHead(200, {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        });
        fs.createReadStream(videoPath).pipe(res);
    }
});


app.post("/api/contacto", (req, res) => {

    const datos = req.body;
    
    let nombre = datos.nombre;
    let prefijo = datos.prefijo;
    let telefono = datos.telefono;
    let correo = datos.correo;
    let mensaje = datos.mensaje;
    console.log(typeof telefono);
    

    // Validar los datos recibidos

    telefono = Number.parseInt(telefono); // Convertir a número entero
    if (isNaN(telefono)) {
        console.error("El teléfono no es un número válido.");
        return res.status(400).json({ success: false, message: "El teléfono no es un número válido." });
    }
    if (!nombre || !prefijo || !telefono || !correo || !mensaje) {
        console.error("Todos los campos son obligatorios.");
        return res.status(400).json({ success: false, message: "Todos los campos son obligatorios." });
    } 

    let sql = `INSERT INTO cliente (NombreC, Prefijo, Telefono, Correo, Mjs) VALUES (?, ?, ?, ?, ?)`;
    let values = [nombre, prefijo, telefono, correo, mensaje];

    conexion.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al insertar datos:", error);
            return res.status(500).json({ success: false, message: "Error al insertar datos" });
        }
        console.log("Datos insertados correctamente.");
        return res.status(200).json({ success: true, message: "Datos insertados correctamente." });
    });

})





// Inicia servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});


// // consulta de prueba 
// conexion.query('SELECT * FROM cliente', (error, results) => {
//     if (error) throw error;
//     console.log("consutla de pruena exitosa");
    
//     console.log(results); // Muestra los resultados en la consola
//   })