module.exports = function(sequelize, DataTypes) {
  var Notification = sequelize.define("Notifications", {
    header: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recordType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recordId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      }
    },
    seen: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  return Notification;
};
