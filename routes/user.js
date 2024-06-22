const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth");
const {
  userRegister,
  searchByName,
  searchBymobileNumber,
} = require("../controller/userController");

router.post("/register-user", async (req, res) => {
  try {
    const response = await userRegister(req.body);
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
router.get("/search-by-name", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const name = req.query.name;
    const response = await searchByName( name, pageSize, skip);
    const {
      message,
      status,
      success,
      count,
      results,
      lastPage,
      hasNextPage,
      users,
      contacts
    } = response;
    if (status === 400) {
      return res.status(status).json({
        success,
        status,
        message,
        results,
        count,
        lastPage,
        hasNextPage,
        users,
        contacts
      });
    } else if (status === 404) {
      return res.status(status).json({
        success,
        status,
        message,
        results,
        count,
        lastPage,
        hasNextPage,
        users,
        contacts
      });
    } else {
      return res.status(status).json({
        success,
        status,
        message,
        users,
        contacts
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
router.get(
  "/search-by-mobile",
  async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * pageSize;
      const mobile = req.query.mobile;
      const response = await searchBymobileNumber( mobile, pageSize, skip);
      const {
        message,
        status,
        success,
        count,
        results,
        lastPage,
        hasNextPage,
        data,
      } = response;
      if (status === 404) {
        return res.status(status).json({
          message,
          status,
          success,
          count,
          results,
          lastPage,
          hasNextPage,
          data,
        });
      } else if (status === 400) {
        return res.status(status).json({
          success,
          status,
          message,
          results,
          count,
          lastPage,
          hasNextPage,
          data,
        });
      } else {
        return res.status(status).json({
          message,
          status,
          success,
          count,
          results,
          lastPage,
          hasNextPage,
          data,
        });
      }
    } catch (e) {
      return res.status(500).json({
        success: false,
        status: 500,
        message: e.message,
      });
    }
  }
);

module.exports = router;
