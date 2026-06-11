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
                <input type="text" value="Autogenerado" readonly class="input-bordered input-center">
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
                <select class="input-select" id="area" required>
                  <option value="">SELECCIONE</option>
                </select>
              </div>
              <div class="field-group">
                <label>Usuario:</label>
                <select id="user" class="input-select" required>
                <option value="">SELECCIONE</option>
                </select>
              </div>
            </div>
            <div class="form-col pt-empty">
              <div class="field-group">
                <label>Estado:</label>
                <input id="state" type="text" value="ABIERTO" readonly class="input-bordered input-center"> 
                </div>
              <div class="field-group">
                <label>Categoría:</label>
                <select class="input-select" id="category" required>
                <option value="">SELECCIONE</option>
                </select>
              </div>
              <div class="field-group">
                <label>Sub Categoría:</label>
                <select id="subcategory" class="input-select" required><option value="">SELECCIONE</option></select>
              </div>
            </div>
          </div>
          <div class="form-row-full">
            <div class="field-group-full">
              <label>Asunto:</label>
              <input type="text" class="input-bordered" id ="subject">
            </div>
            <div class="field-group-full align-top">
              <label>Descripción:</label>
              <textarea rows="4" class="input-bordered" id="description"></textarea>
            </div>
          </div>
          <div class="form-row-2col mt-spacing">
            <div class="form-col">
              <div class="field-group align-top">
                <label>Nota:</label>
                <textarea rows="3" class="input-bordered" id="note"></textarea>
              </div>
              <div class="field-group">
                <label>Soporte:</label>
                <select class="input-select" id="level" required>
                <option value="">SELECCIONE</option>
                <option value="1">NIVEL 1</option>
                <option value="2">NIVEL 2</option>
                <OPTION value="3">NIVEL 3</option>
                </select>
              </div>
              <div class="field-group">
                <label>Analista:</label>
                <select class="input-select" id="analyst" required><option value="">SELECCIONE</option></select>
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
              <div class="field-group">
                <label>Impacto:</label>
                <select class="input-select" id="impact">
                  <option value="">SELECCIONE</option>
                  <option value="PERSONA">PERSONA</option>
                  <option value="AREA">AREA</option>
                  <option value="SERVICIO">SERVICIO</option>
                </select>
              </div>
              <div class="field-group">
                <label>Prioridad:</label>
                <select class="input-select" id="priority">
                  <option value="">SELECCIONE</option>
                  <option value="BAJA">BAJA</option>
                  <option value="MEDIA">MEDIA</option>
                  <option value="ALTA">ALTA</option>
                </select>
              </div>
              <div class="field-group" id="urgency">
                <label>Urgencia:</label>
                <select class="input-select" id="ticketUrgencia">
                  <option value="">SELECCIONE</option>
                  <option value="BAJA">BAJA</option>
                  <option value="MEDIA">MEDIA</option>
                  <option value="ALTA">ALTA</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-actions-bottom">
            <button type="button" class="btn-action btn-crear" id="btnCrearTicket">Crear</button>
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
                <input type="text" id="searchTaskID" value="" placeholder="Ej. TCKT00001" class="input-bordered input-center">
              </div>
              <div class="field-group">
                <label>Type Task:</label>
                <select disabled class="input-select" id="typeTask" required>
                  <option value="">SELECCIONE</option>
                </select>
              </div>
              <div class="field-group">
                <label>Área:</label>
                <select disabled class="input-select" id="area" required>
                  <option value="">SELECCIONE</option>
                </select>
              </div>
              <div class="field-group">
                <label>Usuario:</label>
                <select disabled class="input-select" id="user" required>
                  <option value="">SELECCIONE</option>
                </select>
                </div>
            </div>
            <div class="form-col pt-empty">
              <div class="field-group">
                <label>Estado:</label>
                <select disabled class="input-select" id="ticketEstado" required>
                  <option value="">SELECCIONE</option>
                  <option value="ABIERTO">ABIERTO</option>  
                  <option value="ASIGNADO">ASIGNADO</option>
                  <option value="EN CURSO">EN CURSO</option>
                  <option value="PENDIENTE">PENDIENTE</option>
                  <option value="TERMINADO">TERMINADO</option>
                  <option value="CERRADO">CERRADO</option>
                </select>
              </div>
              <div class="field-group">
                <label>Categoría:</label>
                <select disabled class="input-select" id="category" required>
                  <option value="">SELECCIONE</option>
                </select>
                </div>
              <div class="field-group">
                <label>Sub Categoría:</label>
                <select disabled class="input-select" id="subcategory" required>
                  <option value="">SELECCIONE</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-row-full">
            <div class="field-group-full">
              <label>Asunto:</label>
              <input type="text" class="input-bordered" value="" readonly >
            </div>
            <div class="field-group-full align-top">
              <label>Descripción:</label>
              <textarea readonly rows="4" class="input-bordered" readonly ></textarea>
            </div>
          </div>
          <div class="form-row-2col mt-spacing">
            <div class="form-col">
              <div class="field-group align-top">
                <label>Nota:</label>
                <textarea rows="3" class="input-bordered" id="ticketNota" readonly ></textarea>
              </div>
              <div class="field-group">
                <label>Soporte:</label>
                <select disabled class="input-select" id="level" required>
                  <option value="">SELECCIONE</option>
                  <option value="1">NIVEL 1</option>
                  <option value="2">NIVEL 2</option>
                  <option value="3">NIVEL 3</option>
                </select>
              </div>
              <div class="field-group">
                <label>Analista:</label>
                <select disabled class="input-select" id="analyst" required  >
                  <option value="">SELECCIONE</option>
                </select>
                </div>
            </div>
            <div class="form-col">
              <div class="field-group">
                <label>Attachments:</label>
                <div class="attachment-box input-bordered">
                  <input type="text" id="fileName" readonly style="background: transparent; cursor: default;">
                  <i class="bi bi-paperclip" id="attachIcon" style="cursor: pointer;"></i>
                </div>
              </div>
              <div class="field-group">
                <label>Impacto:</label>
                <select disabled class="input-select" id="ticketImpacto">
                  <option value="">SELECCIONE</option>
                  <option value="PERSONA">PERSONA</option>
                  <option value="AREA">AREA</option>
                  <option value="SERVICIO">SERVICIO</option>
                </select>
              </div>
              <div class="field-group">
                <label>Prioridad:</label>
                <select disabled class="input-select" id="ticketPrioridad">
                  <option value="">SELECCIONE</option>
                  <option value="BAJA">BAJA</option>
                  <option value="MEDIA">MEDIA</option>
                  <option value="ALTA">ALTA</option>
                </select>
              </div>
              <div class="field-group">
                <label>Urgencia:</label>
                <select disabled class="input-select" id="ticketUrgencia">
                  <option value="">SELECCIONE</option>
                  <option value="BAJA">BAJA</option>
                  <option value="MEDIA">MEDIA</option>
                  <option value="ALTA">ALTA</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-actions-bottom">
            <button type="button" class="btn-action btn-consultar">Consultar</button>
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
              <input type="text" readonly>
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
              <button type="button" class="btn-action btn-blue">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  document.getElementById("contenido").innerHTML = html;

/* =========================
   CARGAR ÁREAS/CATEGORIAS. SI EXISTE 'SELECT'
   ========================= */
if (document.getElementById("area")) {
  cargarAreas();
}

if (document.getElementById("category")) {
  cargarCategorias();
}

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
   MOSTRAR CATEGORIAS SUBCATEGORIAS EN EL COMBOBOX
   ========================= */
function cargarCategorias() {

  fetch(`${API}/categories`)

    .then(res => res.json())

    .then(data => {

      const select = document.getElementById("category");

      if (!select) return;   

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
   MOSTRAR ANALISTAS DE SOPORTE EN EL COMBOBOX
   ========================= */

function cargarAnalistas(codLevel) {
  fetch(`${API}/analysts-support/${codLevel}`)
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("analyst");
      if (!select) return;  

      select.innerHTML = `<option value="">SELECCIONE</option>`;
      data.forEach(a => {
        select.innerHTML += `
          <option value="${a.COD_USER}">  
            ${a.FIRST_NAME} ${a.LAST_NAME}
          </option>
        `;
      });
    })
    .catch(err => console.error("Error analistas:", err));
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
   MÉTRICAS DEL ANALISTA
   ========================= */
function cargarMetricas() {

  fetch(`${API}/analyst/metrics`)
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
    fetch(`${API}/analyst/tickets`)
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

/* =========================
   CREAR TICKET
   ========================= */
document.addEventListener("click", (e) => {
  if (e.target.id === "btnCrearTicket") {

    const data = {
      tipoTicket: document.querySelector("#typeTask").value,
      codUsuario: document.querySelector("#user").value,
      codSubCategoria: document.querySelector("#subcategory").value,
      asunto: document.getElementById("subject").value,
      descripcion: document.getElementById("description").value,
      impacto: document.getElementById("impact").value,
      prioridad: document.getElementById("priority").value,
      urgencia: document.getElementById("ticketUrgencia").value,
      codAnalista: document.getElementById("analyst").value,
      nota: document.getElementById("note").value,
      adjunto: document.getElementById("fileName").value,
    };

    fetch(`${API}/api/user/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(async res => {
      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.msg || "Error al crear ticket");
      }

      return responseData;
    })
    .then(data => {
      alert(`✅ Ticket creado: ${data.ticketId}`);
      location.hash = "home";
    })
    .catch(err => {
      console.error(err);
      alert("❌ Error: " + err.message);
    });
  }
});


/* =========================
   SUBCATEGORY POR CATEGORIA
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


/* =========================
   ANALISTAS POR NIVEL DE SOPORTE
   ========================= */
document.addEventListener("change", (e) => {
  if (e.target.id === "level") { 
    const codLevel = e.target.value;
    if (!codLevel) return;  

    cargarAnalistas(codLevel);
  }
});