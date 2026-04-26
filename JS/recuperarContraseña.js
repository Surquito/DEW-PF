const API = "http://localhost:3000";

function validarContrasenasRecuperacion() {

  const email = document.getElementById("correoRecuperacion").value.trim();
  const pass1 = document.getElementById("nuevaContrasena").value;
  const pass2 = document.getElementById("repetirContrasena").value;

  if (!email || !pass1 || !pass2) {
    mostrarMensaje("Complete todos los campos", "error");
    return;
  }

  if (pass1 !== pass2) {
    mostrarMensaje("Las contraseñas no coinciden", "error");
    return;
  }

  if (pass1.length < 6) {
    mostrarMensaje("La contraseña debe tener al menos 6 caracteres", "error");
    return;
  }

  fetch(`${API}/reset-password`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      newPassword: pass1
    })
  })
  .then(res => {
    if (!res.ok) throw new Error();
    return res.json();
  })
  .then(data => {
    mostrarMensaje("Contraseña actualizada correctamente", "success");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  })
  .catch(() => {
    mostrarMensaje("Correo no encontrado o error", "error");
  });
}

function mostrarMensaje(mensaje, tipo) {
  const p = document.getElementById("mensajeRecuperacion");
  p.textContent = mensaje;
  p.className = "mensajeValidacion " + tipo;
}

// FUNCION PARA MOSTRAR/OCULTAR CONTRASEÑA
function alternarContrasenaPorId(inputId, iconId) {
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