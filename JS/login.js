const API = "http://localhost:3000";

function validarUsuario(codUser, password) {

  if (!codUser || !password) {
    mostrarAlerta("alert", "Ingrese usuario y contraseña");
    return;
  }

  fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      codUser: codUser,
      password: password
    })
  })
  .then(res => {
    if (!res.ok) throw new Error();
    return res.json();
  })
  .then(data => {

    mostrarAlerta("success", "Inicio de sesión exitoso").then(() => {

      localStorage.setItem("codUser", data.codUser);
      // REGLA DE NEGOCIO
      if (data.codArea === "SIST") {
        window.location.href = "../HTML/index_analista.html";
      } else {
        window.location.href = "../HTML/index_usuario.html";
      }

    });
  })
  .catch(() => {
    mostrarAlerta("error", "Usuario o contraseña incorrectos");
  });
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