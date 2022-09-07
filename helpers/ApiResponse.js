let HttpStatusCode = require("./HttpStatusCode");

module.exports = (res, status = HttpStatusCode.OK, message = null, data = {}) => {
   
  return res.status(status)
            .send({
              message,
              data 
            });
}