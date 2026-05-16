const { pool, poolConnect } = require("../DRIVER/db");

module.exports = async () => {

  await poolConnect;

  const result = await pool.request()

    .query(`
        SELECT
            COD_CATEGORY,
            CATEGORY_NAME,
            COD_SUBCATEGORY
        FROM TBL_CATEGORY
        WHERE COD_SUBCATEGORY IS NULL
        ORDER BY CATEGORY_NAME ASC
    `);

  return result.recordset;
};