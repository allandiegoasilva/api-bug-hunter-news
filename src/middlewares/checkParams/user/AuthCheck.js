const ApiResponse = require("../../../../helpers/ApiResponse");
const FieldRequired = require("../../../../helpers/FieldRequired");
const HttpStatusCode = require("../../../../helpers/HttpStatusCode");
const UserRepository = require("../../../repositories/UserRepository"); 

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

module.exports = async (req, res, next) => {
  let items = [];
  let {email, password} = req.body; 

  if (!validateEmail(email)) {
    items.push(FieldRequired("email", "Formato de e-mail inválido."));
  }
     
  if (!password) {
    items.push(FieldRequired("password", "Informe a senha nos parametros para autenticação")); 
  }
    
  if(items.length)
    return ApiResponse(
        res, 
        HttpStatusCode.BAD_REQUEST,
        message = "Invalid params",
        items  
    );
    
  const user = await UserRepository.getUserByEmail(email); 
  if(!user){
    return ApiResponse(
      res, 
      HttpStatusCode.BAD_REQUEST,
      message = "Usuário ou senha inválido",
      items  
    );
  }

  next();
} 