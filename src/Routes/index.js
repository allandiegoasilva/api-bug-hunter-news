

const HttpStatusCode = require("../../helpers/HttpStatusCode");
const Auth = require("./Auth");

module.exports = ( app ) => {
    try {
      
       app.use("/auth", Auth); 

        
       app.use((err, req, res) => res.status(HttpStatusCode.NOT_FOUND).send({ message: "What are you doing bro? I will looking for you 0_0"}));

    } catch (error) {
        
    }


    
} 