const { pool, poolConnect, sql } = require("../DRIVER/db");

module.exports = async (codUser) => {
  await poolConnect; 
  const result = await pool.request()
    .input("codUser", sql.VarChar(15), codUser)
    .query(`
      SELECT 
        T.TICKET_ID,
        T.SUBJECT,
        T.STATUS,
        T.UPDATE_DATE
      FROM TBL_TICKET T
      WHERE T.COD_USER = @codUser
      ORDER BY T.TICKET_ID desc
    `);

  return result.recordset;
}