const {pool, poolConnect, sql} = require("../DRIVER/db");

async function readTicketAnalyst(ticketId) {
    await poolConnect;

    const result = await pool.request()
        .input("ticketId", sql.Int, ticketId)
        .query(`
            SELECT  TT.TICKET_ID,
                    TT.TICKET_TYPE,
                    TU.COD_AREA,
                    TAR.AREA,
                    TT.COD_USER,
                    TU.FIRST_NAME,
                    TU.LAST_NAME,
                    TT.STATUS,
                    TC.COD_SUBCATEGORY AS COD_CATEGORY, 
                    (SELECT CATEGORY_NAME
                    FROM TBL_CATEGORY  
                    WHERE COD_CATEGORY = TC.COD_SUBCATEGORY) AS CATEGORY,
                    TT.COD_CATEGORY AS COD_SUBCATEGORY,
                    TC.CATEGORY_NAME AS SUB_CATEGORY,
                    TT.SUBJECT,
                    TT.DESCRIPTION,
                    TA.NOTE,
                    TS.SUPPORT_LEVEL AS SUPPORT_LEVEL,
                    TA.COD_ANALYST,
                    (SELECT FIRST_NAME
                    FROM TBL_USER
                    WHERE COD_USER = TA.COD_ANALYST) AS ANALYST_NAME,
                    (SELECT LAST_NAME
                    FROM TBL_USER
                    WHERE COD_USER = TA.COD_ANALYST) AS ANALYST_LASTNAME,
                    TA.ATTACHMENT_NAME, 
                    TT.IMPACT AS IMPACT,
                    TT.PRIORITY AS PRIORITY,
                    TT.URGENCY AS URGENCY
            FROM TBL_TICKET TT
            INNER JOIN TBL_ATTENTION TA 
                ON TT.TICKET_ID = TA.TICKET_ID
            INNER JOIN TBL_USER TU
                ON TT.COD_USER = TU.COD_USER
            INNER JOIN TBL_ANALYST TS
                ON TA.COD_ANALYST = TS.COD_USER
            INNER JOIN TBL_CATEGORY TC
                ON TT.COD_CATEGORY = TC.COD_CATEGORY
            INNER JOIN TBL_AREA TAR
                ON TU.COD_AREA = TAR.COD_AREA
            WHERE TT.TICKET_ID = @ticketId
                AND TA.ATTENTION_ID = (SELECT MAX(TA.ATTENTION_ID) 
                                        FROM TBL_ATTENTION TA 
                                        WHERE TA.TICKET_ID = @ticketId)
        `); 
    return result.recordset[0];
}

module.exports = { readTicketAnalyst };