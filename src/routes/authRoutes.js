const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Rutas de autenticación
router.post("/register", authController.register);
router.post("/login", authController.login);

// Ruta para obtener la información del usuario
router.get("/api/user", (req, res) => {
    if (req.session.user) {
      res.json(req.session.user);
    } else {
      res.status(401).json({ message: "No autenticado" });
    }
  });

// Ruta para cerrar sesión
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
      return res.status(500).send("No se pudo cerrar la sesión.");
    }
    res.redirect("/home/home.html");
  });
});

module.exports = router;
