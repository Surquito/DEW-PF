const { pool, poolConnect, sql } = require("../DRIVER/db");

module.exports = async ({
  tipoTicket,
  codUsuario,
  codSubCategoria,
  asunto,
  descripcion,
  nota,
  adjunto
}) => {

  await poolConnect;

  // ✅ VALIDACIÓN BÁSICA
  if (!tipoTicket || !codUsuario || !asunto) {
    throw new Error("Datos incompletos");
  }

  // ✅ INSERT TICKET
  const ticketResult = await pool.request()
    .input("tipoTicket", sql.NVarChar(50), tipoTicket)
    .input("codUsuario", sql.NVarChar(50), codUsuario)
    .input("codSubCategoria", sql.NVarChar(10), codSubCategoria)
    .input("asunto", sql.NVarChar(200), asunto)
    .input("descripcion", sql.NVarChar, descripcion)
    .query(`
      INSERT INTO TBL_TICKET 
      (TICKET_TYPE, STATUS, SUBJECT, DESCRIPTION, IMPACT, PRIORITY, URGENCY, COD_CATEGORY, COD_USER)
      OUTPUT INSERTED.TICKET_ID AS NewTicketID
      VALUES 
      (@tipoTicket, 'ABIERTO', @asunto, @descripcion, 'PERSONA', 'BAJA', 'BAJA', @codSubCategoria, @codUsuario)
    `);

  const newTicketId = ticketResult.recordset[0].NewTicketID;

  // ✅ INSERT ATTENTION SOLO SI HAY ANALISTA
  if (codUsuario) {
    await pool.request()
      .input("ticketId", sql.Int, newTicketId)
      .input("nota", sql.NVarChar, nota || "")
      .input("adjunto", sql.NVarChar(200), adjunto || "")
      .query(`
        INSERT INTO TBL_ATTENTION
        (TICKET_ID, COD_ANALYST, ATTACHMENT_NAME, NOTE)
        VALUES
        (@ticketId, 'HELPDESK', @adjunto, @nota)
      `);
  }

  return { NewTicketID: newTicketId };
};