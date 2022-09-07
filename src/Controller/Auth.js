
const HttpStatusCode = require("../../helpers/HttpStatusCode");
const ApiResponse = require("../../helpers/ApiResponse");
const jwt = require("jsonwebtoken");

exports.verify = async (req, res) => {
  
  let {username, password} = req.body; 

  if(username != "xgodgodx" || password != "123456")
    return ApiResponse(res, HttpStatusCode.UNAUTHORIZED, "Usuário ou senha estão inválidos."); 


  let token = await jwt.sign({
                              data: {
                                username, 
                                exp: 60*60
                              }
                             }, 
                             process.env.JWT_SECRET, 
                             {
                              algorithm: "HS256", 
                              expiresIn: 60*60
                             });

  return ApiResponse(res, HttpStatusCode.OK, null, data = { token });
}