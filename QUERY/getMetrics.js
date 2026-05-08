/**
 * MÓDULO DE CONSULTA DE MÉTRICAS - USUARIO
 * Gestiona el conteo de tickets agrupados por su estado actual
 */

const { sql, pool, poolConnect } = require("../DRIVER/db");

/**
 * Obtiene el total de tickets por cada estado (Abierto, En Curso, etc.) para un usuario específico.
 * @param {string} codUser - Identificador único del usuario (ej. 'USR999')
 * @returns {Array} Colección de objetos con las propiedades STATUS y TOTAL
 */
async function getMetrics(codUser) {
  try {
    // Garantiza que la conexión al pool de base de datos esté activa
    await poolConnect;

    const result = await pool.request()
      .input("codUser", sql.VarChar, codUser)
      .query(`
        SELECT 
            STATUS, 
            COUNT(*) AS TOTAL 
        FROM TBL_TICKET 
        WHERE COD_USER = @codUser
        GROUP BY STATUS
      `);

    return result.recordset; 
  } catch (error) {
    // Se propaga el error para ser gestionado por el controlador de la ruta (server.js)
    throw error;
  }
}

module.exports = getMetrics;