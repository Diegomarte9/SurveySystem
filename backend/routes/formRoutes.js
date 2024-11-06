// backend/routes/formRoutes.js
const express = require('express');
const router = express.Router();
const { createForm, addQuestion } = require('../controllers/formController');

// Ruta para crear un nuevo formulario
router.post('/forms', createForm);

// Ruta para agregar una pregunta a un formulario existente
router.post('/:formId/questions', addQuestion);

module.exports = router;
