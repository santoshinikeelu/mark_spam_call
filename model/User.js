const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");
const User = sequelize.define("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
User.associate = (models) => {
  User.hasMany(models.Contact, { foreignKey: "userId" });
};
// async function dropIndexes() {
//   try {
//     const [indexes] = await sequelize.query(`SHOW INDEX FROM users;`);
//     for (const index of indexes) {
//       if (index.Key_name !== 'PRIMARY') {
//         await sequelize.query(`ALTER TABLE users DROP INDEX ${index.Key_name};`);
//         console.log(`Dropped index ${index.Key_name}`);
//       }
//     }

//     console.log('Indexes dropped successfully.');
//   } catch (error) {
//     console.error('Error dropping indexes:', error);
//   }
// }

// dropIndexes();

module.exports = User;
