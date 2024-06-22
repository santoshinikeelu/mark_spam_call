const express = require("express");
const router = express.Router();
const {
  createSpam,
} = require("../controller/spamController");

router.post("/create-spam", async (req, res) => {
  try {
    const response = await createSpam(req.body);
    const { message, status, success, data } = response;
    if (status === 400) {
      return res.status(status).json({
        success,
        status,
        message,
        data,
      });
    } else if (status === 404) {
      return res.status(status).json({
        success,
        status,
        message,
        data,
      });
    } else {
      return res.status(status).json({
        success,
        status,
        message,
        data,
      });
    }
  } catch (e) {
    console.log(e, "..........e");
    return res.status(500).json({
      success: false,
      status: 500,
      message: e.message,
    });
  }
});
module.exports = router;