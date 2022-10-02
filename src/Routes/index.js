

const HttpStatusCode = require("../../helpers/HttpStatusCode");
const User = require("./User");
const Program = require("./Program");

module.exports = ( app ) => {
    try {
      
       app.use("/user", User); 
       app.use("/program", Program); 

        
       app.use((req, res) => res.status(HttpStatusCode.NOT_FOUND)
                                .send({ message: "What are you doing bro? I will looking for you 0_0"}));

    } catch (error) {
      
    }
} 