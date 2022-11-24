const Tools = require("../../helpers/Tools");
const db = require("../config/database")




exports.create = async ({ user_id, scope_id, program_id, tools }) => {
  const nmap = tools.indexOf(Tools.NMAP) > -1 ? 1 : 0;
  const dig = tools.indexOf(Tools.DIG) > -1 ? 1 : 0;
  const whois = tools.indexOf(Tools.WHOIS) > -1 ? 1 : 0;

  const created = await db.query(`INSERT INTO user_automation_scope(id_user, id_program, id_scope, nmap, dig, whois) 
                                   VALUES (?,?,?,?,?,?)`,
    [user_id, program_id, scope_id, nmap, dig, whois]
  );

  return created.affectedRows > 0;
}

exports.read = async (user_id) => {

  const data = await db.query(`SELECT *, 
  (SELECT program_scopes.domain 
     FROM program_scopes 
    WHERE program_scopes.id = user_automation_scope.id_scope) as domain, 
  (SELECT title as program_title
    FROM programs 
    WHERE programs.id = user_automation_scope.id_program) as program_title,
  (SELECT image as program_image 
    FROM programs 
    WHERE programs.id = user_automation_scope.id_program) as program_title
FROM user_automation_scope
WHERE id_user = ?
ORDER BY id DESC`, [user_id]);

  if (data)
    return data;

  return false;
}
