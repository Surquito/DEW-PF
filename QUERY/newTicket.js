const { pool, poolConnect, sql } = require("../DRIVER/db");

module.exports = async ({
  tipoTicket,
  codUsuario,
  codSubCategoria,
  asunto,
  descripcion,
  impacto,
  prioridad,
  urgencia,
  codAnalista,
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
    .input("impacto", sql.NVarChar(50), impacto)
    .input("prioridad", sql.NVarChar(50), prioridad)
    .input("urgencia", sql.NVarChar(50), urgencia)
    .query(`
      INSERT INTO TBL_TICKET 
      (TICKET_TYPE, STATUS, SUBJECT, DESCRIPTION, IMPACT, PRIORITY, URGENCY, COD_CATEGORY, COD_USER)
      OUTPUT INSERTED.TICKET_ID AS NewTicketID
      VALUES 
      (@tipoTicket, 'ABIERTO', @asunto, @descripcion, @impacto, @prioridad, @urgencia, @codSubCategoria, @codUsuario)
    `);

  const newTicketId = ticketResult.recordset[0].NewTicketID;

  // ✅ INSERT ATTENTION SOLO SI HAY ANALISTA
  if (codAnalista) {
    await pool.request()
      .input("ticketId", sql.Int, newTicketId)
      .input("codAnalista", sql.NVarChar(50), codAnalista)
      .input("nota", sql.NVarChar, nota || "")
      .input("adjunto", sql.NVarChar(200), adjunto || "")
      .query(`
        INSERT INTO TBL_ATTENTION
        (TICKET_ID, COD_ANALYST, ATTACHMENT_NAME, NOTE)
        VALUES
        (@ticketId, @codAnalista, @adjunto, @nota)
      `);
  }

  return { NewTicketID: newTicketId };
};