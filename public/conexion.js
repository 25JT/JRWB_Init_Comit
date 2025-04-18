import mysql from 'mysql2';
import dotenv from 'dotenv';



dotenv.config();

const conexion = mysql.createConnection({
    host: process.env.host,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
    port: process.env.port
})

export default conexion;

conexion.connect(function (error) {
    if (error) {
        console.log("fallo en la conexion " + error);
    } else {
        console.log("conexion exitosa");

    }
});

