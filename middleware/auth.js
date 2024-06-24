let jwtKey = "shoppingcart";
var jwt = require("jsonwebtoken");
const User = require("../model/User");

const tokenValidation = async function (req, res, next) {
  try {
    console.log("check..............", req.headers.accesstoken);
    if (req && req.headers && req.headers.accesstoken) {
      let verifyToken = await jwt.verify(
        req.headers.accesstoken,
        "authenticate"
      );
      console.log("llllllllllllllllll", verifyToken);
      if (verifyToken) {
        req.id = verifyToken.id;
        let userData = await User.findOne({ where: {id: verifyToken.id} });
        console.log('userData', userData)
        if (userData) {
          req.body.userData = userData;
          next();
        }
      } else {
        res.status(401).send("Not Authorized");
      }
    } else {
      res
        .status(401)
        .send({ message: "Please login to continue!!!", code: 401 });
    }
  } catch (e) {
    res.status(401).send(e);
  }
};

module.exports = {
  tokenValidation,
};
