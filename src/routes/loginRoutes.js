const express = require('express');
const path = require('path');
const router = express.Router();

// Ruta para la página de login
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'pages', 'login', 'login.html'));
});

module.exports = router;