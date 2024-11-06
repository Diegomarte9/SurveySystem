require('dotenv').config();  // Cargar las variables de entorno del archivo .env
const express = require('express');
const session = require('express-session');
const sessionSecret = process.env.SESSION_SECRET;
const path = require('path');
const pool = require('./models/db');  // Importar la configuración de la base de datos
const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');
const passwordController = require('./controllers/passwordController');

const app = express();

// Middleware para parsear el cuerpo de las peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de sesiones
app.use(session({
  secret: sessionSecret,  // Aquí estamos utilizando la clave secreta cargada desde el .env
  resave: false,
  saveUninitialized: true,
}));

// Rutas para login y registro
app.post('/login', authController.loginUser);
app.post('/register', authController.registerUser);
app.post('/logout', authController.logoutUser);

// Ruta para dashboard
app.get('/dashboard', dashboardController.dashboardPage);

// Rutas para recuperación de contraseña
app.post('/send-recovery-email', passwordController.sendRecoveryEmail);
app.post('/verify-code', passwordController.verifyCode);

// Servir archivos estáticos (para frontend)
app.use(express.static(path.join(__dirname, 'frontend')));

// Conexión a la base de datos (verificación)
pool.connect()
  .then(client => {
    console.log("Conexión exitosa a la base de datos PostgreSQL");
    client.release();  // Liberar el cliente después de la verificación
  })
  .catch(err => {
    console.error("Error de conexión a la base de datos:", err.message);
  });

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
