const { pool, poolConnect, sql } = require("../DRIVER/db");

async function getSubCategory(codCategory) {

  await poolConnect;

  const result = await pool.request()
    .input("codCategory", sql.VarChar(10), codCategory) // ✅ CORREGIDO
    .query(`
      SELECT COD_CATEGORY, CATEGORY_NAME
      FROM TBL_CATEGORY
      WHERE COD_SUBCATEGORY = @codCategory
      ORDER BY CATEGORY_NAME ASC
    `);

  return result.recordset;
}

module.exports = getSubCategory;