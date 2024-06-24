const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const User = require("../model/User");
module.exports = {
  logIn: async (data) => {
    console.log(data);
    try {
      let token;
      let user = await User.findOne({  where: {
        email: data?.email?.toLowerCase() 
        } });
        console.log('user', user)
       if (user ) {
          var isMatchPassword = await bcrypt.compare(
            data.password,
            user.password
          );

          console.log(isMatchPassword, "isfghj");
console.log('first',  user.id)
          if (isMatchPassword) {
            user.password = undefined;
            token = await jwt.sign({ id: user.id }, "authenticate");
            console.log(token, "token");
            return {
              status: 200,
              success: true,
              message: "login success",
              accessToken: token,
              user: user,
            };
          } else {
            return {
              status: 400,
              success: false,
              message: "Wrong Password",
              user: null,
            };
          }
        
      }  else {
        return {
          status: 400,
          success: false,
          message: "User Not Found!!!",
          user: null,
        };
      }
    } catch (e) {
      console.log(e, "eeeeeeeeeeeee");
      return {
        status: 500,
        success: false,
        message: e.message,
      };
    }
  },
};
