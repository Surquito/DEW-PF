/**
 * MÓDULO DE CREACIÓN DE TICKETS
 * Gestiona la inserción de nuevos requerimientos o incidencias en la base de datos.
 */

const { sql, pool, poolConnect } = require("../DRIVER/db"); 

/**
 * Registra un nuevo ticket realizando validaciones de integridad referencial para categorías.
 * @param {Object} ticketData - Objeto con la información del ticket proveniente del frontend.
 * @returns {Promise<Object>} Objeto con el ID del ticket recién generado (NewTicketID).
 */
async function newTicket(ticketData) {
  try {
    // Garantiza que la conexión al pool esté establecida antes de la petición
    await poolConnect;
    
    let result = await pool.request()
      .input("typeTask", sql.VarChar, ticketData.typeTask)
      .input("estado", sql.VarChar, ticketData.estado)
      .input("asunto", sql.VarChar, ticketData.asunto)
      .input("descripcion", sql.Text, ticketData.descripcion)
      .input("categoria", sql.VarChar, ticketData.categoria.trim())
      .input("usuario", sql.VarChar, ticketData.usuario)
      // Valores de clasificación predeterminados según restricciones CHK de la base de datos
      .input("impacto", sql.VarChar, 'PERSONA') 
      .input("prioridad", sql.VarChar, 'MEDIA')
      .input("urgencia", sql.VarChar, 'MEDIA')
      .query(`
        -- Resolución de integridad: Busca el código exacto en la maestra para evitar conflictos de espacios (RTRIM)
        DECLARE @CatReal VARCHAR(10) = (
            SELECT TOP 1 COD_CATEGORY 
            FROM TBL_CATEGORY 
            WHERE RTRIM(COD_CATEGORY) = @categoria
        );

        -- Inserción de registro en la tabla principal de tickets
        INSERT INTO TBL_TICKET 
        (TICKET_TYPE, STATUS, SUBJECT, DESCRIPTION, COD_CATEGORY, COD_USER, IMPACT, PRIORITY, URGENCY)
        VALUES 
        (@typeTask, @estado, @asunto, @descripcion, @CatReal, @usuario, @impacto, @prioridad, @urgencia);
        
        -- Retorno del identificador autonumérico generado para el nuevo registro
        SELECT SCOPE_IDENTITY() AS NewTicketID;
      `);
      
    return result.recordset[0];
  } catch (error) {
    // Propagación del error hacia la ruta del servidor para respuesta HTTP 500
    throw error; 
  }
}

module.exports = newTicket;