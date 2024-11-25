document.addEventListener('DOMContentLoaded', () => {
    const surveyForm = document.getElementById('surveyForm');
    const questionsContainer = document.getElementById('questionsContainer');
    const addQuestionButton = document.getElementById('addQuestion');
  
    let questionCount = 0;
  
    // Agregar nueva pregunta
    addQuestionButton.addEventListener('click', () => {
      questionCount++;
  
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('form-group');
      questionDiv.id = `questionDiv_${questionCount}`;
      questionDiv.innerHTML = `
        <label for="question_${questionCount}">Pregunta ${questionCount}:</label>
        <input type="text" id="question_${questionCount}" name="question_${questionCount}" placeholder="Escribe la pregunta" required>
        <label for="type_${questionCount}">Tipo de respuesta:</label>
        <select id="type_${questionCount}" name="type_${questionCount}" required>
          <option value="text">Texto</option>
          <option value="radio">Opción única</option>
          <option value="checkbox">Múltiples opciones</option>
          <option value="number">Número</option>
        </select>
        <div id="optionsContainer_${questionCount}" class="options-container"></div>
        <button type="button" onclick="addOption(${questionCount})">Agregar Opción</button>
        <button type="button" class="delete-btn" onclick="deleteQuestion(${questionCount})">Eliminar Pregunta</button>
      `;
      questionsContainer.appendChild(questionDiv);
    });
  
    // Manejo del envío del formulario
    surveyForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const title = document.getElementById('surveyTitle').value;
      const description = document.getElementById('surveyDescription').value;
  
      const questions = [];
      for (let i = 1; i <= questionCount; i++) {
        const questionDiv = document.getElementById(`questionDiv_${i}`);
        if (!questionDiv) continue; // Ignorar preguntas eliminadas
  
        const questionText = document.getElementById(`question_${i}`).value;
        const questionType = document.getElementById(`type_${i}`).value;
        const optionsContainer = document.getElementById(`optionsContainer_${i}`);
        const options = [...optionsContainer.querySelectorAll('input')].map(input => input.value);
  
        questions.push({ questionText, questionType, options });
      }
  
      const survey = { title, description, questions };
  
      // Guardar encuesta en localStorage
      const surveys = JSON.parse(localStorage.getItem('surveys')) || [];
      surveys.push(survey);
      localStorage.setItem('surveys', JSON.stringify(surveys));
  
      alert('Encuesta guardada localmente');
      surveyForm.reset();
      questionsContainer.innerHTML = '';
      questionCount = 0;
    });
  });
  
  // Agregar opción para preguntas tipo radio o checkbox
  function addOption(questionId) {
    const optionsContainer = document.getElementById(`optionsContainer_${questionId}`);
    const optionDiv = document.createElement('div');
    optionDiv.classList.add('option-div');
    optionDiv.innerHTML = `
      <input type="text" placeholder="Escribe una opción" required>
      <button type="button" class="delete-btn" onclick="deleteOption(this)">Eliminar</button>
    `;
    optionsContainer.appendChild(optionDiv);
  }
  
  // Eliminar una opción
  function deleteOption(button) {
    const optionDiv = button.parentElement;
    optionDiv.remove();
  }
  
  // Eliminar una pregunta
  function deleteQuestion(questionId) {
    const questionDiv = document.getElementById(`questionDiv_${questionId}`);
    questionDiv.remove();
  }