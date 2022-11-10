const HttpStatusCode = require("../../helpers/HttpStatusCode");
const ApiResponse = require("../../helpers/ApiResponse");
const Hackerone = require("../services/Hackerone");
const UserPlatformRepository = require("../repositories/UserPlatformRepository");

exports.read = async (req, res) => {
  const user = req.user;
   
  const platforms = await UserPlatformRepository.read({user_id: user.id}); 

  const hackerone = new Hackerone(platforms[0].api_key); 
  const programs = await hackerone.programs(); 
  
  return ApiResponse(
    res, 
    HttpStatusCode.OK,
    null, 
    programs 
  );
}

