const { pool, poolConnect, sql } = require("../DRIVER/db");
const bcrypt = require("bcryptjs");

module.exports = async (email, newPassword) => {
  await poolConnect;

  const hash = await bcrypt.hash(newPassword, 10);

  const result = await pool.request()
    .input("email", sql.NVarChar, email)
    .input("hash", sql.NVarChar, hash)
    .query(`
      UPDATE TBL_USER
      SET PASSWORD_HASH = @hash
      WHERE EMAIL = @email
    `);

  return result.rowsAffected[0];
};