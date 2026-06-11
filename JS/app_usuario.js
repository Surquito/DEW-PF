const API = "http://localhost:3000"

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

  const nombre = document.getElementById("header-nombre");
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
      <div class="ticket-container">
      <div class="ticket-card">
        <h2 class="ticket-title">Nuevo Ticket</h2>
        <form class="ticket-form" id="form-newticket">
          <div class="form-row-2col">
            <div class="form-col">
              <div class="field-group">
                <label>Task ID:</label>
                <input type="text" id="nt-taskId" value="Autogenerado" readonly class="input-bordered input-center">
              </div>
              <div class="field-group">
                <label>Type Task:</label>
                <select id="typeTask" class="input-select">
                  <option value="">SELECCIONE</option>
                  <option value="INCIDENCIA">INCIDENCIA</option>  
                  <option value="SOLICITUD">SOLICITUD</option>
                </select>
              </div>
              <div class="field-group">
                <label>Área:</label>
                <select id="area" class="input-select" required>
                <option value="">SELECCIONE</option>
                </select>
              </div>
              <div class="field-group">
                <label>Usuario:</label>
                <select id="user" class="input-select"><option value="">SELECCIONE</option></select>
              </div>
            </div>
            <div class="form-col pt-empty">
              <div class="field-group">
                <label>Estado:</label>
                <input id = estado type="text" value="ABIERTO" readonly class="input-bordered input-center"> 
                </div>
              <div class="field-group">
                <label>Categoría:</label>
                <select id="category" class="input-select" required>
                <option value="">SELECCIONE</option>
                </select>
              </div>
              <div class="field-group">
                <label>Sub Categoría:</label>
                <select id="subcategory" class="input-select">
                <option value="">SELECCIONE</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-row-full">
            <div class="field-group-full">
              <label>Asunto:</label>
              <input type="text" id="matter" class="input-bordered">
            </div>
            <div class="field-group-full align-top">
              <label>Descripción:</label>
              <textarea id="description" rows="4" class="input-bordered"></textarea>
            </div>
          </div>
          <div class="form-row-2col mt-spacing">
            <div class="form-col">
              <div class="field-group align-top">
                <label>Nota:</label>
                <textarea id="ct-nota" rows="3" class="input-bordered" readonly></textarea>
              </div>
            </div>
            <div class="form-col">
              <div class="field-group">
                <label>Attachments:</label>
                <div class="attachment-box input-bordered">
                  <input type="text" id="fileName" readonly>
                  <input type="file" id="fileInput" style="display:none">
                  <i class="bi bi-paperclip" id="attachIcon"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="form-actions-bottom">
            <button type="button" id="btn-crear-nt" class="btn-action btn-crear" id="btnCrearTicket">Crear</button>
          </div>
        </form>
      </div>
      </div>
    `;
  } else if (ruta === "readticket") {
    html = `
      <div class="ticket-container">
      <div class="ticket-card">
        <h2 class="ticket-title">Consultar Ticket</h2>
        <form class="ticke
        t-form" id="form-readticket">
          <div class="form-row-2col">
            <div class="form-col">
              <div class="field-group">
                <label>Task ID:</label>
                <input type="text" id="ct-taskId" class="input-bordered input-center" placeholder="Ej. TCKT00001">
              </div>
              <div class="field-group">
                <label>Type Task:</label>
                <input type="text" id="ct-typeTask" class="input-bordered input-center" readonly>
              </div>
              <div class="field-group">
                <label>Área:</label>
                <input type="text" id="ct-area" class="input-bordered input-center" readonly>
              </div>
              <div class="field-group">
                <label>Usuario:</label>
                <input type="text" id="ct-usuario" class="input-bordered input-center" readonly>
              </div>
            </div>
            <div class="form-col pt-empty"> 
              <div class="field-group">
                <label>Estado:</label>
                <input id = estado type="text" readonly class="input-bordered input-center"> 
                </div>
              <div class="field-group">
                <label>Categoría:</label>
                <input type="text" id="category" class="input-bordered input-center"readonly>
              </div>
              <div class="field-group">
                <label>Sub Categoría:</label>
                <input type="text" id="subcategory" class="input-bordered input-center" readonly>
              </div>
            </div>
          </div>
          <div class="form-row-full">
            <div class="field-group-full">
              <label>Asunto:</label>
              <input type="text" id="ct-asunto" class="input-bordered" readonly>
            </div>
            <div class="field-group-full align-top">
              <label>Descripción:</label>
              <textarea id="ct-descripcion" rows="4" class="input-bordered" readonly></textarea>
            </div>
          </div>
          <div class="form-row-2col mt-spacing">
            <div class="form-col">
              <div class="field-group align-top">
                <label>Nota:</label>
                <textarea id="ct-nota" rows="3" class="input-bordered" readonly></textarea>
              </div>
            </div>
            <div class="form-col">
              <div class="field-group">
                <label>Attachments:</label>
                <div class="attachment-box input-bordered">
                  <input type="text" id="ct-filename" readonly>
                  <i class="bi bi-paperclip"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="form-actions-bottom">
            <button type="button" id="btn-consultar-ct" class="btn-action btn-consultar">Consultar</button>
            <button type="button" class="btn-action btn-modificar">Modificar</button>
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

          <form class="user-form" id="form-readuser">
            <div class="form-group">
              <label>Correo:</label>
              <input type="email" id="cu-correo" readonly>
            </div>
            
            <div class="form-group">
              <label>Área:</label>
              <select id="area" class="input-select">
                <option value="">SELECCIONE</option>
              </select>
            </div>

            <div class="form-group">
              <label>Nombres:</label>
              <input type="text" id="cu-nombres">
            </div>

            <div class="form-group">
              <label>Apellidos:</label>
              <input type="text" id="cu-apellidos">
            </div>

            <div class="form-group">
              <label>Celular:</label>
              <input type="text" id="cu-celular">
            </div>

            <div class="form-group">
              <label>Fecha de nacimiento:</label>
              <input type="date" id="cu-fechanac">
            </div>

            <div class="form-group">
              <label>Usuario:</label>
              <input type="text" id="cu-usuario" readonly>
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
              <button type="button" id="btn-guardar-cu" class="btn-action btn-blue">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
  // Renderizado del HTML en el contenedor principal
  document.getElementById("contenido").innerHTML = html;
  
  /* =========================
   CARGAR ÁREAS. SI EXISTE 'SELECT'
   ========================= */
  if (document.getElementById("area")) {
  cargarAreas();
  }
  
  if (document.getElementById("category")) {
  cargarCategorias();
  }

  // ==========================================
  // ASIGNACIÓN DE EVENTOS POR VISTA
  // ==========================================
  
  if (ruta === "home") {
    setTimeout(() => {
      cargarMetricas();
      cargarTickets();
    }, 0);

    const btnNewTicket = document.getElementById("newticketBtn");

    if (btnNewTicket) {
    btnNewTicket.addEventListener("click", () => {
      location.hash = "newticket";
    });
  }
  } 
}

// Inicialización de navegación mediante eventos del navegador
window.addEventListener("hashchange", navegar);
window.addEventListener("load", navegar);

  /* =========================
   ATACHMENT - SUBIR ARCHIVOS
   ========================= */

    document.addEventListener("click", (e) => {
      if (e.target.id === "attachIcon") {

        const fileInput = document.getElementById("fileInput");

        if (!fileInput) {
          console.error("No existe fileInput");
          return;
        }

        fileInput.click(); 
      }
    });

    document.addEventListener("change", (e) => {

      
      if (e.target && e.target.id === "fileInput") {

        const fileInput = e.target;
        const fileName = document.getElementById("fileName");

        if (!fileName) {
          console.error("No existe input fileName");
          return;
        }

        if (fileInput.files.length > 0) {
          fileName.value = fileInput.files[0].name; 
        } else {
          fileName.value = "";
        }
      }
    });


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

function cargarUsuarios(codArea) {

  fetch(`${API}/user/${codArea}`)
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("user");
      if (!select) return;

      select.innerHTML = `<option value="">SELECCIONE</option>`;

      data.forEach(u => {
        select.innerHTML += `
          <option value="${u.COD_USER}">
            ${u.FIRST_NAME} ${u.LAST_NAME}
          </option>
        `;
      });
    })
    .catch(err => console.error("Error usuarios:", err));
}
/* =========================
   MOSTRAR CATEGORIAS  SUBCATEGORIAS EN EL COMBOBOX
   ========================= */
function cargarCategorias() {

  fetch(`${API}/categories`)

    .then(res => res.json())

    .then(data => {

      const select = document.getElementById("category");

      select.innerHTML = `
        <option value="">
          SELECCIONE
        </option>
      `;

      data.forEach(a => {

        select.innerHTML += `
          <option value="${a.COD_CATEGORY}">
            ${a.CATEGORY_NAME}
          </option>
        `;
      });

    })

    .catch(err => console.error("Error categorías:", err));
}

function cargarSubCategorias(codCategory) {

  fetch(`${API}/subcategories/${codCategory}`)
    .then(res => res.json())
    .then(data => {

      const select = document.getElementById("subcategory");
      if (!select) return;

      select.innerHTML = `<option value="">SELECCIONE</option>`;

      data.forEach(s => {
        select.innerHTML += `
          <option value="${s.COD_CATEGORY}">
            ${s.CATEGORY_NAME}
          </option>
        `;
      });

    })
    .catch(err => console.error("Error subcategorías:", err));
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
   MÉTRICAS DEL USUARIO
   ========================= */
  function cargarMetricas() {
    const codUser = localStorage.getItem("codUser");

    fetch(`${API}/user/metrics/${codUser}`) 
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
   TICKETS DEL USUARIO
   ========================= */        
function cargarTickets() {
const codUser = localStorage.getItem("codUser");
fetch(`${API}/user/tickets/${codUser}`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("tablaTickets");
      tbody.innerHTML = "";

      data.forEach(t => {
        tbody.innerHTML += `
          <tr>
            <td>${t.TICKET_ID}</td>
            <td>${t.SUBJECT}</td>
            <td>${formatearFecha(t.UPDATE_DATE)}</td>
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




/* =========================
   SUBCATEGORY
   ========================= */
document.addEventListener("change", (e) => {
  if (e.target.id === "category") {

    const codCategory = e.target.value;

    if (!codCategory) return; 

    cargarSubCategorias(codCategory);
  }
});

/* =========================
   USUARIOS POR ÁREA
   ========================= */
document.addEventListener("change", (e) => {
  if (e.target.id === "area") {

    const codArea = e.target.value;

    if (!codArea) return; 

    cargarUsuarios(codArea);
  }
});