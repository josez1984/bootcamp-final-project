module.exports = function(sequelize, DataTypes) {
  var Images = sequelize.define("Images", {
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.TEXT,
      allowNull: false      
    },
    itemId: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  // Post.associate = function(models) {
  //   // We're saying that a Post should belong to an Author
  //   // A Post can't be created without an Author due to the foreign key constraint
  //   Post.belongsTo(models.Author, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return Images;
};
