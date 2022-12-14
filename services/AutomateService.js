
const { exec } = require("child_process");

/* 
 * Exec shell command to automate the program recon. 
 * @domain : string 
 * @tools : array 
*/
exports.automate = async (domain, tools) => {
  const command = `python3 /home/automation/main.py --domain=${domain} --tool=${tools.join(',')}`;

  console.log(command);

  exec(command, (err, stdout, strderr) => {
    console.log(err);
    console.log(stdout);
    console.log(strderr);
  });
} 