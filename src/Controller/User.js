
const HttpStatusCode = require("../../helpers/HttpStatusCode");
const ApiResponse = require("../../helpers/ApiResponse");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserRepository = require("../repositories/UserRepository");

exports.authenticate = async (req, res) => {
  
  let {email, password} = req.body; 

  let user = await UserRepository.getUserByEmail(email);

  return bcrypt.compare(password, user.password, async function (err, valid_password) {

    if (!valid_password) {
       return ApiResponse(res, HttpStatusCode.UNAUTHORIZED, "Usuário ou senha inválido.");
    }

    let token = await jwt.sign({
                              data: {
                                email,  
                                exp: 60*60*60
                              }
                             }, 
                             process.env.JWT_SECRET, 
                             {
                              algorithm: "HS256", 
                              expiresIn: 60*60*60
                             });

    return ApiResponse(res, HttpStatusCode.OK, null, data = { token });
  });
}

exports.register = async (req, res) => {
  
  let {email, password, accept_terms} = req.body;

  let user_created = await UserRepository.create({email, password, accept_terms});

  if (!user_created) {
    return ApiResponse(res, HttpStatusCode.UNAUTHORIZED, "Este e-mail já está sendo utilizado, tente outro."); 
  }

  return ApiResponse(res, HttpStatusCode.CREATED, null, {user});
} 