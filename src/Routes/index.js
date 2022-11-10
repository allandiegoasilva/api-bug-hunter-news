
const HttpStatusCode = require("../../helpers/HttpStatusCode");

const AuthMiddleware = require("../middlewares/authentication/UserAuthenticated");

const User = require("./User");
const Program = require("./Program");
const UserPlatform = require("./UserPlatform");

module.exports = ( app ) => {
    try {
      
       app.use("/user", User); 
       app.use("/program", AuthMiddleware, Program); 
       app.use("/user/platform", AuthMiddleware, UserPlatform); 

       app.use((req, res) => res.status(HttpStatusCode.NOT_FOUND)
                                .send({ message: "What are you doing bro? I will looking for you 0_0"}));

    } 
    catch (error) {
      
    }
} 