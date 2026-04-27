const { sql, pool, poolConnect } = require("../DRIVER/db"); 

async function newTicket(ticketData) {
  try {
    await poolConnect;
    
    let result = await pool.request()
      .input("typeTask", sql.VarChar, ticketData.typeTask)
      .input("estado", sql.VarChar, ticketData.estado)
      .input("asunto", sql.VarChar, ticketData.asunto)
      .input("descripcion", sql.Text, ticketData.descripcion)
      .input("categoria", sql.VarChar, ticketData.categoria.trim()) // Limpiamos espacios del front
      .input("usuario", sql.VarChar, ticketData.usuario)
      .input("impacto", sql.VarChar, 'PERSONA') 
      .input("prioridad", sql.VarChar, 'MEDIA')
      .input("urgencia", sql.VarChar, 'MEDIA')
      .query(`
        -- Usamos una variable local para buscar el código exacto que existe en la tabla maestra
        DECLARE @CatReal VARCHAR(10) = (SELECT TOP 1 COD_CATEGORY FROM TBL_CATEGORY WHERE RTRIM(COD_CATEGORY) = @categoria);

        INSERT INTO TBL_TICKET 
        (TICKET_TYPE, STATUS, SUBJECT, DESCRIPTION, COD_CATEGORY, COD_USER, IMPACT, PRIORITY, URGENCY)
        VALUES 
        (@typeTask, @estado, @asunto, @descripcion, @CatReal, @usuario, @impacto, @prioridad, @urgencia);
        
        SELECT SCOPE_IDENTITY() AS NewTicketID;
      `);
      
    return result.recordset[0];
  } catch (error) {
    console.error("Error en TBL_TICKET INSERT:", error.message);
    throw error; 
  }
}

module.exports = newTicket;