const Sequelize = require("sequelize");
require("dotenv").config({});
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.USER,
  process.env.PASSWORD,
  {
    port: process.env.PORT,
    host: process.env.HOST,
    dialect: "mysql",
  }
);

const connection = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database: ", error);
    });
};
sequelize.sync({ alter: true });
module.exports = {
  connection,
  sequelize,
};
