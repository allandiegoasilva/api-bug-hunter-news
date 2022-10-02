const ApiResponse = require("../../../helpers/ApiResponse");
const FieldRequired = require("../../../helpers/FieldRequired");
const HttpStatusCode = require("../../../helpers/HttpStatusCode");

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

module.exports = (req, res, next) => {
  let items = [];
  let {email, password} = req.body; 

  if (!validateEmail(email)) {
    items.push(FieldRequired("email", "E-mail inválido"));
  }
     
  
  if (!password) {
    items.push(FieldRequired("password", "Informe a senha para autenticação")); 
  }
    


  if(items.length)
    return ApiResponse(
        res, 
        HttpStatusCode.BAD_REQUEST,
        message = "Invalid params",
        items  
    );
  
  next();
} 