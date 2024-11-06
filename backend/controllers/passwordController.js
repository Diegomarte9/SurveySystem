const bcrypt = require('bcrypt');
const pool = require('../models/db');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Enviar correo de recuperación de contraseña
exports.sendRecoveryEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Correo electrónico no registrado.' });
    }

    const user = result.rows[0];

    // Generar un token de recuperación único
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hora de vigencia

    // Guardar el token en la base de datos
    await pool.query(
      'UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3',
      [resetToken, resetTokenExpires, email]
    );

    // Configuración del correo
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Enviar el correo con el código
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recuperación de contraseña',
      text: `Para recuperar tu contraseña, usa el siguiente código de verificación: ${resetToken}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Código de verificación enviado a tu correo.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Hubo un error al enviar el código de verificación.' });
  }
};

// Verificar el código de recuperación
exports.verifyCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Correo electrónico no registrado.' });
    }

    const user = result.rows[0];

    if (user.reset_token !== code) {
      return res.status(400).json({ error: 'Código incorrecto.' });
    }

    if (new Date() > new Date(user.reset_token_expires)) {
      return res.status(400).json({ error: 'El código ha expirado.' });
    }

    res.status(200).json({ message: 'Código verificado correctamente.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Hubo un error al verificar el código.' });
  }
};
