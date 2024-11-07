const bcrypt = require("bcryptjs");
const { Pool } = require("pg");
const pool = require("../models/db"); // Conexión a la base de datos

// Registrar un nuevo usuario
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validación de datos (opcional)
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Verificar si el usuario ya existe
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length > 0) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Encriptar la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10); // Encriptación con bcrypt

    // Insertar el nuevo usuario en la base de datos
    const insertResult = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id",
      [name, email, hashedPassword] // Usar la contraseña encriptada
    );

    const userId = insertResult.rows[0].id;

    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      userId: userId,
    });
  } catch (error) {
    console.error("Error en registro de usuario:", error);
    return res.status(500).json({ error: "Ocurrió un error al registrar al usuario" });
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
    const isMatch = await bcrypt.compare(password, user.password); // Comparar la contraseña encriptada

    if (!isMatch) {
      return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }

    req.session.userId = user.id; // Guardar ID del usuario en la sesión
    res.redirect("/dashboard"); // Redirigir al dashboard
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al intentar iniciar sesión" });
  }
};

// Controlador para cerrar sesión
exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error al cerrar sesión");
    }
    res.clearCookie('connect.sid');  // Eliminar la cookie de sesión en el navegador
    return res.redirect('/');  // Redirigir a la página de inicio o donde quieras
  });
};


