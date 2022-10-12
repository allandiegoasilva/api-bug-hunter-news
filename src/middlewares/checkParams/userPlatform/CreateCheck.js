
const ApiResponse = require("../../../../helpers/ApiResponse");
const FieldRequired = require("../../../../helpers/FieldRequired");
const HttpStatusCode = require("../../../../helpers/HttpStatusCode");
const platformRepository = require("../../../repositories/PlatformRepository"); 

module.exports = async (req, res, next) => {
  let invalid_params = []; 
  const {platform_id, token} = req.body;

  if(!platform_id){
    invalid_params.push(FieldRequired("platform_id", "A plataforma informada está inválida."));
  }

  if(!token){
    invalid_params.push(FieldRequired("token", "Informe o valor do token."));
  }

  if(invalid_params.length){
    return ApiResponse(
      res, 
      HttpStatusCode.BAD_REQUEST, 
      message = "Invalid Params",
      invalid_params
    );
  }
    
  next()
}