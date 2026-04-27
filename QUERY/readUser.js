/**
 * MÓDULO DE CONSULTA DE PERFIL DE USUARIO
 * Recupera la información demográfica y de contacto de un usuario específico.
 */

const { sql, pool, poolConnect } = require("../DRIVER/db");

/**
 * Obtiene los datos detallados de un usuario filtrado por su código identificador.
 * @param {string} codUser - Identificador único del usuario (ej. 'USR999').
 * @returns {Promise<Object|null>} Objeto con la información del usuario o undefined si no existe.
 */
async function readUser(codUser) {
  try {
    // Sincronización con el estado de conexión del pool de base de datos
    await poolConnect;

    const result = await pool.request()
      .input("codUser", sql.VarChar, codUser)
      .query(`
        SELECT 
            COD_USER, 
            FIRST_NAME, 
            LAST_NAME, 
            PHONE_NUMBER, 
            BIRTH_DATE, 
            COD_AREA, 
            EMAIL 
        FROM TBL_USER 
        WHERE COD_USER = @codUser
      `);

    // Retorno del registro único (primer elemento del set de datos)
    return result.recordset[0];
  } catch (error) {
    // Propagación del error para centralización en la capa de servicios HTTP
    throw error;
  }
}

module.exports = readUser;