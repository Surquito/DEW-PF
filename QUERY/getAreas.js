// models/getAreas.js

const { pool, poolConnect } = require("../DRIVER/db");

module.exports = async () => {

  await poolConnect;

  const result = await pool.request()

    .query(`
      SELECT
        COD_AREA,
        AREA
      FROM TBL_AREA
      ORDER BY AREA ASC
    `);

  return result.recordset;
};