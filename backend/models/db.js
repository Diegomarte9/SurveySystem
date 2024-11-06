require('dotenv').config();
const { Pool } = require('pg'); // Importamos Pool del paquete pg

const pool = new Pool({
  user: process.env.DB_USER,        // Nombre de usuario
  host: process.env.DB_HOST,        // Dirección de la base de datos
  database: process.env.DB_NAME,    // Nombre de la base de datos
  password: process.env.DB_PASSWORD, // Contraseña
  port: process.env.DB_PORT,        // Puerto (usualmente 5432 para PostgreSQL)
});

module.exports = pool;