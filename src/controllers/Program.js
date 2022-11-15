const HttpStatusCode = require("../../helpers/HttpStatusCode");
const ApiResponse = require("../../helpers/ApiResponse");
const ProgramRepository = require("../repositories/ProgramRepository");

exports.read = async (req, res) => {
  const { id } = req.user;
  let programs = await ProgramRepository.read({ user_id: id });
  programs = !programs ? [] : programs.map(program => {
    program.scopes = program.scopes.map(scope => {
      scope.tecnologies = scope.tecnologies.split(";");
      return scope;
    });
    return program;
  });

  return ApiResponse(
    res,
    HttpStatusCode.OK,
    null,
    programs
  );
}


exports.favorite = async (req, res) => {
  const { id } = req.user;
  const program_id = req.params.program_id;
  await ProgramRepository.favorite({ user_id: id, program_id });

  return ApiResponse(
    res,
    HttpStatusCode.OK,
    "Programa favoritado com sucesso!"
  );
}

exports.delete = async (req, res) => {
  const { id } = req.user;
  const program_id = req.params.program_id;
  await ProgramRepository.delete({ user_id: id, program_id });

  return ApiResponse(
    res,
    HttpStatusCode.OK,
    "Programa removido como favorito."
  );
}
