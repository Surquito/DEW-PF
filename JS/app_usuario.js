function navegar() {
  const ruta = location.hash.replace("#", "") || "home";
  let html = "";

  if (ruta === "home") {
    html = `
    HOME USUARIO
    `;  
  } else if (ruta === "newticket") {
    html = `
            NEW TICKET USUARIO
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
                <input type="text" class="input-bordered input-center">
              </div>
              <div class="field-group">
                <label>Type Task:</label>
                <select class="input-select" disabled><option>Seleccione</option></select>
              </div>
              <div class="field-group">
                <label>Área:</label>
                <select class="input-select" disabled><option>Seleccione</option></select>
              </div>
              <div class="field-group">
                <label>Usuario:</label>
                <select class="input-select" disabled><option>Seleccione</option></select>
              </div>
            </div>
            <div class="form-col pt-empty"> 
              <div class="field-group">
                <label>Estado:</label>
                <select class="input-select" disabled><option>Seleccione</option></select>
              </div>
              <div class="field-group">
                <label>Categoría:</label>
                <select class="input-select" disabled><option>Seleccione</option></select>
              </div>
              <div class="field-group">
                <label>Sub Categoría:</label>
                <select class="input-select" disabled><option>Seleccione</option></select>
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
              <div class="field-group">
                <label>Soporte:</label>
                <select class="input-select" disabled><option>Seleccione</option></select>
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
  } else if (ruta === "readuser") { 
    html = `READ USER
    `;
  }
  document.getElementById("contenido").innerHTML = html;
}

window.addEventListener("hashchange", navegar);
window.addEventListener("load", navegar);
