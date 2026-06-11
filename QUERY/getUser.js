const { pool, poolConnect, sql } = require("../DRIVER/db");

async function getUser(codArea) {

  await poolConnect;

  const result = await pool.request()
    .input("codArea", sql.VarChar(15), codArea) // ✅ CORREGIDO
    .query(`

      SELECT COD_USER,
             FIRST_NAME,
             LAST_NAME
      FROM TBL_USER  
      WHERE COD_AREA = @codArea
      ORDER BY COD_USER ASC
    `);         
  return result.recordset;
}

module.exports = getUser;