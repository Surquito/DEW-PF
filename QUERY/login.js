const { pool, poolConnect, sql } = require("../DRIVER/db");
const bcrypt = require("bcryptjs");

module.exports = async function login(codUser, password) {
  await poolConnect;

  const result = await pool.request()
    .input("codUser", sql.NVarChar, codUser)
    .query(`
      SELECT COD_USER, PASSWORD_HASH, COD_AREA, STATE
      FROM TBL_USER
      WHERE COD_USER = @codUser
    `);

  const user = result.recordset[0];
  if (!user) return null;

  const valido = await bcrypt.compare(password, user.PASSWORD_HASH);
  if (!valido) return null;

  return user;
};