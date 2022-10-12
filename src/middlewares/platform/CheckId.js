

const ApiResponse = require("../../../helpers/ApiResponse");
const FieldRequired = require("../../../helpers/FieldRequired");
const HttpStatusCode = require("../../../helpers/HttpStatusCode");
const PlatformRepository = require("../../repositories/PlatformRepository"); 

module.exports = async (req, res, next) => {
    const invalid_params = []; 
    const { platform_id } = req.body; 

    const platform = await PlatformRepository.read(platform_id);

    if(!platform.length){
        invalid_params.push(FieldRequired("platform_id", "A plataforma informada está inválida."));
        return ApiResponse(
            res, 
            HttpStatusCode.BAD_REQUEST, 
            message = "",
            invalid_params
        );
    }

    next()
}