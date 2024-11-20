require("dotenv").config();
const express = require("express");
const path = require("path");
const pool = require("./src/database/connectDB");
const homeRoutes = require("./src/routes/homeRoutes");
const loginRoutes = require("./src/routes/loginRoutes");
const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "pages")));

// Usar las rutas definidas en otros archivos
app.use("/", homeRoutes);  // Para la página principal
app.use("/login", loginRoutes);

// Iniciar el servidor en el puerto especificado
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Ruta para verificar la conexión a la base de datos
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`Conexión exitosa a la base de datos: ${result.rows[0].now}`);
  } catch (err) {
    res.status(500).send("Error al ejecutar la consulta a la base de datos");
    console.error(err.stack);
  }
});

// Cerrar el servidor y la conexión a la base de datos cuando el proceso finalice
process.on("SIGINT", async () => {
  try {
    await pool.end();
    console.log("Conexión cerrada a la base de datos PostgreSQL");
    process.exit();
  } catch (err) {
    console.error("Error al cerrar la conexión:", err.stack);
    process.exit(1);
  }
});
