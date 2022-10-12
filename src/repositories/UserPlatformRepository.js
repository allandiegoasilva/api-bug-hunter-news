const db = require("../config/database")

exports.create = async ({user_id, platform_id, token}) => {
   const created = await db.query(`INSERT INTO user_api_keys(user_id, platform_id, api_key) VALUES (?,?,?)`, 
                                  [user_id, platform_id, token]
                                );

   return created.affectedRows > 0; 
}

exports.read = async ({ user_id, platform_id = null }) => {
  let query = "SELECT * FROM user_api_keys WHERE user_id = ? ";
  let params = [user_id]; 
  
  if(platform_id){
    query += " AND platform_id = ?"
    params.push(platform_id);
  }
    
  const results = await db.query(query, params);

  if (results)
    return results; 

  return false; 
}

exports.update = async ({user_id, platform_id, token}) => {
    const updated = await db.query(`UPDATE user_api_keys 
                                       SET api_key = ? 
                                     WHERE user_id = ? 
                                       AND platform_id = ?`, 
                                  [token, user_id, platform_id]
                                );

   return updated.affectedRows > 0; 
}

exports.delete = async ({user_id, platform_id}) => {
  await db.query(`DELETE FROM user_api_keys WHERE user_id = ? AND platform_id = ?`, [user_id, platform_id]);
}