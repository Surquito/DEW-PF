function validarUsuario(usuario, contraseña) {
  if (usuario === "admin" && contraseña === "admin123") {
    mostrarAlerta("success", "Inicio de sesión exitoso").then(() => {
      window.location.href = "index_analista.html";
    });
  } else if (usuario === "user" && contraseña === "user123") {
    mostrarAlerta("success", "Inicio de sesión exitoso").then(() => {
      window.location.href = "index_usuario.html";
    });
  } else {
    mostrarAlerta("error", "Usuario o contraseña incorrectos");
  }
}

function mostrarAlerta(icono, mensaje) {
  if (typeof Swal !== "undefined") {
    return Swal.fire({
      icon: icono,
      text: mensaje,
      confirmButtonText: "Aceptar"
    });
  }

  alert(mensaje);
  return Promise.resolve();
}

function alternarContrasena() {
  const passwordInput = document.getElementById("password");
  const passwordIcon = document.getElementById("togglePasswordIcon");

  if (!passwordInput || !passwordIcon) {
    return;
  }

  const esPassword = passwordInput.type === "password";
  passwordInput.type = esPassword ? "text" : "password";
  passwordIcon.classList.toggle("bi-eye", !esPassword);
  passwordIcon.classList.toggle("bi-eye-slash", esPassword);
}

function alternarContrasenaPorId(inputId, iconId) {
  const passwordInput = document.getElementById(inputId);
  const passwordIcon = document.getElementById(iconId);

  if (!passwordInput || !passwordIcon) {
    return;
  }

  const esPassword = passwordInput.type === "password";
  passwordInput.type = esPassword ? "text" : "password";
  passwordIcon.classList.toggle("bi-eye", !esPassword);
  passwordIcon.classList.toggle("bi-eye-slash", esPassword);
}

function validarContrasenasRecuperacion() {
  const nuevaContrasena = document.getElementById("nuevaContrasena");
  const repetirContrasena = document.getElementById("repetirContrasena");
  const mensaje = document.getElementById("mensajeRecuperacion");

  if (!nuevaContrasena || !repetirContrasena || !mensaje) {
    return;
  }

  const nueva = nuevaContrasena.value.trim();
  const repetir = repetirContrasena.value.trim();

  if (!nueva || !repetir) {
    mensaje.textContent = "Completa ambos campos de contraseña.";
    return;
  }

  if (nueva !== repetir) {
    mensaje.textContent = "";
    mostrarAlerta("error", "Las contraseñas no coinciden.");
    return;
  }

  mensaje.textContent = "";
  mostrarAlerta("success", "Contraseña actualizada correctamente.").then(() => {
    window.location.href = "login.html";
  });
}
 