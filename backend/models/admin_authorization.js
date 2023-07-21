module.exports = (sequelize, DataTypes) => {
  const admin_authorization = sequelize.define(
    "admin_authorization",
    {
      ID: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      admin_authDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin_authNumberRole: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin_view: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      admin_add: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      admin_edit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      admin_print: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      admin_void: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      admin_delete: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );
  return admin_authorization;
};
