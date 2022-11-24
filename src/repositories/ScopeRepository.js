
const db = require("../config/database")

exports.read = async (program_id) => {

  const [scope] = await db.query(`SELECT * FROM program_scopes WHERE program_scopes.id = ?`, [program_id]);

  if (scope)
    return scope;

  return false;
}