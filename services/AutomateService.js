
const { exec } = require("child_process");

/* 
 * Exec shell command to automate the program recon. 
 * @domain : string 
 * @tools : array 
*/
exports.automate = (domain, tools) => {
  const command = `automation --domain=${domain} --tool=${tools.join(',')}`
  exec(command)
} 