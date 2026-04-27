const { sql, pool, poolConnect } = require("../DRIVER/db");

async function getMetrics(codUser) {
  try {
    await poolConnect;
    const result = await pool.request()
      .input("codUser", sql.VarChar, codUser)
      .query(`
        SELECT STATUS, COUNT(*) as TOTAL 
        FROM TBL_TICKET 
        WHERE COD_USER = @codUser
        GROUP BY STATUS
      `);
    return result.recordset; 
  } catch (error) {
    console.error("Error al obtener métricas:", error);
    throw error;
  }
}

module.exports = getMetrics;