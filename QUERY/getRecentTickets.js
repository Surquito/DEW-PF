const { sql, pool, poolConnect } = require("../DRIVER/db");

async function getRecentTickets(codUser) {
  try {
    await poolConnect;
    
    // Log para confirmar qué usuario estamos consultando en la terminal de VSCode
    console.log("CONSULTANDO TICKETS PARA:", codUser);

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
    // Este mensaje es crucial. Si sale "Invalid column name", sabremos EXACTAMENTE cuál es.
    console.error("ERROR CRÍTICO EN getRecentTickets SQL:", error.message);
    throw error;
  }
}

module.exports = getRecentTickets;