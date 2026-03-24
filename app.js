function navegar() {
  const ruta = location.hash.replace("#", "") || "home";
  let html = "";

  if (ruta === "home") {
    html = `
      <div class="dashboard">
        <!-- Métricas -->
        <h2>Métricas</h2>
        <section class="metrics">
          <div class="metric">
            <h3>Abiertos</h3>
            <p>12</p>
          </div>
          <div class="metric">
            <h3>En Curso</h3>
            <p>2</p>
          </div>
          <div class="metric">
            <h3>Pendientes</h3>
            <p>5</p>
          </div>
          <div class="metric">
            <h3>Atendidos</h3>
            <p>8</p>
          </div>
        </section>

        <!-- Bandeja Tickets -->
        <section class="tickets">
          <div class="tickets-header">
            <h2>Bandeja Tickets</h2>
            <button class="btn-new">
              <i class="bi bi-plus-circle"></i> Nuevo ticket
            </button>
          </div>

          <table class="tickets-table">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Asunto</th>
                <th>Actualización</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>TCKT00001</td>
                <td>NO RECIBO CORREOS DE CLIENTES</td>
                <td>26/05/2023 08:14:35</td>
                <td>
                  <a href="#"><i class="bi bi-eye"></i></a>
                  <a href="#"><i class="bi bi-pencil-square"></i></a>
                </td>
              </tr>
              <tr>
                <td>TCKT00002</td>
                <td>INSTALACIÓN DE EQUIPO PARA NUEVO INGRESO</td>
                <td>26/05/2023 08:15:37</td>
                <td>
                  <a href="#"><i class="bi bi-eye"></i></a>
                  <a href="#"><i class="bi bi-pencil-square"></i></a>
                </td>
              </tr>
              <tr>
                <td>TCKT00003</td>
                <td>SAP NO PERMITE CANCELAR COMPROBANTE</td>
                <td>26/05/2023 08:16:09</td>
                <td>
                  <a href="#"><i class="bi bi-eye"></i></a>
                  <a href="#"><i class="bi bi-pencil-square"></i></a>
                </td>
              </tr>
              <tr>
                <td>TCKT00004</td>
                <td>CREACIÓN DE USUARIO PARA NUEVO INGRESO</td>
                <td>26/05/2023 08:16:36</td>
                <td>
                  <a href="#"><i class="bi bi-eye"></i></a>
                  <a href="#"><i class="bi bi-pencil-square"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    `;  
  } else if (ruta === "newticket") {
    html = "<h2>Acerca de</h2><p>Somos un equipo creando una SPA básica.</p>";
  } else if (ruta === "readticket") {
    html = "<h2>Contacto</h2><p>Escríbenos a ejemplo@correo.com</p>";
  } else if (ruta === "newuser") { 
    html = "<h2>REPORTES</h2><p>Sección no encontrada.</p>";
  } else if (ruta === "readuser") { 
    html = "<h2>CONFIGURACION</h2><p>Sección no encontrada.</p>";
  } 

  document.getElementById("contenido").innerHTML = html;
}

window.addEventListener("hashchange", navegar);
window.addEventListener("load", navegar);
