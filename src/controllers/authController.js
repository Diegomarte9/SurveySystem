const bcrypt = require("bcryptjs");
const path = require("path");
const pool = require("../database/connectDB");

// Registro de usuario
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).send("El correo ya está registrado.");
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Registrar la fecha y hora actual (creación del usuario)
    const currentTimestamp = new Date();

    // Insertar el usuario en la base de datos
    await pool.query(
      "INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, $4)",
      [name, email, hashedPassword, currentTimestamp]
    );

    // Actualizar la última fecha de inicio de sesión después del registro
    await pool.query("UPDATE users SET last_login = $1 WHERE email = $2", [currentTimestamp, email]);

    // Almacenar en la sesión la información del usuario
    req.session.user = {
      id: existingUser.rows[0].id,
      name: name,
      email: email
    };

    // Redirigir al dashboard después del registro exitoso
    res.status(201).sendFile(path.join(__dirname, "..", "..", "pages", "dashboard", "dashboard.html"));
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar el usuario.");
  }
};

// Login de usuario
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario por correo
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(400).send("Credenciales incorrectas.");
    }

    // Comparar contraseñas
    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
    if (!isPasswordValid) {
      return res.status(400).send("Credenciales incorrectas.");
    }

    // Registrar la hora del último inicio de sesión
    const currentTimestamp = new Date();
    await pool.query("UPDATE users SET last_login = $1 WHERE email = $2", [currentTimestamp, email]);

    // Almacenar en la sesión la información del usuario
    req.session.user = {
      id: user.rows[0].id,
      name: user.rows[0].name,
      email: user.rows[0].email
    };

    // Redirigir al dashboard después del inicio de sesión exitoso
    res.status(200).sendFile(path.join(__dirname, "..", "..", "pages", "dashboard", "dashboard.html"));
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al iniciar sesión.");
  }
};
