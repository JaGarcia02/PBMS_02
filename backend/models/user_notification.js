module.exports = (sequelize, DataTypes) => {
  const user_notification = sequelize.define(
    "user_notification",
    {
      ID: {
        type: DataTypes.INTEGER,

        primaryKey: true,
        autoIncrement: true,
      },
      user_notif_desc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_notif_roles: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_notif_dept: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_notif_link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );
  return user_notification;
};
