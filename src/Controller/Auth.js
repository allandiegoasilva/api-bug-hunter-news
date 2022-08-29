
const StatusCode = require("../../helpers/HttpStatusCode");

exports.verify = (req, res) => {

    return res.status(StatusCode.OK)
              .send({
                message: "a rota funcionou agora é só conectar com o firebase"
              })

}