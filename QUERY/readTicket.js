const { sql, pool, poolConnect } = require("../DRIVER/db"); 

async function readTicket(ticketId) {
  try {
    // Esperamos a que la conexión a Azure SQL esté establecida
    await poolConnect;
    
    // Usamos el pool directamente
    let result = await pool.request()
      .input("ticketId", sql.Int, parseInt(ticketId))
      .query(`
        SELECT * FROM TBL_TICKET 
        WHERE TICKET_ID = @ticketId
      `);
      
    return result.recordset[0]; 
  } catch (error) {
    console.error("Error al consultar el ticket:", error);
    throw error; 
  }
}

module.exports = readTicket;