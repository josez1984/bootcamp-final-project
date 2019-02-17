module.exports = function(sequelize, DataTypes) {
  var OfferItem = sequelize.define("OfferItems", {
    itemId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Items",
        key: "id"
      }
    },
    offerId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Offers",
        key: "id"
      }
    }
  });
  
  return OfferItem;
};
