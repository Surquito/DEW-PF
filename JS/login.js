function validarUsuario(usuario, contraseña) {
  if (usuario === "admin" && contraseña === "admin123") {
    alert("Inicio de sesión exitoso");
    window.location.href = "index_analista.html";
  } if (usuario === "user" && contraseña === "user123") {
    alert("Inicio de sesión exitoso");
    window.location.href = "index_usuario.html";
   } else {
    alert("Usuario o contraseña incorrectos");
  }
}
 