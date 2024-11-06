// Función para mostrar notificaciones
function showNotification(message, type = 'success', duration = 3000) {
    const notificationElement = document.getElementById('notification');
    
    // Limpiar cualquier contenido previo
    notificationElement.innerHTML = message;
  
    // Añadir la clase de tipo (éxito, error, info)
    notificationElement.classList.remove('error', 'success', 'info');
    notificationElement.classList.add(type);
  
    // Mostrar la notificación
    notificationElement.classList.add('show');
  
    // Ocultar la notificación después de un tiempo (opcional)
    setTimeout(() => {
      notificationElement.classList.remove('show');
    }, duration); // Duración en milisegundos
}

  // Ejemplo de uso:
  showNotification('Registro exitoso!', 'success');  // Mensaje de éxito
  showNotification('Error al iniciar sesión.', 'error');  // Mensaje de error
  showNotification('Recuperación de contraseña solicitada.', 'info');  // Mensaje de información
  