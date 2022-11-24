
const { exec } = require("child_process");

/* 
 * Exec shell command to automate the program recon. 
 * @domain : string 
 * @tools : array 
*/
exports.automate = async (domain, tools) => {
  const command = `automation --domain=${domain} --tool=${tools.join(',')}`;

  console.log("entrou aqui...");
  await exec(command);
} 