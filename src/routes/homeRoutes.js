const express = require('express');
const path = require('path');
const router = express.Router();

// Ruta para la página de inicio (home)
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'..', '..', 'pages', 'home', 'home.html'));
});

module.exports = router;
