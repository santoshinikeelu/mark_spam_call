const User = require("../model/User");
const Contact = require("../model/Contact");
const bcrypt = require("bcrypt");
const { isValidName, isValidEmail,isValidMobile } = require("../validator/validator");
const { Op } = require("sequelize");
module.exports = {
  userRegister: async (data) => {
    try {
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
      if (!isValidEmail(data.email)) {
        return {
          status: 400,
          success: false,
          message: "provide a valid email",
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

      let isexisted = await User.findOne({
        where: {
          email: data.email,
        },
      });

      if (isexisted) {
        return {
          status: 400,
          success: false,
          message: "Email & Mobile No. already exist",
          data: null,
        };
      }
      let bcryptpass = await bcrypt.hash(data.password, 8);
      data.password = bcryptpass;

      let savedUser = await User.create(data);
      savedUser.password = undefined;
      return {
        status: 200,
        success: true,
        message: "user created successfully",
        data: savedUser,
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
  searchByName: async (name) => {
    try {
      console.log("name", name);
      const savedUsers = await User.findAll({
        where: { name: { [Op.like]: `%${name}%` } },
        attributes: ["name", "mobile", "email"],
      });
      const savedContacts = await Contact.findAll({
        where: { name: { [Op.like]: `%${name}%` } },
      });
      return {
        status: 200,
        success: true,
        message: " fetched successfully",
        users: savedUsers,
        contacts: savedContacts,
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

  searchBymobileNumber: async (mobile) => {
    try {
      console.log('mobile', mobile)
      const user = await User.findOne({ where: { mobile: mobile } });
      const contacts = await Contact.findAll({ where: { mobile: mobile } });
      console.log('contacts', contacts)
      if (user) {
        return {
          status: 200,
          success: true,
          message: "user fetched successfully",
          data: user,
        };
      } else if (contacts.length > 0) {
        return {
          status: 200,
          success: true,
          message: "contacts fetched successfully",
          data: contacts,
        };
      } else {
        return {
          status: 400,
          success: false,
          message: "Spam Caller!!!",
        };
      }
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
