const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const pool = require('../models/db'); // Conexión a la base de datos

// Registrar un nuevo usuario
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verificar si el correo ya está registrado
    const emailCheckQuery = "SELECT * FROM users WHERE email = $1";
    const emailCheckResult = await pool.query(emailCheckQuery, [email]);

    if (emailCheckResult.rows.length > 0) {
      return res.status(400).json({ error: "Este correo electrónico ya está registrado" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar usuario en la base de datos
    const insertUserQuery = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id";
    const result = await pool.query(insertUserQuery, [name, email, hashedPassword]);

    // Crear sesión para el usuario
    req.session.userId = result.rows[0].id;
    res.redirect("/dashboard"); // Redirigir al dashboard
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al registrar el usuario" });
  }
};

// Iniciar sesión de usuario
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userQuery = "SELECT * FROM users WHERE email = $1";
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }

    // Iniciar sesión y redirigir
    req.session.userId = user.id;
    res.redirect("/dashboard"); // Redirigir al dashboard
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al intentar iniciar sesión" });
  }
};

// Cerrar sesión de usuario
exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('No se pudo cerrar la sesión.');
    }
    res.redirect('/home.html'); // Redirigir a la página de inicio
  });
};