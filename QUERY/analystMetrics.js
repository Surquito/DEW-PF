const { pool, poolConnect, sql } = require("../DRIVER/db");

module.exports = async () => {
  await poolConnect;

  const result = await pool.request()
      .query(`
      SELECT T.STATUS, COUNT(*) AS TOTAL
      FROM TBL_ATTENTION A
      JOIN TBL_TICKET T ON A.TICKET_ID = T.TICKET_ID
      GROUP BY T.STATUS
    `);

    return result.recordset;
      };
