const { pool, poolConnect, sql } = require("../DRIVER/db");

module.exports = async (codAnalyst) => {
  await poolConnect;

  const result = await pool.request()
    .input("codAnalyst", sql.NVarChar, codAnalyst)
    .query(`
      SELECT T.STATUS, COUNT(*) AS TOTAL
      FROM TBL_ATTENTION A
      JOIN TBL_TICKET T ON A.TICKET_ID = T.TICKET_ID
      WHERE A.COD_ANALYST = @codAnalyst
      GROUP BY T.STATUS
    `);

  return result.recordset;
};