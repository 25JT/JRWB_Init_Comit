import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export function envcorreo(asunto, mensaje) {

  // Configura el transporter con tu correo
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.correo,
      pass: process.env.contrasegmail // No uses tu contraseña normal
    },
  });


  // Define el mensaje
  const mailOptions = {
    from: process.env.correo,
    to: process.env.correo,
    subject: asunto,
    text: mensaje,
  };

  // Envía el correo
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('❌ Error al enviar el correo');
    } else {
      log('✅ Correo enviado');

    }
  });
}