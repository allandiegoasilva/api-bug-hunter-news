
const HttpStatusCode = require("../../helpers/HttpStatusCode");
const ApiResponse = require("../../helpers/ApiResponse");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserRepository = require("../repositories/UserRepository");

async function getToken({email}){
  const expire = 60*60*60; 
  let user = await UserRepository.getUserByEmail(email);
  delete user.password; 

  let token = await jwt.sign({
                              data: user
                             }, 
                             process.env.JWT_SECRET, 
                             {
                              algorithm: "HS256", 
                              expiresIn:expire
                             });

  return token; 
}

exports.authenticate = async (req, res) => {
  
  let {email, password} = req.body; 

  let user = await UserRepository.getUserByEmail(email);
  
  return bcrypt.compare(password, user.password, async function (err, valid_password) {

    if (!valid_password) {
       return ApiResponse(res, HttpStatusCode.UNAUTHORIZED, "Usuário ou senha inválido.");
    }

    let token = await getToken({email});

    return ApiResponse(res, HttpStatusCode.OK, null, data = { token });
  });
}

exports.register = async (req, res) => {
  
  let {email, password, accept_terms} = req.body;

  return bcrypt.hash(password, 1, async function (err, hash) {
    if (err)
      throw err; 
    
    const user_created = await UserRepository.create({email, password: hash, accept_terms});
 
    if (!user_created) {
      return ApiResponse(res, HttpStatusCode.UNAUTHORIZED, "Este e-mail já está sendo utilizado, tente outro."); 
    }
    
    let token = await getToken({email});

    return ApiResponse(res, HttpStatusCode.CREATED, null, {token});
  });
} 