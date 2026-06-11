const { pool, poolConnect, sql } = require("../DRIVER/db");

module.exports = async () => {

  await poolConnect;
  const result = await pool.request().query(`
    SELECT 
      T.TICKET_ID,
      T.SUBJECT,
      T.STATUS,
      A.CREATE_DATE
    FROM TBL_TICKET T
    LEFT JOIN TBL_ATTENTION A 
      ON A.TICKET_ID = T.TICKET_ID
    ORDER BY T.TICKET_ID DESC
  `);

  return result.recordset;
};