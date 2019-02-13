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
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    }
  });

  Item.associate = function(models) {
    Item.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });

    Item.hasMany(models.Images);
  };

  // Item.associate = function(models) {
  //   Item.hasMany(models.Images);
  // }

  return Item;
};
