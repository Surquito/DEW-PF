const { pool, poolConnect, sql } = require("../../DRIVER/db");

module.exports = async (codigo, area) => {
  await poolConnect;
  return pool.request()
    .input("codigo", sql.NVarChar, codigo)
    .input("area", sql.NVarChar, area)
    .query(`
      INSERT INTO TBL_AREA (COD_AREA, AREA)
      VALUES (@codigo, @area)
    `);
};