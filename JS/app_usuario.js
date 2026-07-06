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
                <input id="state" type="text" value="ABIERTO" readonly class="input-bordered input-center"> 
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
              <input id ="subject" type="text" class="input-bordered">
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
                <textarea id="note" rows="3" class="input-bordered"></textarea>
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
            <button type="button" id="btnCrearTicket" class="btn-action btn-crear" id="btnCrearTicket">Crear</button>
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
        <form class="ticket-form" id="formEditTicket">
          <div class="form-row-2col">
            <div class="form-col">
              <div class="field-group">
                <label>Task ID:</label>
                <input type="text" id="ticketId" value="" placeholder="Ej. TCKT00001" class="input-bordered input-center">
              </div>
              <div class="field-group">
                <label>Type Task:</label>
                <select id="typeTask" disabled class="input-select" required>
                  <option value="">SELECCIONE</option>
                </select>
              </div>
              <div class="field-group">
                <label>Área:</label>
                <select id="area" disabled class="input-select" required>
                  <option value="">SELECCIONE</option>
                </select>
              </div>
              <div class="field-group">
                <label>Usuario:</label>
                <select id="user" disabled class="input-select" required>
                  <option value="">SELECCIONE</option>
                </select>
                </div>
            </div>
            <div class="form-col pt-empty">
              <div class="field-group">
                <label>Estado:</label>
                <select id="state" disabled class="input-select" required>
                  <option value="">SELECCIONE</option>
                  <option value="ABIERTO">ABIERTO</option>
                  <option value="EN_CURSO">EN CURSO</option>
                  <option value="PENDIENTE">PENDIENTE</option>
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
              <input id="subject" type="text" class="input-bordered" value="" readonly >
            </div>
            <div class="field-group-full align-top">
              <label>Descripción:</label>
              <textarea id="description" rows="4" class="input-bordered" readonly ></textarea>
            </div>
          </div>
          <div class="form-row-2col mt-spacing">
            <div class="form-col">
              <div class="field-group align-top">
                <label>Nota:</label>
                <textarea rows="3" class="input-bordered" id="note" readonly ></textarea>
              </div>
            </div>
            <div class="form-col">
              <div class="field-group">
                <label>Attachments:</label>
                <div class="attachment-box input-bordered">
                  <input type="text" id="fileName" readonly style="background: transparent; cursor: default;">
                  <input type="file" id="fileInput" style="display:none">
                  <i class="bi bi-paperclip" id="attachIcon" style="cursor: pointer;"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="form-actions-bottom">
            <button type="button" id="btnBuscarTicket" class="btn-action btn-consultar">Buscar</button>
            <button type="button" id="btnModificarTicket" class="btn-action btn-modificar">Modificar</button>
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

  return fetch(`${API}/areas`)

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

  return fetch(`${API}/user/${codArea}`)
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

  return fetch(`${API}/categories`)

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

  return fetch(`${API}/subcategories/${codCategory}`)
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

    return fetch(`${API}/user/metrics/${codUser}`) 
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
return fetch(`${API}/user/tickets/${codUser}`)
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

function habilitarFormulario() {

  document.querySelectorAll(
    "#formEditTicket input, #formEditTicket textarea, #formEditTicket select"
  ).forEach(control => {

    control.removeAttribute("readonly");
    control.removeAttribute("disabled");

  });

  taskidInput = document.getElementById("ticketId");
  fileNameInput = document.getElementById("fileName");
  if (taskidInput, fileNameInput) {
    taskidInput.setAttribute("readonly", "true");
    fileNameInput.setAttribute("readonly", "true");
  }
}

/* =========================
   BUSCAR TICKET
   ========================= */

document.addEventListener("click", async (e) => {

  if (e.target.id === "btnBuscarTicket") {

    try {

      // ✅ El input en tu formulario se llama ticketId
      let ticketId = document.getElementById("ticketId").value;

      ticketId = parseInt(ticketId);

      if (isNaN(ticketId)) {
        alert("Ingrese un número de ticket válido");
        return;
      }

      console.log("Buscando ticket:", ticketId);

      const res = await fetch(
        `${API}/api/analyst/tickets/${ticketId}`
      );

      const data = await res.json();

      console.log("DATA RECIBIDA:", data);
      console.log("COD_AREA:", data.COD_AREA);
      console.log("COD_USER:", data.COD_USER);
      console.log("COD_CATEGORY:", data.COD_CATEGORY);
      console.log("COD_SUBCATEGORY:", data.COD_SUBCATEGORY);

      if (!res.ok) {
        alert(data.msg || "Error al buscar ticket");
        return;
      }

      // ✅ Habilitar formulario
      habilitarFormulario();

      // ==================================
      // INPUTS
      // ==================================

      document.getElementById("subject").value =
        data.SUBJECT || "";

      document.getElementById("description").value =
        data.DESCRIPTION || "";

      document.getElementById("note").value =
        data.NOTE || "";

      document.getElementById("fileName").value =
        data.ATTACHMENT_NAME || "";

      // ==================================
      // CARGAR COMBOS
      // ==================================

      await cargarAreas();
      await cargarCategorias();

      // Usuarios del área
      await cargarUsuarios(data.COD_AREA);

      // Subcategorías de la categoría
      
      await cargarSubCategorias(data.COD_CATEGORY);

      const subcategory = document.getElementById("subcategory");

      console.log(
        "Opciones:",
        [...subcategory.options].map(o => o.value)
      );

      console.log(
        "Valor recibido:",
        data.COD_SUBCATEGORY
      );

      document.getElementById("typeTask").innerHTML = `
        <option value="">SELECCIONE</option>
        <option value="INCIDENCIA">INCIDENCIA</option>
        <option value="SOLICITUD">SOLICITUD</option>
      `;

      document.getElementById("state").innerHTML = `
        <option value="">SELECCIONE</option>
        <option value="ABIERTO">ABIERTO</option>
        <option value="ASIGNADO">ASIGNADO</option>
        <option value="EN CURSO">EN CURSO</option>
        <option value="PENDIENTE">PENDIENTE</option>
        <option value="TERMINADO">TERMINADO</option>
        <option value="CERRADO">CERRADO</option>
      `;

      // ==================================
      // SELECCIONAR VALORES
      // ==================================

      document.getElementById("area").value =
        data.COD_AREA;

      document.getElementById("user").value =
        data.COD_USER;

      document.getElementById("category").value =
        data.COD_CATEGORY;

      document.getElementById("subcategory").value =
        data.COD_SUBCATEGORY;

      document.getElementById("state").value =
        data.STATUS;

      document.getElementById("typeTask").value =
        data.TICKET_TYPE ;


      alert(`Ticket ${data.TICKET_ID} encontrado`);

    } catch (error) {

      console.error(error);

      alert("Error al buscar ticket");

    }
  }
});   

/* =========================
   ACTUALIZAR TICKET
   ========================= */

document.addEventListener("click", async (e) => {
  if (e.target.id === "btnModificarTicket") {
    try {
      const ticketId = parseInt(document.getElementById("ticketId").value);

      if (isNaN(ticketId)) {
        alert("Ingrese un número de ticket válido");
        return;
      }

      console.log("Modificando ticket:", ticketId);

      const data = {

        tipoTicket: document.querySelector("#typeTask").value,
        estado: document.querySelector("#state").value,
        codUsuario: document.querySelector("#user").value,
        codSubCategoria: document.querySelector("#subcategory").value,
        asunto: document.getElementById("subject").value,
        descripcion: document.getElementById("description").value,
        nota: document.getElementById("note").value,
        adjunto: document.getElementById("fileName").value,
      };

      const res = await fetch(`${API}/api/user/tickets/${ticketId}`, {

        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.msg || "Error al modificar ticket");
      }

      alert(`✅ Ticket modificado: ${responseData.ticketId}`);
      location.hash = "home";

    } catch (error) {
      console.error(error);
      alert("❌ Error: " + error.message);
    }
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