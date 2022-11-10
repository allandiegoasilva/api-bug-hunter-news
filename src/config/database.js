
const mysql = require("mysql2")


var pool = mysql.createPool({
  user: "root",
  host: "127.0.0.1",
  port: 3306,
  password: '',
  database: "bug_hunter_news",
  connectionLimit: 100
});

exports.query = (sql, params = []) => {

  return new Promise((resolve, reject) => {

    pool.getConnection((err, connection) => {

      if (err)
        reject(err);
      else {
        connection.query(sql, params, (err, results) => {
          connection.release();

          if (err) {
            reject(err);
          }

          resolve(results);
        });
      }
    });
  });
} 
