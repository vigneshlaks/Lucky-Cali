// config/db.js
const mariadb = require('mariadb');

let pool;


const initPool = () => {
  pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectionLimit: 10,
    connectTimeout: 5000
  });
};

/*
const initPool = () => {
  pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "lucky_cali_database",
    port: 3306,
    connectionLimit: 5,
    connectTimeout: 5000
  });
};
*/

const connectDB = async () => {
  if (!pool) initPool();

  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
};

const query = async (sql, params) => {
  let conn;
  try {
    conn = await connectDB();
    const result = await conn.query(sql, params);
    return result;
  } catch (err) {
    console.error('Query execution failed:', err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

module.exports = {
  connectDB,
  query,
};