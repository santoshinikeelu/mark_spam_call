const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth")
const {
  createContact,
  getContact
} = require("../controller/contactController");

router.post("/create-contacts",middleware.tokenValidation, async (req, res) => {
  try {
    const response = await createContact(req.body);
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
router.get("/get-contacts",middleware.tokenValidation, async (req, res) => {
  try {
    const response = await getContact(req.body);
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