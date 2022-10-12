
const jwt = require("jsonwebtoken");
const ApiResponse = require("../../../helpers/ApiResponse");
const HttpStatusCode = require("../../../helpers/HttpStatusCode");


module.exports = async (req, res, next) => {

  const authorization = req.header('authorization'); 

  if(typeof authorization == 'undefined')
    return ApiResponse(res, HttpStatusCode.UNAUTHORIZED, "Token inválido ou expirado.");

  const [, token ] = authorization.split("Bearer"); 
  
  return jwt.verify(token.trim(), process.env.JWT_SECRET, (err, data) => {
  
    if(err)
      return ApiResponse(res, HttpStatusCode.UNAUTHORIZED, "Token inválido ou expirado.", err);

    req.user = data.data; 
    
    next();
  });  
}