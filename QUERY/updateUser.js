const { sql, pool, poolConnect } = require("../DRIVER/db");

async function updateUser(userData) {
  try {
    await poolConnect;
    
    // Construimos la consulta base
    let query = `
      UPDATE TBL_USER 
      SET FIRST_NAME = @firstName, 
          LAST_NAME = @lastName, 
          PHONE_NUMBER = @phone, 
          BIRTH_DATE = @birthDate
    `;

    // Si se envió una contraseña válida, la incluimos en el UPDATE
    if (userData.password && userData.password !== "********") {
      query += `, PASSWORD_HASH = @password`;
    }

        // ... dentro de updateUser.js ...
    query += ` WHERE COD_USER = @codUser`; // Cambiamos EMAIL por COD_USER

    let request = pool.request()
    .input("firstName", sql.VarChar, userData.nombres)
    .input("lastName", sql.VarChar, userData.apellidos)
    .input("phone", sql.VarChar, userData.celular)
    .input("birthDate", sql.Date, userData.fechaNac)
    .input("email", sql.VarChar, userData.correo)
    .input("codUser", sql.VarChar, userData.codUser); // Agregamos el identificador seguro
    // ...

    if (userData.password && userData.password !== "********") {
      request.input("password", sql.VarChar, userData.password);
    }

    let result = await request.query(query);
    return result.rowsAffected[0]; // Retorna 1 si se actualizó correctamente
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
}

module.exports = updateUser;