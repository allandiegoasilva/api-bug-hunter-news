/* 
 * Check if user platform already added
 */
const ApiResponse = require("../../../helpers/ApiResponse");
const HttpStatusCode = require("../../../helpers/HttpStatusCode");
const UserPlatformRepository = require("../../repositories/UserPlatformRepository");

module.exports = async (req, res, next) => {
  const { platform_id } = req.body;
  const { id } = req.user;

  const added = await UserPlatformRepository.read({user_id: id, platform_id}); 

  if(added.length){
    return ApiResponse(
      res, 
      HttpStatusCode.UNAUTHORIZED, 
      "Plataforma já adicionada."
    );
  }

  next(); 
}