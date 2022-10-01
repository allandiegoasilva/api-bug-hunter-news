
const mysql = require("mysql2");

require("dotenv").config({path: "../../.env"});

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 100, 
});


exports.query = (query, params = []) => {
  
   return new Promise((resolve, reject) => {
     connection.query(query, params, (err, results) => {
        connection.end(); 

        if(err)
            reject(err);
        
        resolve(results); 
     });
   });
} 

