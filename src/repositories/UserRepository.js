
const db = require("../config/database");
const bcrypt = require("bcrypt"); 

exports.create = async ({email, password}) => {
  const results = await db.query("SELECT (count(1) > 0) as user_already_exist FROM users WHERE users.email = ? LIMIT 1", [email]);
  
  if (results[0].user_already_exist) {
    return false; 
  }

  return bcrypt.hash(password, 1, async function (err, hash) {
    if (err)
      throw err; 

    const results = await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hash]);
    const user_created = results.affectedRows > 0;

    return user_created; 
  });
}

exports.getUserByEmail = async (email) => {
  const results = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  if (results)
    return results[0]; 
  
  return false; 
}