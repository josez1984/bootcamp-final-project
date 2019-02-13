module.exports = function(sequelize, DataTypes) {
  var Images = sequelize.define("Images", {
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Images.associate = function(models) {
    Images.belongsTo(models.Items, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Images;
};
