const Sequelize = require("sequelize");
const sequelize = new Sequelize("projectSchema", "root", "santoshini@2000", {
  host: "localhost",
  dialect: "mysql",
});

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
