/**
 * SISTEMA DE GESTIÓN DE TICKETS - MÓDULO DE USUARIO
 * Controlador principal para la Single Page Application (SPA)
 */

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
        <section class="metrics">
          <div class="metric">
              <h3>Abiertos</h3>
              <p id="m-abiertos">0</p>
          </div>
          <div class="metric">
              <h3>En Curso</h3>
              <p id="m-encurso">0</p>
          </div>
          <div class="metric">
              <h3>Pendientes</h3>
              <p id="m-pendientes">0</p>
          </div>
          <div class="metric">
              <h3>Atendidos</h3>
              <p id="m-atendidos">0</p>
          </div>
        </section>

        <section class="tickets">
          <div class="tickets-header">
            <h2>Bandeja Tickets</h2>
            <button class="btn-new" id="newticketBtn">
              <i class="bi bi-plus-circle"></i> Nuevo ticket
            </button>
          </div>

          <table class="tickets-table">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Asunto</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              </tbody>
          </table>
        </section>
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
                <select id="nt-typeTask" class="input-select">
                  <option value="">Seleccione</option>
                  <option value="INCIDENCIA">Incidencial</option>  
                  <option value="SOLICITUD">Solicitud</option>
                </select>
              </div>
              <div class="field-group">
                <label>Área:</label>
                <select id="nt-area" class="input-select"><option value="">Seleccione</option></select>
              </div>
              <div class="field-group">
                <label>Usuario:</label>
                <select id="nt-usuario" class="input-select"><option value="">Seleccione</option></select>
              </div>
            </div>
            <div class="form-col pt-empty">
              <div class="field-group">
                <label>Estado:</label>
                <select id="nt-estado" class="input-select"><option value="ABIERTO">Abierto</option></select>
              </div>
              <div class="field-group">
                <label>Categoría:</label>
                <select id="nt-categoria" class="input-select"><option value="">Seleccione</option></select>
              </div>
              <div class="field-group">
                <label>Sub Categoría:</label>
                <select id="nt-subcategoria" class="input-select"><option value="">Seleccione</option></select>
              </div>
            </div>
          </div>

          <div class="form-row-full">
            <div class="field-group-full">
              <label>Asunto:</label>
              <input type="text" id="nt-asunto" class="input-bordered">
            </div>
            <div class="field-group-full align-top">
              <label>Descripción:</label>
              <textarea id="nt-descripcion" rows="4" class="input-bordered"></textarea>
            </div>
          </div>

          <div class="form-row-2col mt-spacing">
            <div class="form-col">
              <div class="field-group">
                <label>Soporte:</label>
                <select id="nt-soporte" class="input-select"><option value="">Seleccione</option></select>
              </div>
            </div>
            <div class="form-col">
              <div class="field-group">
                <label>Attachments:</label>
                <div class="attachment-box input-bordered">
                  <input type="file" id="nt-attachments" style="display: none;">
                  <input type="text" id="nt-filename" readonly onclick="document.getElementById('nt-attachments').click()">
                  <i class="bi bi-paperclip" onclick="document.getElementById('nt-attachments').click()"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="form-actions-bottom">
            <button type="button" id="btn-crear-nt" class="btn-action btn-crear">Crear</button>
            <button type="button" id="btn-limpiar-nt" class="btn-action btn-limpiar">Limpiar</button>
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
        <form class="ticket-form" id="form-readticket">
          <div class="form-row-2col">
            <div class="form-col">
              <div class="field-group">
                <label>Task ID:</label>
                <input type="text" id="ct-taskId" class="input-bordered input-center" placeholder="Ej. TCKT00001">
              </div>
              <div class="field-group">
                <label>Type Task:</label>
                <select id="ct-typeTask" class="input-select" disabled><option>Seleccione</option></select>
              </div>
              <div class="field-group">
                <label>Área:</label>
                <select id="ct-area" class="input-select" disabled><option>Seleccione</option></select>
              </div>
              <div class="field-group">
                <label>Usuario:</label>
                <select id="ct-usuario" class="input-select" disabled><option>Seleccione</option></select>
              </div>
            </div>
            <div class="form-col pt-empty"> 
              <div class="field-group">
                <label>Estado:</label>
                <select id="ct-estado" class="input-select" disabled><option>Seleccione</option></select>
              </div>
              <div class="field-group">
                <label>Categoría:</label>
                <select id="ct-categoria" class="input-select" disabled><option>Seleccione</option></select>
              </div>
              <div class="field-group">
                <label>Sub Categoría:</label>
                <select id="ct-subcategoria" class="input-select" disabled><option>Seleccione</option></select>
              </div>
            </div>
          </div>
          <div class="form-row-full">
            <div class="field-group-full">
              <label>Asunto:</label>
              <input type="text" id="ct-asunto" class="input-bordered" disabled>
            </div>
            <div class="field-group-full align-top">
              <label>Descripción:</label>
              <textarea id="ct-descripcion" rows="4" class="input-bordered" disabled></textarea>
            </div>
          </div>
          <div class="form-row-2col mt-spacing">
            <div class="form-col">
              <div class="field-group align-top">
                <label>Nota:</label>
                <textarea id="ct-nota" rows="3" class="input-bordered" disabled></textarea>
              </div>
              <div class="field-group">
                <label>Soporte:</label>
                <select id="ct-soporte" class="input-select" disabled><option>Seleccione</option></select>
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
            <button type="button" id="btn-limpiar-ct" class="btn-action btn-limpiar">Limpiar</button>
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
              <input type="email" id="cu-correo" disabled>
            </div>
            
            <div class="form-group">
              <label>Perfil:</label>
              <input type="text" id="cu-perfil" disabled>
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
              <input type="text" id="cu-usuario" disabled>
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
              <button type="button" id="btn-limpiar-cu" class="btn-action btn-light-blue">Limpiar</button>
              <button type="button" id="btn-guardar-cu" class="btn-action btn-blue">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
  // Renderizado del HTML en el contenedor principal
  document.getElementById("contenido").innerHTML = html;
  
  // ==========================================
  // ASIGNACIÓN DE EVENTOS POR VISTA
  // ==========================================
  
  if (ruta === "home") {
    const codUser = localStorage.getItem("codUser");

    // Carga de indicadores numéricos (Métricas)
    const cargarMetricas = async () => {
      try {
        const response = await fetch(`${API}/user/metrics/${codUser}`);
        if (!response.ok) throw new Error("Error en servidor");
        const data = await response.json();

        // Inicialización de valores por defecto
        document.getElementById("m-abiertos").innerText = "0";
        document.getElementById("m-encurso").innerText = "0";
        document.getElementById("m-pendientes").innerText = "0";
        document.getElementById("m-atendidos").innerText = "0";

        data.forEach(item => {
          if (item.STATUS === "ABIERTO") document.getElementById("m-abiertos").innerText = item.TOTAL;
          if (item.STATUS === "EN CURSO") document.getElementById("m-encurso").innerText = item.TOTAL;
          if (item.STATUS === "PENDIENTE") document.getElementById("m-pendientes").innerText = item.TOTAL;
          if (item.STATUS === "ATENDIDO") document.getElementById("m-atendidos").innerText = item.TOTAL;
        });
      } catch (error) {
        console.error("Fallo al obtener métricas");
      }
    };

    // Carga de la lista de tickets recientes en la tabla principal
    const cargarBandeja = async () => {
      try {
        const response = await fetch(`${API}/user/tickets-recent/${codUser}`);
        const tickets = await response.json();

        if (!Array.isArray(tickets)) return;

        const tbody = document.querySelector(".tickets-table tbody");
        if (!tbody) return;
        tbody.innerHTML = ""; 

        tickets.forEach(t => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${t.TICKET_ID}</td>
            <td>${t.SUBJECT}</td>
            <td>${t.STATUS}</td>
            <td>
              <a href="javascript:void(0)" class="view-ticket" data-id="${t.TICKET_ID}">
                <i class="bi bi-eye"></i>
              </a>
            </td>
          `;
          tbody.appendChild(tr);
        });

        // Vinculación de evento para visualización individual de tickets
        document.querySelectorAll(".view-ticket").forEach(btn => {
          btn.addEventListener("click", function() {
            const id = this.getAttribute("data-id");
            sessionStorage.setItem("ticketABuscar", id);
            window.location.hash = "readticket";
          });
        });

      } catch (error) {
        console.error("Fallo al cargar la bandeja");
      }
    };

    cargarMetricas();
    cargarBandeja();

    const btnNewTicket = document.getElementById("newticketBtn");
    if (btnNewTicket) {
      btnNewTicket.addEventListener("click", () => location.hash = "newticket");
    }
  } else if (ruta === "newticket") {

    // Inicialización de categorías desde la base de datos
    const cargarCategoriasDB = () => {
        const categorias = [
            { cod: "HDRW", nom: "HARDWARE" },
            { cod: "ITNT", nom: "INTRANET" },
            { cod: "MANTCRTV", nom: "MANTENIMIENTO CORRECTIVO" },
            { cod: "MEXCEL", nom: "MICROSOFT EXCEL" },
            { cod: "MOUTLOOK", nom: "MICROSOFT OUTLOOK" },
            { cod: "NETW", nom: "REDES Y COMUNICACIONES" },
            { cod: "OFFICE", nom: "OFIMATICA" },
            { cod: "SFTW", nom: "SOFTWARE" },
            { cod: "VPN", nom: "CONEXIÓN VPN" },
            { cod: "WIFI", nom: "WIFI" }
        ];
        
        const selectCat = document.getElementById("nt-categoria");
        if (selectCat) {
            selectCat.innerHTML = '<option value="">Seleccione</option>';
            categorias.forEach(c => {
                let opt = document.createElement("option");
                opt.value = c.cod;
                opt.text = c.nom;
                selectCat.add(opt);
            });
        }
    };

    cargarCategoriasDB();

    // Gestión visual de archivos adjuntos
    document.getElementById("nt-attachments")?.addEventListener("change", function(e) {
      const fileName = e.target.files[0]?.name || "";
      document.getElementById("nt-filename").value = fileName;
    });

    // Envío del formulario de creación de ticket
    document.getElementById("btn-crear-nt")?.addEventListener("click", async () => {
      const dataTicket = {
          typeTask: document.getElementById("nt-typeTask").value,
          estado: document.getElementById("nt-estado").value || 'ABIERTO',
          asunto: document.getElementById("nt-asunto").value,
          descripcion: document.getElementById("nt-descripcion").value,
          categoria: document.getElementById("nt-categoria").value, 
          usuario: localStorage.getItem("codUser") 
      };

      if (!dataTicket.asunto || !dataTicket.descripcion) {
          return alert("Por favor, completa el asunto y la descripción.");
      }
      
      try {
        const response = await fetch(`${API}/user/tickets`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataTicket)
        });
        if (response.ok) {
          alert("Ticket creado con éxito!");
          document.getElementById("form-newticket").reset();
          location.hash = "home";
        }
      } catch (error) {
        alert("Ocurrió un error al procesar la solicitud.");
      }
    });

    document.getElementById("btn-limpiar-nt")?.addEventListener("click", () => {
      document.getElementById("form-newticket").reset();
      document.getElementById("nt-filename").value = "";
    });
  } else if (ruta === "readticket") {
    // Consulta manual o automática de un ticket específico
    document.getElementById("btn-consultar-ct")?.addEventListener("click", async () => {
      const taskId = document.getElementById("ct-taskId").value;
      if (!taskId) return alert("Ingrese un Task ID válido");
      
      try {
        const response = await fetch(`${API}/user/tickets/${taskId}`);
        
        if (!response.ok) {
           const errData = await response.json();
           return alert(errData.msg);
        }

        const data = await response.json();
        
        document.getElementById("ct-asunto").value = data.SUBJECT || "";
        document.getElementById("ct-descripcion").value = data.DESCRIPTION || "";
        
        const asignarSelect = (idSelect, valorDB) => {
          if (!valorDB) return; 
          const select = document.getElementById(idSelect);
          const existe = Array.from(select.options).some(opt => opt.value == valorDB);
          
          if (!existe) {
            const nuevaOpcion = document.createElement("option");
            nuevaOpcion.value = valorDB;
            nuevaOpcion.text = valorDB;
            select.appendChild(nuevaOpcion);
          }
          select.value = valorDB;
        };

        asignarSelect("ct-typeTask", data.TICKET_TYPE);
        asignarSelect("ct-estado", data.STATUS);
        asignarSelect("ct-categoria", data.COD_CATEGORY);
        asignarSelect("ct-usuario", data.COD_USER);
              
      } catch (error) {
        alert("Error de conexión al servidor.");
      }
    });

    document.getElementById("btn-limpiar-ct")?.addEventListener("click", () => {
      document.getElementById("form-readticket").reset();
    });

    // Lógica para procesar una búsqueda pendiente (Redirección desde bandeja)
    const ticketPendiente = sessionStorage.getItem("ticketABuscar");
    if (ticketPendiente) {
        const inputCT = document.getElementById("ct-taskId"); 
        const btnCT = document.getElementById("btn-consultar-ct");

        if (inputCT && btnCT) {
            inputCT.value = ticketPendiente;
            sessionStorage.removeItem("ticketABuscar"); 
            btnCT.click();
        }
    }
  } else if (ruta === "readuser") {
    
    // Poblamiento de datos del perfil desde la sesión actual
    const llenarDatosPerfil = () => {
      const sesionData = localStorage.getItem("userData");
      if (sesionData) {
        const data = JSON.parse(sesionData);
        document.getElementById("cu-correo").value = data.EMAIL || "";
        document.getElementById("cu-nombres").value = data.FIRST_NAME || "";
        document.getElementById("cu-apellidos").value = data.LAST_NAME || "";
        document.getElementById("cu-celular").value = data.PHONE_NUMBER || "";
        document.getElementById("cu-usuario").value = data.COD_USER || "";
        document.getElementById("cu-perfil").value = data.COD_AREA || "";
        
        if (data.BIRTH_DATE) {
          const dateStr = new Date(data.BIRTH_DATE).toISOString().split('T')[0];
          document.getElementById("cu-fechanac").value = dateStr;
        }
        
        document.getElementById("cu-pass1").value = "";
        document.getElementById("cu-pass2").value = "";
      }
    };

    llenarDatosPerfil();

    document.getElementById("btn-limpiar-cu")?.addEventListener("click", () => {
      llenarDatosPerfil();
    });

    // Actualización de información de usuario
    document.getElementById("btn-guardar-cu")?.addEventListener("click", async () => {
      const p1 = document.getElementById("cu-pass1").value;
      const p2 = document.getElementById("cu-pass2").value;

      if (p1 !== p2) return alert("Las contraseñas no coinciden.");

      const updatedData = {
        codUser: localStorage.getItem("codUser"),
        nombres: document.getElementById("cu-nombres").value,
        apellidos: document.getElementById("cu-apellidos").value,
        celular: document.getElementById("cu-celular").value,
        fechaNac: document.getElementById("cu-fechanac").value,
        password: p1 || null 
      };

      try {
        const response = await fetch(`${API}/users`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData)
        });
        
        if (response.ok) {
          alert("Perfil actualizado correctamente.");
          const res = await fetch(`${API}/users/${updatedData.codUser}`);
          const newData = await res.json();
          localStorage.setItem("userData", JSON.stringify(newData));
          document.getElementById("header-nombre").innerHTML = `${newData.FIRST_NAME} <i class="bi bi-person-circle"></i>`;
        }
      } catch (error) {
        alert("No se pudo actualizar el perfil.");
      }
    });
  }
}

// Inicialización de navegación mediante eventos del navegador
window.addEventListener("hashchange", navegar);
window.addEventListener("load", navegar);

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

/**
 * CONFIGURACIÓN GLOBAL AL CARGAR EL DOM
 * Maneja la sesión persistente, el cierre de sesión y la búsqueda global
 */
document.addEventListener("DOMContentLoaded", async function () {
  const codUser = localStorage.getItem("codUser"); 
  /* BORRAR ESTE BLOQUE SI NO SE REQUIERE CARGA INICIAL DE DATOS DE USUARIO DESDE API
  if (codUser) {
    try {
      const response = await fetch(`${API}/users/${codUser}`);
      if (response.ok) {
        const data = await response.json();
        const headerNombre = document.getElementById("header-nombre");
        if (headerNombre) {
            headerNombre.innerHTML = `${data.FIRST_NAME} <i class="bi bi-person-circle"></i>`;
        }
        localStorage.setItem("userData", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error al recuperar sesión");
    }
  }
*/
  // Lógica de finalización de sesión
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "login.html";
    });
  }

  // GESTIÓN DEL BUSCADOR GLOBAL (Header)
  const btnBuscarGlobal = document.getElementById("btn-buscar-global");
  const inputBusqueda = document.getElementById("busqueda");

  const ejecutarBusquedaGlobal = () => {
    const nroTicket = inputBusqueda.value.trim();
    if (nroTicket) {
        sessionStorage.setItem("ticketABuscar", nroTicket);
        window.location.hash = "readticket";
        inputBusqueda.value = ""; 
    } else {
        alert("Por favor, ingrese un número de ticket.");
    }
  };

  btnBuscarGlobal?.addEventListener("click", ejecutarBusquedaGlobal);
  inputBusqueda?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") ejecutarBusquedaGlobal();
  });
});