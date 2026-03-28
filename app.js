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
    html = `
      <div class="ticket-wrapper">
        <h2 class="ticket-title">Nuevo Ticket</h2>
        
        <form class="ticket-form">
          <div class="form-row-2col">
            <div class="form-col">
              <div class="field-group">
                <label>Task ID:</label>
                <input type="text" value="Autogenerado" readonly class="input-bordered input-center">
              </div>
              <div class="field-group">
                <label>Type Task:</label>
                <select class="input-select"><option>Seleccione</option></select>
              </div>
              <div class="field-group">
                <label>Área:</label>
                <select class="input-select"><option>Seleccione</option></select>
              </div>
              <div class="field-group">
                <label>Usuario:</label>
                <select class="input-select"><option>Seleccione</option></select>
              </div>
            </div>
            <div class="form-col pt-empty">
              <div class="field-group">
                <label>Estado:</label>
                <select class="input-select"><option>Seleccione</option></select>
              </div>
              <div class="field-group">
                <label>Categoría:</label>
                <select class="input-select"><option>Seleccione</option></select>
              </div>
              <div class="field-group">
                <label>Sub Categoría:</label>
                <select class="input-select"><option>Seleccione</option></select>
              </div>
            </div>
          </div>

          <div class="form-row-full">
            <div class="field-group-full">
              <label>Asunto:</label>
              <input type="text" class="input-bordered">
            </div>
            <div class="field-group-full align-top">
              <label>Descripción:</label>
              <textarea rows="4" class="input-bordered"></textarea>
            </div>
          </div>

          <div class="form-row-2col mt-spacing">
            <div class="form-col">
              <div class="field-group align-top">
                <label>Nota:</label>
                <textarea rows="3" class="input-bordered"></textarea>
              </div>
              <div class="field-group">
                <label>Soporte:</label>
                <select class="input-select"><option>Seleccione</option></select>
              </div>
              <div class="field-group">
                <label>Analista:</label>
                <select class="input-select"><option>Seleccione</option></select>
              </div>
            </div>
            <div class="form-col">
              <div class="field-group">
                <label>Attachments:</label>
                <div class="attachment-box input-bordered">
                  <input type="text" readonly>
                  <i class="bi bi-paperclip"></i>
                </div>
              </div>
              <div class="field-group">
                <label>Impacto:</label>
                <select class="input-select"><option>Seleccione</option></select>
              </div>
              <div class="field-group">
                <label>Prioridad:</label>
                <select class="input-select"><option>Seleccione</option></select>
              </div>
              <div class="field-group">
                <label>Urgencia:</label>
                <select class="input-select"><option>Seleccione</option></select>
              </div>
            </div>
          </div>

          <div class="form-actions-bottom">
            <button type="button" class="btn-action btn-crear">Crear</button>
            <button type="button" class="btn-action btn-limpiar">Limpiar</button>
          </div>
        </form>
      </div>
    `;
  } else if (ruta === "readticket") {
    html = "<h2>Contacto</h2><p>Escríbenos a ejemplo@correo.com</p>";
  } else if (ruta === "newuser") { 
    html = "<h2>REPORTES</h2><p>Sección no encontrada.</p>";
  } else if (ruta === "readuser") { 
    html = `
      <div class="user-consult-container">
        <h2>Consultar Usuario</h2>
        
        <div class="user-card">
          <div class="user-avatar">
            <i class="bi bi-person-bounding-box" style="font-size: 80px; color: #87ceeb;"></i>
          </div>

          <form class="user-form">
            <div class="form-group">
              <label>Correo:</label>
              <input type="email" value="yumi.kanshiro@compu.pe" readonly>
            </div>
            
            <div class="form-group">
              <label>Perfil:</label>
              <input type="text" value="Contabilidad" readonly>
            </div>

            <div class="form-group">
              <label>Nombres:</label>
              <input type="text" value="Yumi" readonly>
            </div>

            <div class="form-group">
              <label>Apellidos:</label>
              <input type="text" value="Kanashiro Uema" readonly>
            </div>

            <div class="form-group">
              <label>Celular:</label>
              <input type="text" value="956321470">
            </div>

            <div class="form-group">
              <label>Fecha de nacimiento:</label>
              <input type="text" value="05/08/2020">
            </div>

            <div class="form-group">
              <label>Usuario:</label>
              <input type="text" value="yumi.kanashiro" readonly>
            </div>

            <div class="form-group">
              <label>Crear contraseña:</label>
              <input type="password" value="********">
            </div>

            <div class="form-group">
              <label>Repetir contraseña:</label>
              <input type="password" value="********">
            </div>

            <div class="form-actions">
              <button type="button" class="btn-action btn-blue">Buscar</button>
              <button type="button" class="btn-action btn-light-blue">Limpiar</button>
              <button type="button" class="btn-action btn-blue">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  document.getElementById("contenido").innerHTML = html;
}

window.addEventListener("hashchange", navegar);
window.addEventListener("load", navegar);
