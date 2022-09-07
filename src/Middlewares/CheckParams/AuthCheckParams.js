const ApiResponse = require("../../../helpers/ApiResponse");
const FieldRequired = require("../../../helpers/FieldRequired");
const HttpStatusCode = require("../../../helpers/HttpStatusCode");


module.exports = (req, res, next) => {
  let items = [];
  let {username, password} = req.body; 

  if(!username)
    items.push(FieldRequired("username")); 
  
  if(!password)
    items.push(FieldRequired("password")); 


  if(items.length)
    return ApiResponse(
        res, 
        HttpStatusCode.BAD_REQUEST,
        message = "Invalid params",
        items  
    );
  
  next();
} 