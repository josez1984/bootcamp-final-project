module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Items", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false      
    },
    condition: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Item.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Item.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Item;
};
