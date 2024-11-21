-- Tabla de usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY, -- Identificador único del usuario
    name VARCHAR(100) NOT NULL, -- Nombre del usuario
    email VARCHAR(100) UNIQUE NOT NULL, -- Email único
    password VARCHAR(255) NOT NULL, -- Contraseña (encriptada)
    is_verified BOOLEAN DEFAULT FALSE, -- Estado de verificación del correo
    verification_token VARCHAR(6), -- Código de verificación por email
    verification_token_expires_at TIMESTAMP, -- Fecha de expiración del código de verificación
    reset_password_token VARCHAR(255), -- Token para restablecer la contraseña
    reset_password_expires_at TIMESTAMP, -- Fecha de expiración del token de restablecimiento
    last_login TIMESTAMP, -- Fecha y hora del último inicio de sesión
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación del registro
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
