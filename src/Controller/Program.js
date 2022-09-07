

const ApiResponse = require("../../helpers/ApiResponse");
const HttpStatusCode = require("../../helpers/HttpStatusCode");

exports.getAll = async (req, res) => {
  
  return ApiResponse(res, HttpStatusCode.OK, "ok");
} 