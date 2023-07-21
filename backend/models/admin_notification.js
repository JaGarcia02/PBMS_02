module.exports = (sequelize, DataTypes) => {
  const admin_notification = sequelize.define(
    "admin_notification",
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      notif_desc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      notif_user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      notif_status: {
        type: DataTypes.INTEGER,
        allowNullL: false,
      },
      notif_link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );

  return admin_notification;
};
