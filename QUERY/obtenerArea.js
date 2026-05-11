// models/getAreas.js

const { pool, poolConnect } = require("../DRIVER/db");

module.exports = async () => {

  await poolConnect;

  const result = await pool.request()

    .query(`
      SELECT
        AREA_ID,
        NAME
      FROM TBL_AREA
      WHERE STATE = 1
      ORDER BY NAME
    `);

  return result.recordset;
};