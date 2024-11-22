require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
const pool = require("./src/database/connectDB");
const homeRoutes = require("./src/routes/homeRoutes");
const loginRoutes = require("./src/routes/loginRoutes");
const authRoutes = require("./src/routes/authRoutes");
const app = express();

// Middleware de sesión
app.use(session({
  secret: "SECRET1234",
  resave: false,
  saveUninitialized: true,
}));

// Middleware para parsear JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});

// Servir archivos estáticos globalmente en la carpeta pages
app.use(express.static(path.join(__dirname, "pages")));

// Usar las rutas definidas en otros archivos
app.use("/", homeRoutes);
app.use("/login", loginRoutes);
app.use("/", authRoutes);

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
