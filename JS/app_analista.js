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
      <div class = "ticket-container">
      <div class="ticket-card">
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
      </div>
    `;
  } else if (ruta === "readticket") {
    html = `
      <div class = "ticket-container">
      <div class="ticket-card">
        <h2 class="ticket-title">Consultar Ticket</h2>
        <form class="ticket-form" id="formEditTicket">
          <div class="form-row-2col">
            <div class="form-col">
              <div class="field-group">
                <label>Task ID:</label>
                <input type="text" id="searchTaskID" value="TKT000001" class="input-bordered input-center" readonly>
              </div>
              <div class="field-group">
                <label>Type Task:</label>
                <input type="text" class="input-bordered" value="INCIDENCIA" readonly style="background-color: #f0f0f0;">
              </div>
              <div class="field-group">
                <label>Área:</label>
                <input type="text" class="input-bordered" value="CONTABILIDAD" readonly style="background-color: #f0f0f0;">
              </div>
              <div class="field-group">
                <label>Usuario:</label>
                <input type="text" class="input-bordered" value="JUAN PEREZ" readonly style="background-color: #f0f0f0;">
              </div>
            </div>
            <div class="form-col pt-empty">
              <div class="field-group">
                <label>Estado:</label>
                <select class="input-select" id="ticketEstado">
                  <option value="Abierto" selected>Abierto</option>
                  <option value="En curso">En curso</option>
                  <option value="Atendido">Atendido</option>
                </select>
              </div>
              <div class="field-group">
                <label>Categoría:</label>
                <input type="text" class="input-bordered" value="MICROSOFT OUTLOOK" readonly style="background-color: #f0f0f0;">
              </div>
              <div class="field-group">
                <label>Sub Categoría:</label>
                <input type="text" class="input-bordered" value="INC RECEPCIÓN CORREOS" readonly style="background-color: #f0f0f0;">
              </div>
            </div>
          </div>

          <div class="form-row-full">
            <div class="field-group-full">
              <label>Asunto:</label>
              <input type="text" class="input-bordered" value="No me llegan los correos" readonly style="background-color: #f0f0f0;">
            </div>
            <div class="field-group-full align-top">
              <label>Descripción:</label>
              <textarea rows="4" class="input-bordered" readonly style="background-color: #f0f0f0;">Su gentil apoyo con el correo del cliente proveedor_coca@cocacola.com. Desde hace 3 días no puedo recibir correos.</textarea>
            </div>
          </div>
          <div class="form-row-2col mt-spacing">
            <div class="form-col">
              <div class="field-group align-top">
                <label>Nota:</label>
                <textarea rows="3" class="input-bordered" id="ticketNota">Bandeja de usuario llego al límite de la capacidad. Se crea OST para backup de correo.</textarea>
              </div>
              <div class="field-group">
                <label>Soporte:</label>
                <select class="input-select" id="ticketSoporte">
                  <option selected>NIVEL 1</option>
                  <option>NIVEL 2</option>
                  <option>NIVEL 3</option>
                </select>
              </div>
              <div class="field-group">
                <label>Analista:</label>
                <input type="text" class="input-bordered" id="ticketAnalista" value="YUMI KANASHIRO">
              </div>
            </div>
            <div class="form-col">
              <div class="field-group">
                <label>Attachments:</label>
                <div class="attachment-box input-bordered" style="background-color: #f0f0f0;">
                  <input type="text" value="SS_CORREO ERROR.PNG" readonly style="background: transparent; cursor: default;">
                 <i class="bi bi-paperclip"></i>
                </div>
              </div>
              <div class="field-group">
                <label>Impacto:</label>
                <select class="input-select" id="ticketImpacto">
                  <option selected>PERSONA</option>
                  <option>ÁREA</option>
                  <option>EMPRESA</option>
                </select>
              </div>
              <div class="field-group">
                <select class="input-select" id="ticketPrioridad">
                  <option selected>BAJA</option>
                  <option>MEDIA</option>
                  <option>ALTA</option>
                </select>
              </div>
              <div class="field-group">
                <label>Urgencia:</label>
                <select class="input-select" id="ticketUrgencia">
                  <option selected>BAJA</option>
                  <option>MEDIA</option>
                  <option>ALTA</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-actions-bottom">
            <button type="button" class="btn-action btn-consultar">Consultar</button>
            <button type="button" class="btn-action btn-limpiar">Limpiar</button>
            <button type="button" class="btn-action btn-modificar">Modificar</button>
    
          </div>
        </form>
      </div>
      </div>
    `;
 
  document.getElementById("contenido").innerHTML = html;
}

window.addEventListener("hashchange", navegar);
window.addEventListener("load", navegar);
