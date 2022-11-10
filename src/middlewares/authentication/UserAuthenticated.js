
const jwt = require("jsonwebtoken");
const ApiResponse = require("../../../helpers/ApiResponse");
const HttpStatusCode = require("../../../helpers/HttpStatusCode");

const envoriment = require("../../config/envoriment");

module.exports = async (req, res, next) => {

  const authorization = req.header('authorization');

  if (typeof authorization == 'undefined')
    return ApiResponse(res, HttpStatusCode.UNAUTHORIZED, "Token inválido ou expirado.");

  const [, token] = authorization.split("Bearer");

  return jwt.verify(token.trim(), envoriment.default.jwt_key, (err, data) => {

    if (err)
      return ApiResponse(res, HttpStatusCode.UNAUTHORIZED, "Token inválido ou expirado.", err);

    req.user = data.data;

    next();
  });
}