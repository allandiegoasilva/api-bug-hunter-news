

const HttpStatusCode = require("../../helpers/HttpStatusCode");
const Auth = require("./Auth");
const Program = require("./Program");

module.exports = ( app ) => {
    try {
      
       app.use("/auth", Auth); 
       app.use("/program", Program); 

        
       app.use((req, res) => res.status(HttpStatusCode.NOT_FOUND)
                                .send({ message: "What are you doing bro? I will looking for you 0_0"}));

    } catch (error) {
      
    }


    
} 