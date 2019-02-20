module.exports = function(sequelize, DataTypes) {
  var Offer = sequelize.define("Offers", {
    dollarAmt: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    itemId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Items",
        key: "id"
      }
    }
  });

  Offer.associate = function(models) {
    Offer.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }      
    });

    Offer.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      },
      as: 'UserIdReceiver'
    });
  };

  // Item.associate = function(models) {
  //   Item.hasMany(models.Images);
  // }

  return Offer;
};
