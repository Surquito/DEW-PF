const {pool, poolConnect, sql} = require("../DRIVER/db");

module.exports = async ({
  ticketId,
  tipoTicket,
  estado,
  codUsuario,
  codSubCategoria,
  asunto,
  descripcion,
  nota,
  adjunto
}) => {

    await poolConnect;

    if (!tipoTicket || !codUsuario || !asunto) {
        throw new Error("Datos incompletos");
    }   

    const ticketResult = await pool.request()
        .input("ticketId", sql.Int, ticketId)
        .input("tipoTicket", sql.NVarChar(50), tipoTicket)
        .input("estado", sql.NVarChar(50), estado)
        .input("codUsuario", sql.NVarChar(50), codUsuario)
        .input("codSubCategoria", sql.NVarChar(10), codSubCategoria)
        .input("asunto", sql.NVarChar(200), asunto)
        .input("descripcion", sql.NVarChar, descripcion) 
        .query(`
        UPDATE  TBL_TICKET 
        SET     TICKET_TYPE = @tipoTicket,
                STATUS = @estado,
                SUBJECT = @asunto,
                DESCRIPTION = @descripcion,
                COD_CATEGORY = @codSubCategoria,
                COD_USER = @codUsuario
                OUTPUT INSERTED.TICKET_ID AS NewTicketID
        WHERE   TICKET_ID = @ticketId
        `);  
    
    if (codUsuario) {
        await pool.request()
            .input("ticketId", sql.Int, ticketId)
            .input("nota", sql.NVarChar, nota || "")
            .input("adjunto", sql.NVarChar(200), adjunto || "")
            .query(`
                UPDATE  TBL_ATTENTION
                SET     
                        ATTACHMENT_NAME = @adjunto,
                        NOTE = @nota
                WHERE   TICKET_ID = @ticketId
            `);
    }
}