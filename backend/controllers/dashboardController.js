const path = require('path');

// Redirigir al dashboard si está autenticado
exports.dashboardPage = (req, res) => {
  if (!req.session.userId) {
    return res.redirect("login.html"); // Si no está autenticado, redirigir al login
  }

  // Si está autenticado, mostrar la página del dashboard
  res.sendFile(path.join(__dirname, "../frontend/pages", "dashboard.html"));
};
