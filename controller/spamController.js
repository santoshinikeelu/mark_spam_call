const Spam = require("../model/Spam");
module.exports = {
  createSpam: async (data) => {
    try {
      if (Object.keys(data).length == 0) {
        return {
          status: 400,
          success: false,
          message: "All fields Mandatory",
          data: null,
        };
      }
      let createSpam = await Spam.create(data);
      createSpam.password = undefined;
      return {
        status: 200,
        success: true,
        message: "spam numbar created successfully",
        data: createSpam,
      };
    } catch (error) {
      console.log("error", error);
      return {
        status: 500,
        success: false,
        message: error.message,
      };
    }
  },
}