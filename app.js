function navegar() {
  const ruta = location.hash.replace("#", "") || "home";
  let html = "";

  if (ruta === "home") {
    html = `
      <div class="home-container">
        <h2>Inicio</h2>
        <p>Bienvenido a la página principal con estilo.</p>
      </div>
    `;
  } else if (ruta === "newticket") {
    html = "<h2>Acerca de</h2><p>Somos un equipo creando una SPA básica.</p>";
  } else if (ruta === "readticket") {
    html = "<h2>Contacto</h2><p>Escríbenos a ejemplo@correo.com</p>";
  } else if (ruta === "reports") { 
    html = "<h2>REPORTES</h2><p>Sección no encontrada.</p>";
  } else if (ruta === "settings") { 
    html = "<h2>CONFIGURACION</h2><p>Sección no encontrada.</p>";
  } 

  document.getElementById("contenido").innerHTML = html;
}

window.addEventListener("hashchange", navegar);
window.addEventListener("load", navegar);
