/**
 * MÓDULO DE CONSULTA DE TICKETS RECIENTES - USUARIO
 * Recupera el historial simplificado de los últimos tickets registrados por el usuario.
 */

const { sql, pool, poolConnect } = require("../DRIVER/db");

/**
 * Obtiene los 10 tickets más recientes asociados a un código de usuario.
 * @param {string} codUser - Identificador único del usuario solicitante.
 * @returns {Promise<Array>} Lista de objetos con TICKET_ID, SUBJECT y STATUS.
 */
async function getRecentTickets(codUser) {
  try {
    // Asegura la disponibilidad de la conexión al pool de base de datos
    await poolConnect;

    const result = await pool.request()
      .input("codUser", sql.VarChar, codUser)
      .query(`
        SELECT TOP 10 
            TICKET_ID, 
            SUBJECT, 
            STATUS
        FROM TBL_TICKET
        WHERE COD_USER = @codUser
        ORDER BY TICKET_ID DESC
      `);
    
    return result.recordset;
  } catch (error) {
    // Propagación del error para manejo centralizado en la capa de servicios (server.js)
    throw error;
  }
}

module.exports = getRecentTickets;