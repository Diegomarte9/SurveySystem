const { Client } = require('pg');

// Configuración para conectar a PostgreSQL (base de datos predeterminada del sistema)
const initialClient = new Client({
  user: 'DiegoMarte', // Usuario de PostgreSQL
  host: 'localhost',  // Host del servidor PostgreSQL
  password: '251105', // Contraseña del usuario
  port: 5432,         // Puerto por defecto
  database: 'postgres', // Base de datos predeterminada del sistema
});

// Script para crear la base de datos y ingresar las tablas
const createDatabaseAndTables = async () => {
  try {
    // Conectar al servidor PostgreSQL
    await initialClient.connect();
    console.log('Conectado al servidor PostgreSQL.');

    // Intentar crear la base de datos
    try {
      await initialClient.query('CREATE DATABASE SurveySystem1');
      console.log('Base de datos "SurveySystem1" creada exitosamente.');
    } catch (err) {
      // Si la base de datos ya existe, mostrar un mensaje
      if (err.code === '42P04') {
        console.log('La base de datos "SurveySystem1" ya existe.');
      } else {
        throw err;
      }
    }

    // Cerrar conexión al servidor inicial
    await initialClient.end();

    // Configurar conexión a la nueva base de datos
    const dbClient = new Client({
      user: 'tu_usuario', //  (Recuerda que estas seran las credenciales con las que crearas tu base de datos, estos datos debes de configurarlos en tu archivo .env)
      host: 'localhost',
      password: 'tu_contraseña',
      port: 5432,
      database: 'SurveySystem', // No cambiar esto
    });

    // Conectar a la nueva base de datos
    await dbClient.connect();
    console.log('Conectado a la base de datos "SurveySystem".');

    // Crear las tablas
    await dbClient.query(createTablesScript);
    console.log('Tablas creadas exitosamente.');

    // Cerrar la conexión
    await dbClient.end();
  } catch (err) {
    console.error('Error:', err.message);
  }
};

// Script para crear las tablas
const createTablesScript = `
  -- Tabla de usuarios
  CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      is_verified BOOLEAN DEFAULT FALSE,
      verification_token VARCHAR(6),
      verification_token_expires_at TIMESTAMP,
      reset_password_token VARCHAR(255),
      reset_password_expires_at TIMESTAMP,
      last_login TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- Tabla de formularios
  CREATE TABLE forms (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- Tabla de preguntas
  CREATE TABLE questions (
      id SERIAL PRIMARY KEY,
      form_id INTEGER REFERENCES forms(id) ON DELETE CASCADE,
      question_text TEXT NOT NULL,
      question_type VARCHAR(50) NOT NULL
  );

  -- Tabla de opciones para preguntas de tipo radio o checkbox
  CREATE TABLE options (
      id SERIAL PRIMARY KEY,
      question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
      option_text VARCHAR(255) NOT NULL
  );

  -- Tabla de respuestas de formularios
  CREATE TABLE responses (
      id SERIAL PRIMARY KEY,
      form_id INTEGER REFERENCES forms(id) ON DELETE CASCADE,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- Tabla de respuestas para cada pregunta específica
  CREATE TABLE answers (
      id SERIAL PRIMARY KEY,
      response_id INTEGER REFERENCES responses(id) ON DELETE CASCADE,
      question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
      answer_text TEXT
  );
`;

// Ejecutar el script
createDatabaseAndTables();
