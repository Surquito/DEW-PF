const { pool, poolConnect, sql } = require("../DRIVER/db");

module.exports = async (codAnalyst) => {
  await poolConnect;

  const result = await pool.request()
    .input("codAnalyst", sql.NVarChar, codAnalyst)
    .query(`
      SELECT 
        T.TICKET_ID,
        T.SUBJECT,
        T.STATUS,
        A.CREATE_DATE
      FROM TBL_ATTENTION A
      FULL JOIN TBL_TICKET T ON A.TICKET_ID = T.TICKET_ID
      ORDER BY A.CREATE_DATE DESC
    `);

  return result.recordset;
};