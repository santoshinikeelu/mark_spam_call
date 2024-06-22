const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");
const Contact = sequelize.define("contact", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
   
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Contact.associate = (models) => {
  Contact.belongsTo(models.User, { foreignKey: "userId" });
};

module.exports = Contact;
