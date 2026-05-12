const API = "http://localhost:3000";

/* =========================
   FORZAR HOME AL CARGAR
   ========================= */
if (!location.hash) {
  location.hash = "#home";
}
 
/* =========================
   CARGAR USUARIO LOGUEADO
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const codUser = localStorage.getItem("codUser");

  const nombre = document.getElementById("nombreAnalista");
  if (nombre && codUser) {
    nombre.textContent = codUser;
  }
});

/* =========================
   NAVEGACIÓN
   ========================= */
function navegar() {
  const ruta = location.hash.replace("#", "") || "home";
  let html = "";

  if (ruta === "home") {
    html = `
      <div class="dashboard">
        <h2>Métricas</h2>
        <div class="metrics">
          <div class="metric">
            <h3>Abiertos</h3>
            <p id="mAbiertos">0</p>
          </div>
          <div class="metric">
            <h3>En Curso</h3>
            <p id="mCurso">0</p>
          </div>
          <div class="metric">
            <h3>Pendientes</h3>
            <p id="mPendientes">0</p>
          </div>
          <div class="metric">
            <h3>Atendidos</h3>
            <p id="mAtendidos">0</p>
          </div>
        </div>

        <div class="tickets-header">
          <h2>Bandeja de Tickets</h2>
             <button class="btn-new" id="newticketBtn">
             <i class="bi bi-plus-circle"></i> Nuevo ticket
            </button>
        </div>

        <table class="tickets-table">
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Asunto</th>
              <th>Fecha</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody id="tablaTickets"></tbody>
        </table>

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
                <input type="text" value="Autogenerado" disabled class="input-bordered input-center">
              </div>
              <div class="field-group">
                <label>Type Task:</label>
                <select class="input-select"><option>Seleccione</option></select>
              </div>
              <div class="field-group">
                <label>Área:</label>
                <select class="input-select" id="area" required>
                  <option value="">Seleccione</option>
                </select>
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
                  <input type="text" disabled>
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
                <input type="text" id="searchTaskID" value="TKT000001" class="input-bordered input-center" disabled>
              </div>
              <div class="field-group">
                <label>Type Task:</label>
                <input type="text" class="input-bordered" value="INCIDENCIA" disabled style="background-color: #f0f0f0;">
              </div>
              <div class="field-group">
                <label>Área:</label>
                <select id="area" required>
                  <option value="">Seleccione</option>
                </select>
              </div>
              <div class="field-group">
                <label>Usuario:</label>
                <input type="text" class="input-bordered" value="JUAN PEREZ" disabled style="background-color: #f0f0f0;">
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
                <input type="text" class="input-bordered" value="MICROSOFT OUTLOOK" disabled style="background-color: #f0f0f0;">
              </div>
              <div class="field-group">
                <label>Sub Categoría:</label>
                <input type="text" class="input-bordered" value="INC RECEPCIÓN CORREOS" disabled style="background-color: #f0f0f0;">
              </div>
            </div>
          </div>

          <div class="form-row-full">
            <div class="field-group-full">
              <label>Asunto:</label>
              <input type="text" class="input-bordered" value="No me llegan los correos" disabled style="background-color: #f0f0f0;">
            </div>
            <div class="field-group-full align-top">
              <label>Descripción:</label>
              <textarea rows="4" class="input-bordered" disabled style="background-color: #f0f0f0;">Su gentil apoyo con el correo del cliente proveedor_coca@cocacola.com. Desde hace 3 días no puedo recibir correos.</textarea>
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
                  <input type="text" value="SS_CORREO ERROR.PNG" disabled style="background: transparent; cursor: default;">
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
  } else if (ruta === "newuser") { 
    html = `
      <div class="user-consult-container">
        <div class="user-card">
          <h2 class="ticket-title">Nuevo Usuario</h2>
          <div class="user-avatar">
            <i class="bi bi-person-bounding-box" style="font-size: 120px; color: #87ceeb;"></i>
          </div>

          <form class="user-form">
            <div class="form-group">
              <label>Correo:</label>
              <input type="email">
            </div>
            
            <div class="form-group">
              <label>Área:</label>
              <select id="area" required>
                <option value="">SELECCIONE</option>
              </select>
            </div>

            <div class="form-group">
              <label>Nombres:</label>
              <input type="text">
            </div>

            <div class="form-group">
              <label>Apellidos:</label>
              <input type="text">
            </div>

            <div class="form-group">
              <label>Celular:</label>
              <input type="text">
            </div>

            <div class="form-group">
              <label>Fecha de nacimiento:</label>
              <input type="date">
            </div>

            <div class="form-group">
              <label>Usuario:</label>
              <input type="text">
            </div>

            <div class="form-group password-group">
              <label>Nueva contraseña:</label>
              <input type="password" id="cu-pass1">
              <button
                type="button"
                class="togglePassword"
                onclick="alternarContrasena('cu-pass1', 'togglePasswordIcon')">
                <i class="bi bi-eye" id="togglePasswordIcon"></i>
              </button>
            </div>

            <div class="form-group password-group">
              <label>Repetir contraseña:</label>
              <input type="password" id="cu-pass2">
              <button
                  type="button"
                  class="togglePassword"
                  aria-label="Mostrar u ocultar contraseña"
                  onclick="alternarContrasena('cu-pass2', 'togglePasswordIcon')">
                  <i class="bi bi-eye" id="togglePasswordIcon2"></i>
              </button>
            </div>

            <div class="form-actions">
              <button type="button" class="btn-action btn-blue" onclick="validarFormulario()">Crear</button>
              <button type="button" class="btn-action btn-blue" onclick="limpiarFormulario()">Limpiar</button>          
            </div>
          </form>
        </div>
      </div>  
    `;
  } else if (ruta === "readuser") { 
    html = `
      <div class="user-consult-container">     
        <div class="user-card">
        <h2 class="ticket-title">Mi Perfil</h2>
          <div class="user-avatar">
            <i class="bi bi-person-bounding-box" style="font-size: 120px; color: #87ceeb;"></i>
          </div>

          <form class="user-form">
            <div class="form-group">
              <label>Correo:</label>
              <input type="email">
            </div>
            
            <div class="form-group">
              <label>Área:</label>
              <select id="area" required>
                <option value="">SELECCIONE</option>
              </select>
            </div>

            <div class="form-group">
              <label>Nombres:</label>
              <input type="text">
            </div>

            <div class="form-group">
              <label>Apellidos:</label>
              <input type="text">
            </div>

            <div class="form-group">
              <label>Celular:</label>
              <input type="text">
            </div>

            <div class="form-group">
              <label>Fecha de nacimiento:</label>
              <input type="date" id="cu-fechanac">
            </div>

            <div class="form-group">
              <label>Usuario:</label>
              <input type="text" disabled>
            </div>

            <div class="form-group password-group">
              <label>Nueva contraseña:</label>
              <input type="password" id="cu-pass1">
              <button
                type="button"
                class="togglePassword"
                onclick="alternarContrasena('cu-pass1', 'togglePasswordIcon')">
                <i class="bi bi-eye" id="togglePasswordIcon"></i>
              </button>
            </div>

            <div class="form-group password-group">
              <label>Repetir contraseña:</label>
              <input type="password" id="cu-pass2">
              <button
                  type="button"
                  class="togglePassword"
                  aria-label="Mostrar u ocultar contraseña"
                  onclick="alternarContrasena('cu-pass2', 'togglePasswordIcon')">
                  <i class="bi bi-eye" id="togglePasswordIcon"></i>
              </button>
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

  if (ruta === "home") {
    setTimeout(() => {
      cargarMetricas();
      cargarTickets();
    }, 0);
        const btnNewTicket = document.getElementById("newticketBtn");
    if (btnNewTicket) {
      btnNewTicket.addEventListener("click", () => location.hash = "newticket");
    }
  }

}

window.addEventListener("hashchange", navegar);
window.addEventListener("load", navegar);


/* =========================
   MOSTRAR ÁREAS EN EL COMBOBOX
   ========================= */
function cargarAreas() {

  fetch(`${API}/areas`)

    .then(res => res.json())

    .then(data => {

      const select = document.getElementById("area");

      select.innerHTML = `
        <option value="">
          SELECCIONE
        </option>
      `;

      data.forEach(a => {

        select.innerHTML += `
          <option value="${a.COD_AREA}">
            ${a.AREA}
          </option>
        `;
      });

    })

    .catch(err => console.error("Error áreas:", err));
}

/* =========================
   OCULTAR/ MOSTRAR CONTRASEÑA
   ========================= */
function alternarContrasena(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);

  if (!input || !icon) return;

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("bi-eye");
    icon.classList.add("bi-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("bi-eye-slash");
    icon.classList.add("bi-eye");
  }
}

/* =========================
   VALIDACION ANTES CREAR USUARIO
   ========================= */
function validarFormulario() {

  const form = document.getElementById("userForm");

  // Obtener todos los inputs y selects
  const campos = form.querySelectorAll("input, select");

  // Validar campos vacíos
  for (let campo of campos) {

    if (campo.value.trim() === "") {

      alert("Todos los campos son obligatorios.");

      campo.focus();

      return false;
    }
  }

  // Validar contraseñas
  const pass1 = document.getElementById("cu-pass1").value;
  const pass2 = document.getElementById("cu-pass2").value;

  if (pass1 !== pass2) {

    alert("Las contraseñas no coinciden.");

    return false;
  }

  // Si todo está correcto
  alert("Usuario creado correctamente.");

  // Aquí puedes llamar tu función AJAX/fetch
  limpiarFormulario();

  return true;
}

/* =========================
   LIMPIAR FORMULARIO
   ========================= */
function limpiarFormulario() {

  // Obtener formulario
  const form = document.getElementById("userForm");

  // Limpiar todos los campos
  form.reset();

  // Opcional: regresar foco al primer campo
  document.getElementById("correo").focus();
}


/* =========================
   MÉTRICAS DEL ANALISTA
   ========================= */
function cargarMetricas() {
  const codUser = localStorage.getItem("codUser");

  fetch(`${API}/analyst/metrics/${codUser}`)
    .then(res => res.json())
    .then(data => {

      const estados = {
        ABIERTO: 0,
        EN_CURSO: 0,
        PENDIENTE: 0,
        CERRADO: 0   // 
      };

      data.forEach(e => {
        estados[e.STATUS] = e.TOTAL;
      });

      document.getElementById("mAbiertos").textContent   = estados.ABIERTO;
      document.getElementById("mCurso").textContent      = estados.EN_CURSO;
      document.getElementById("mPendientes").textContent = estados.PENDIENTE;
      document.getElementById("mAtendidos").textContent  = estados.CERRADO; 
    })
    .catch(err => console.error("Error métricas:", err));
}

/* =========================
   TICKETS DEL ANALISTA
   ========================= */
function cargarTickets() {
  const codUser = localStorage.getItem("codUser");

  fetch(`${API}/analyst/tickets/${codUser}`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("tablaTickets");
      tbody.innerHTML = "";

      data.forEach(t => {
        tbody.innerHTML += `
          <tr>
            <td>${t.TICKET_ID}</td>
            <td>${t.SUBJECT}</td>
            <td>${formatearFecha(t.CREATE_DATE)}</td>
            <td>
              <i class="bi bi-eye"></i>
              <i class="bi bi-pencil"></i>
            </td>
          </tr>
        `;
      });
    })
    .catch(err => console.error("Error tickets:", err));
}

/* =========================
   FORMATEAR FECHA
   ========================= */
function formatearFecha(fecha) {
  const f = new Date(fecha);
  return f.toLocaleDateString() + " " + f.toLocaleTimeString();
}

/* =========================
   CARGAR ÁREAS EN EL COMBOBOX
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  cargarAreas();
});

/* =========================
   LOGOUT
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "login.html";
    });
  }
});