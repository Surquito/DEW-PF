/**
 * MÓDULO DE CONSULTA DETALLADA DE TICKETS
 * Recupera la información íntegra de un registro específico mediante su identificador único.
 */

const { sql, pool, poolConnect } = require("../DRIVER/db"); 

/**
 * Consulta un ticket por su ID en la base de datos.
 * @param {string|number} ticketId - El identificador numérico del ticket a consultar.
 * @returns {Promise<Object|null>} Retorna el objeto del ticket encontrado o undefined si no existe.
 */
async function readTicket(ticketId) {
  try {
    // Sincronización con el estado de conexión del pool de Azure SQL
    await poolConnect;
    
    // Ejecución de la consulta parametrizada para evitar inyección SQL
    let result = await pool.request()
      .input("ticketId", sql.Int, parseInt(ticketId))
      .query(`
        SELECT * FROM TBL_TICKET 
        WHERE TICKET_ID = @ticketId
      `);
      
    // Retorno del primer registro del set de datos (identificador único)
    return result.recordset[0]; 
  } catch (error) {
    // La excepción se propaga para ser gestionada por la capa de servicios de la API
    throw error; 
  }
}

module.exports = readTicket;