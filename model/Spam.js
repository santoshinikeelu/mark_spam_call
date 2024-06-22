const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");
const Spam = sequelize.define("spam", {
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Spam;
