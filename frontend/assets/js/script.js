const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Toggle entre los formularios de login y registro
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Función para el registro
async function registerUser(event) {
    event.preventDefault();  // Prevenir el envío tradicional del formulario
    const name = document.querySelector('.sign-up input[placeholder="Nombre"]').value;
    const email = document.querySelector('.sign-up input[placeholder="Email"]').value;
    const password = document.querySelector('.sign-up input[placeholder="Contraseña"]').value;

    try {
        const response = await fetch('/register', {  // El endpoint en el backend
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            window.location.href = 'home.html'; // Redirige al login
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error(error);
    }
}

// Función para el login
async function loginUser(event) {
    event.preventDefault();  // Prevenir el envío tradicional del formulario
    const email = document.querySelector('.sign-in input[placeholder="Email"]').value;
    const password = document.querySelector('.sign-in input[placeholder="Contraseña"]').value;

    try {
        const response = await fetch('/login', {  // El endpoint en el backend
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Inicio de sesión exitoso');
            window.location.href = 'home.html';  // Redirige al home o dashboard
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error(error);
    }
}

// Event listeners para los formularios
document.getElementById('register-form').addEventListener('submit', registerUser);
document.getElementById('login-form').addEventListener('submit', loginUser);
