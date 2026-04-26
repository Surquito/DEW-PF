const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

poolConnect
  .then(() => {
    console.log("Conectado a Azure SQL");
  })
  .catch(err => {
    console.error("Error conexión Azure SQL:", err);
  });

module.exports = {
  sql,
  pool,
  poolConnect
};
