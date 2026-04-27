const { sql, pool, poolConnect } = require("../DRIVER/db");

async function readUser(codUser) {
  try {
    await poolConnect;
    let result = await pool.request()
      .input("codUser", sql.VarChar, codUser)
      .query(`
        SELECT COD_USER, FIRST_NAME, LAST_NAME, PHONE_NUMBER, BIRTH_DATE, COD_AREA, EMAIL 
        FROM TBL_USER 
        WHERE COD_USER = @codUser
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("Error al consultar el usuario:", error);
    throw error;
  }
}
module.exports = readUser;