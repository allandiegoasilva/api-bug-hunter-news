const ApiResponse = require("../../helpers/ApiResponse");
const HttpStatusCode = require("../../helpers/HttpStatusCode");
const UserPlatformRepository = require("../repositories/UserPlatformRepository")

function getParams(req) {
  const { id } = req.user;
  const {platform_id, token} = req.body; 
  
  return {
    user_id: id, 
    platform_id, 
    token
  }
}

exports.create = async (req, res) => {	
  const { user_id, platform_id, token } = getParams(req);

  const created = await UserPlatformRepository.create({user_id, platform_id, token}); 

  const httpCode = created ? HttpStatusCode.CREATED : HttpStatusCode.INTERNAL;
  const message = created ? "Chave adicionada com sucesso!" : "Erro interno"; 

  return ApiResponse(res, httpCode, message);
}

exports.read = async (req, res) => {
  const { user_id } = getParams(req); 
  const platform_id = req.params?.platform_id; 

  const userPlatforms = await UserPlatformRepository.read({user_id, platform_id});
  const message = !userPlatforms.length && "Plataforma não encontrada."; 
      
  return ApiResponse(res, HttpStatusCode.OK, message, userPlatforms)
}

exports.update = async (req, res) => {
  const { user_id, platform_id, token } = getParams(req);

  const updated = await UserPlatformRepository.update({user_id, platform_id, token}); 
  
  const httpCode = updated ? HttpStatusCode.OK : HttpStatusCode.INTERNAL;
  const message = updated ? "Chave atualizada com sucesso!" : "Erro interno"; 

  return ApiResponse(res, httpCode, message);
}

exports.delete = async (req, res) => {
  const { user_id } = getParams(req); 
  const platform_id = req.params.platform_id; 

  await UserPlatformRepository.delete({user_id, platform_id}); 

  return ApiResponse(res, HttpStatusCode.OK, "Chave removida com sucesso!");
}