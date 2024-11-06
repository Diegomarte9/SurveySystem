const pool = require('../models/db');

// Crear un nuevo formulario
const createForm = async (req, res) => {
  const { title, description } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO forms (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el formulario' });
  }
};

// Agregar una pregunta a un formulario
const addQuestion = async (req, res) => {
  const { formId } = req.params;
  const { question_text, question_type } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO questions (form_id, question_text, question_type) VALUES ($1, $2, $3) RETURNING *',
      [formId, question_text, question_type]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar la pregunta' });
  }
};

module.exports = {
  createForm,
  addQuestion
};
