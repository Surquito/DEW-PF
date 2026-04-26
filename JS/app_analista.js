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

  // Solo mostrar el nombre si existe
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
          <h2 class="ticket-title">Crear Usuario</h2>
          <div class="user-avatar">
            <i class="bi bi-person-bounding-box" style="font-size: 80px; color: #87ceeb;"></i>
          </div>

          <form class="user-form">
            <div class="form-group">
              <label>Correo:</label>
              <input type="email">
            </div>

            <div class="form-group">
              <label>Perfil:</label>
              <select>
                <option>SELECCIONE</option>
                <option>Analista</option>
                <option>Usuario</option>
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

            <div class="form-group">
              <label>Crear contraseña:</label>
              <input type="password">
            </div>

            <div class="form-group">
              <label>Repetir contraseña:</label>
              <input type="password">
            </div>

            <div class="form-actions">
              <button type="button" class="btn-action btn-blue">Crear</button>
              <button type="button" class="btn-action btn-blue">Limpiar</button>          
            </div>
          </form>
        </div>
      </div>  
    `;
  } else if (ruta === "readuser") { 
    html = `
      <div class="user-consult-container">      
        <div class="user-card">
          <h2 class="ticket-title">Consultar Usuario</h2>
          <div class="user-avatar">
            <i class="bi bi-person-bounding-box" style="font-size: 80px; color: #87ceeb;"></i>
          </div>

          <form class="user-form">
            <div class="form-group">
              <label>Correo:</label>
              <input type="email" value="dcaceres@empresa.pe">
            </div>
            
            <div class="form-group">
              <label>Perfil:</label>
              <select>
                <option>SELECCIONE</option>
                <option>Analista</option>
                <option>Usuario</option>
              </select>
            </div>

            <div class="form-group">
              <label>Nombres:</label>
              <input type="text" value="Daniel">
            </div>

            <div class="form-group">
              <label>Apellidos:</label>
              <input type="text" value="Cáceres Ramirez">
            </div>

            <div class="form-group">
              <label>Celular:</label>
              <input type="text" value="956321470">
            </div>

            <div class="form-group">
              <label>Fecha de nacimiento:</label>
              <input type="date">
            </div>

            <div class="form-group">
              <label>Usuario:</label>
              <input type="text" value="daniel.caceres">
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

  if (ruta === "home") {
    setTimeout(() => {
      cargarMetricas();
      cargarTickets();
    }, 0);
  }

}

window.addEventListener("hashchange", navegar);
window.addEventListener("load", navegar);

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
        CERRADO: 0   // ✅ estado real
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