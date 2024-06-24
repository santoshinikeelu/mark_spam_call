const Contact = require("../model/Contact");
const { isValidName, isValidMobile } = require("../validator/validator");

module.exports = {
  createContact: async (data) => {
    try {
        console.log('data', data)
      if (Object.keys(data).length == 0) {
        return {
          status: 400,
          success: false,
          message: "All fields Mandatory",
          data: null,
        };
      }

      if (!isValidName(data.name)) {
        return {
          status: 400,
          success: false,
          message: "name must be in alphabetical order",
          data: null,
        };
      }
      if (!isValidMobile(data.mobile)) {
        return {
          status: 400,
          success: false,
          message: "provide a valid number",
          data: null,
        };
      }
   console.log('data.userData.id', data.userData.id)
      data.userId = data.userData.id;
      let savedContacts = await Contact.create(data);
      return {
        status: 200,
        success: true,
        message: "user's contact created successfully",
        data: savedContacts,
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
  getContact: async (data) => {
    try {
      let savedContacts = await Contact.findAll({
        where: {
          userId: data.userData.id,
        },
      });
      return {
        status: 200,
        success: true,
        message: "user's contact fetched successfully",
        data: savedContacts,
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
};
