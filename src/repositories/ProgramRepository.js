const db = require("../config/database")


exports.read = async ({ user_id }) => {
  let query = `SELECT programs.*,
                      program_payments.*, 
                      (SELECT platforms.name 
                        FROM platforms 
                       WHERE platforms.id = programs.platform_id
                      ) as platform_name,
                      (SELECT COUNT(1) > 0 
                         FROM user_favourite_programs 
                        WHERE user_favourite_programs.user_id = ? 
                          AND user_favourite_programs.program_id = programs.id) as favorite, 
                      (SELECT json_arrayagg(
                                json_object('id', program_scopes.id,
                                            'target', program_scopes.domain, 
                                            'elegible', program_scopes.elegible,
                                            'tecnologies', program_scopes.tecnologies,
                                            'gravity', (CASE WHEN program_scopes.gravity  = 1 THEN 'CRITICAL'
                                                              WHEN program_scopes.gravity = 2 THEN 'MEDIUM'
                                                              WHEN program_scopes.gravity = 3 THEN 'HIGH'
                                                              WHEN program_scopes.gravity = 4 THEN 'LOW'
                                                          END)
                                            ))
                                FROM program_scopes
                               WHERE program_scopes.id_program = programs.id
                            ORDER BY program_scopes.gravity) as scopes
                 FROM programs, program_payments
                WHERE program_payments.id_program = programs.id;`;

  const results = await db.query(query, [user_id]);

  if (results)
    return results;
  return false;
}

async function deleteUserProgram({ user_id, program_id }) {
  let query = `DELETE FROM user_favourite_programs WHERE user_id = ? AND program_id = ?`;
  await db.query(query, [user_id, program_id]);
}

exports.favorite = async ({ user_id, program_id }) => {
  await deleteUserProgram({ user_id, program_id });

  let query = `INSERT INTO user_favourite_programs (user_id, program_id) VALUES (?,?)`;
  let created = await db.query(query, [user_id, program_id]);

  return created.affectedRows > 0;
}

exports.delete = async ({ user_id, program_id }) => await deleteUserProgram({ user_id, program_id });
