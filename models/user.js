const uuid = require('uuid/v4');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("Users", {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: sequelize.literal('uuid_generate_v4()')
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false      
    }
  });

  // Item.associate = function(models) {
  //   // We're saying that a Post should belong to an Author
  //   // A Post can't be created without an Author due to the foreign key constraint
  //   Item.belongsTo(models.userId, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return User;
};
