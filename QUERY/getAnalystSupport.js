const {pool, poolConnect, sql} = require("../DRIVER/db");

async function getAnalystSupport(codLevel) {
    await poolConnect;
    const result = await pool.request()
        .input("codLevel", sql.Int, codLevel)
        .query(`
            SELECT U.COD_USER,
                U.FIRST_NAME,
                U.LAST_NAME
            FROM TBL_USER U
            INNER JOIN TBL_ANALYST A
            ON U.COD_USER = A.COD_USER
            WHERE A.SUPPORT_LEVEL = @codLevel 
            ORDER BY U.FIRST_NAME ASC
        `);
    return result.recordset;
}

module.exports = getAnalystSupport;