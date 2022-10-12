
const db = require("../config/database");

exports.read = async (id) => {
  let query = "SELECT * FROM platforms";
  let params = []; 

  if(id){
    query += " WHERE id = ?"
    params.push(id);
  }
    
  const results = await db.query(query, params);

  if (results)
    return results; 

  return false; 
}