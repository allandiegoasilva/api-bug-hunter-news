
const HttpStatusCode = require("../../helpers/HttpStatusCode");
const ApiResponse = require("../../helpers/ApiResponse");
const Tools = require("../../helpers/Tools");
const AutomationRepository = require("../repositories/AutomationRepository");
const ScopeRepository = require('../repositories/ScopeRepository')
const automate = require("../../services/AutomateService");

exports.automate = async (req, res) => {
  const { id } = req.user;
  const { program_id } = req.params;

  const { scopes, tools } = req.body


  scopes.map(async scope => {

    const { id: scope_id, domain } = await ScopeRepository.read(scope);

    let toolsToAutomate = [];

    const nmap = tools.indexOf(Tools.NMAP) > -1;
    const dig = tools.indexOf(Tools.DIG) > -1;
    const whois = tools.indexOf(Tools.WHOIS) > -1;


    if (nmap)
      toolsToAutomate.push(Tools.NMAP)

    if (dig)
      toolsToAutomate.push(Tools.DIG)

    if (whois)
      toolsToAutomate.push(Tools.WHOIS)

    automate.automate(domain, toolsToAutomate);
    await AutomationRepository.create({
      user_id: id,
      scope_id: scope,
      program_id: program_id,
      tools: toolsToAutomate
    });
  });

  return ApiResponse(
    res,
    HttpStatusCode.OK,
    "Automação inicializada."
  );
}

exports.read = async (req, res) => {
  const { id } = req.user;

  const items = await AutomationRepository.read(id);


  return ApiResponse(
    res,
    HttpStatusCode.OK,
    "Automações retornadas",
    items
  );
}