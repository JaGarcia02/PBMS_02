module.exports = (sequelize, DataTypes) => {
  const admin_users = sequelize.define(
    "admin_users",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Admin_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Admin_username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Admin_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );
  return admin_users;
};
