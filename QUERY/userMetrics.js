const {pool, poolConnect, sql} = require("../DRIVER/db");

module.exports = async (codUser) => {
    await poolConnect;
    const result = await pool.request()
        .input("codUser", sql.VarChar(15), codUser)
        .query(`
        SELECT T.STATUS, COUNT(*) AS TOTAL
        FROM  TBL_TICKET T
        WHERE T.COD_USER = @codUser
        GROUP BY T.STATUS
    `);

    return result.recordset;
}   