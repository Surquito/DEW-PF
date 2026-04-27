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
                </td>
              </tr>
              <tr>
                <td>TCKT00002</td>
                <td>INSTALACIÓN DE EQUIPO PARA NUEVO INGRESO</td>
                <td>26/05/2023 08:15:37</td>
                <td>
                  <a href="#"><i class="bi bi-eye"></i></a>
                </td>
              </tr>
              <tr>
                <td>TCKT00003</td>
                <td>SAP NO PERMITE CANCELAR COMPROBANTE</td>
                <td>26/05/2023 08:16:09</td>
                <td>
                  <a href="#"><i class="bi bi-eye"></i></a>
                </td>
              </tr>
              <tr>
                <td>TCKT00004</td>
                <td>CREACIÓN DE USUARIO PARA NUEVO INGRESO</td>
                <td>26/05/2023 08:16:36</td>
                <td>
                  <a href="#"><i class="bi bi-eye"></i></a>
                </td>
              </tr>
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
                <select id="nt-typeTask" class="input-select"><option value="">Seleccione</option><option value="INCIDENCIA">Incidencia</option>  <option value="SOLICITUD">Solicitud</option></select>
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
            <i class="bi bi-person-bounding-box" style="font-size: 80px; color: #87ceeb;"></i>
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

            <div class="form-group">
              <label>Crear contraseña:</label>
              <input type="password" id="cu-pass1" placeholder="********">
            </div>

            <div class="form-group">
              <label>Repetir contraseña:</label>
              <input type="password" id="cu-pass2" placeholder="********">
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
  
  // RENDERIZAR EN EL DOM
  document.getElementById("contenido").innerHTML = html;
  
  // ==========================================
  // ASIGNAR EVENTOS DESPUÉS DE RENDERIZAR
  // ==========================================
  
  if (ruta === "home") {
    const codUser = localStorage.getItem("codUser");

    // Función para cargar Métricas
    const cargarMetricas = async () => {
      try {
        const response = await fetch(`/api/user/metrics/${codUser}`);
        if (!response.ok) throw new Error("Error en servidor");
        const data = await response.json();

        // Resetear a 0 por si algún estado no viene en el JSON
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
        console.error("Error cargando métricas:", error);
      }
    };

    // Función para cargar la Bandeja de Tickets
    const cargarBandeja = async () => {
      try {
        const response = await fetch(`/api/user/tickets-recent/${codUser}`);
        const tickets = await response.json();

        // Verificamos que sea un arreglo antes de iterar
        if (!Array.isArray(tickets)) {
          console.error("Respuesta del servidor no es una lista:", tickets);
          return;
        }

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

        // Evento para el ícono del ojo
        document.querySelectorAll(".view-ticket").forEach(btn => {
          btn.addEventListener("click", function() {
            const id = this.getAttribute("data-id");
            sessionStorage.setItem("ticketABuscar", id);
            window.location.hash = "readticket";
          });
        });

      } catch (error) {
        console.error("Error al cargar la bandeja de tickets:", error);
      }
    };

    cargarMetricas();
    cargarBandeja();

    const btnNewTicket = document.getElementById("newticketBtn");
    if (btnNewTicket) {
      btnNewTicket.addEventListener("click", () => location.hash = "newticket");
    }
  }
  
  else if (ruta === "newticket") {

    // Llenado rápido de selects para el formulario de nuevo ticket
    // Dentro de app_usuario.js, en la sección de (ruta === "newticket")
    // Dentro de app_usuario.js, en la sección de (ruta === "newticket")
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
                opt.value = c.cod; // Este es el valor que requiere el FK
                opt.text = c.nom;  // Este es el texto que ve el usuario
                selectCat.add(opt);
            });
        }
    };

    cargarCategoriasDB();

    // Evento para el botón de archivo adjunto visual
    document.getElementById("nt-attachments")?.addEventListener("change", function(e) {
      const fileName = e.target.files[0]?.name || "";
      document.getElementById("nt-filename").value = fileName;
    });

    document.getElementById("btn-crear-nt")?.addEventListener("click", async () => {
    const selectCategoria = document.getElementById("nt-categoria");
    const categoriaSeleccionada = selectCategoria.value; // Esto debe ser el CÓDIGO (HDRW, SFTW...)

    const dataTicket = {
        typeTask: document.getElementById("nt-typeTask").value, // Debe ser INCIDENCIA o SOLICITUD
        estado: document.getElementById("nt-estado").value || 'ABIERTO',
        asunto: document.getElementById("nt-asunto").value,
        descripcion: document.getElementById("nt-descripcion").value,
        categoria: categoriaSeleccionada, 
        usuario: localStorage.getItem("codUser") 
    };

console.log("DATOS ENVIADOS DESDE EL FRONTEND:", dataTicket);

    // Validación rápida
    if (!dataTicket.asunto || !dataTicket.descripcion) {
        return alert("Por favor, completa el asunto y la descripción.");
    }

      console.log("Datos a enviar para crear ticket:", dataTicket);

      
      try {
        const response = await fetch('/api/user/tickets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataTicket)
        });
        const result = await response.json();
        alert("Ticket creado con éxito!");
        document.getElementById("form-newticket").reset();
      } catch (error) {
        console.error("Error al crear ticket", error);
      }
      
    });

    document.getElementById("btn-limpiar-nt")?.addEventListener("click", () => {
      document.getElementById("form-newticket").reset();
      document.getElementById("nt-filename").value = "";
    });
  } 
  
  else if (ruta === "readticket") {
    document.getElementById("btn-consultar-ct")?.addEventListener("click", async () => {
      const taskId = document.getElementById("ct-taskId").value;
      if (!taskId) return alert("Ingrese un Task ID válido");

      console.log("Consultando ticket ID:", taskId);

      
      try {
        // Hacemos la petición con el ID ingresado
        const response = await fetch(`/api/user/tickets/${taskId}`);
        
        if (!response.ok) {
           const errData = await response.json();
           return alert(errData.msg);
        }

        const data = await response.json();
        
        // 1. Llenamos los campos de texto normal
        document.getElementById("ct-asunto").value = data.SUBJECT || "";
        document.getElementById("ct-descripcion").value = data.DESCRIPTION || "";
        
        // 2. Función auxiliar para inyectar opciones en los selects dinámicamente
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

        // 3. Aplicamos la función a los selects usando las columnas de TBL_TICKET
        asignarSelect("ct-typeTask", data.TICKET_TYPE);
        asignarSelect("ct-estado", data.STATUS);
        asignarSelect("ct-categoria", data.COD_CATEGORY);
        asignarSelect("ct-usuario", data.COD_USER);
              
      } catch (error) {
        console.error("Error al consultar ticket", error);
        alert("Ocurrió un error de conexión al consultar el ticket.");
      }
      
    });

    document.getElementById("btn-limpiar-ct")?.addEventListener("click", () => {
      document.getElementById("form-readticket").reset();
    });

    // --- LÓGICA DE AUTO-BÚSQUEDA (CORREGIDA) ---
    const ticketPendiente = sessionStorage.getItem("ticketABuscar");
    
    if (ticketPendiente) {
        // Usamos los IDs EXACTOS que definiste arriba en el HTML
        const inputCT = document.getElementById("ct-taskId"); 
        const btnCT = document.getElementById("btn-consultar-ct");

        if (inputCT && btnCT) {
            inputCT.value = ticketPendiente;
            // Borramos la bandera para que no se repita la búsqueda al refrescar
            sessionStorage.removeItem("ticketABuscar"); 
            
            // Ejecutamos el clic del botón de consulta
            btnCT.click();
        }
    }
  } 
  
  else if (ruta === "readuser") {
    
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

    // Llenar automáticamente al entrar a la vista
    llenarDatosPerfil();

    document.getElementById("btn-limpiar-cu")?.addEventListener("click", () => {
      llenarDatosPerfil();
    });

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
        password: p1 || "********" 
      };

      try {
        const response = await fetch('/api/users', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData)
        });
        
        if (response.ok) {
          alert("Tus datos han sido actualizados.");
          const res = await fetch(`/api/users/${updatedData.codUser}`);
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

// Inicialización de eventos globales
window.addEventListener("hashchange", navegar);
window.addEventListener("load", navegar);

document.addEventListener("DOMContentLoaded", async function () {
  // 1. Obtener el código del usuario logueado desde el localStorage (confirmado en login.js)
  const codUser = localStorage.getItem("codUser"); 
  
  if (codUser) {
    try {
      // Consultamos los datos del usuario logueado al iniciar
      const response = await fetch(`/api/users/${codUser}`);
      if (response.ok) {
        const data = await response.json();
        
        // Inyectamos el primer nombre en el header
        const headerNombre = document.getElementById("header-nombre");
        if (headerNombre) {
            headerNombre.innerHTML = `${data.FIRST_NAME} <i class="bi bi-person-circle"></i>`;
        }
        
        // Guardamos los datos completos temporalmente para llenar el formulario rápido
        localStorage.setItem("userData", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error al cargar datos iniciales del usuario:", error);
    }
  }

  // 2. Lógica de Cerrar Sesión (Mantenemos la existente)
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        // Limpiamos absolutamente todo el rastro de la sesión
        localStorage.clear();
        sessionStorage.clear();
        
        // Redirigimos al Login
        window.location.href = "login.html";
    });
  }

    // --- LÓGICA DEL BUSCADOR GLOBAL ---
  const btnBuscarGlobal = document.getElementById("btn-buscar-global");
  const inputBusqueda = document.getElementById("busqueda");

  const ejecutarBusquedaGlobal = () => {
    const nroTicket = inputBusqueda.value.trim();
    
    if (nroTicket) {
        // Guardamos el número para que la otra vista lo recoja
        sessionStorage.setItem("ticketABuscar", nroTicket);
        
        // Cambiamos de vista
        window.location.hash = "readticket";
        inputBusqueda.value = ""; 
    } else {
        alert("Por favor, ingrese un número de ticket.");
    }
  };

  // Evento al hacer clic en la lupa
  btnBuscarGlobal?.addEventListener("click", ejecutarBusquedaGlobal);

  // Evento al presionar "Enter" en el teclado
  inputBusqueda?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
          ejecutarBusquedaGlobal();
      }
  });
});