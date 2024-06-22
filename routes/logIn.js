const router = require("express").Router();
const middleware = require("../middleware/auth");
const {
  logIn
} = require("../controller/loginController");
router.post("/login", async (req, res) => {
    try {
      // console.log('req.body', req.body)
      const response = await logIn(req.body);
      const { message, status, success, user,accessToken } = response;
      if (status === 400) {
        return res.status(status).json({
          success,
          status,
          message,
          accessToken,
          user,
        });
      } 
    else  if (status === 404) {
        return res.status(status).json({
          success,
          status,
          message,
          accessToken,
          user,
        });
      } 
      else {
        return res.status(status).json({
          success,
          status,
          message,
          accessToken,
          user,
        });
      }
    } catch (e) {
      return res.status(500).json({
        success: false,
        status: 500,
        message: e.message,
      });
    }
  });
  module.exports = router