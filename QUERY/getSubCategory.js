async function getSubCategory(codCategory) {

  const result = await db.query(`
    SELECT *
    FROM TBL_CATEGORY
    WHERE COD_SUBCATEGORY = ?
  `, [codCategory]);

  return result;
}

module.exports = getSubCategory;