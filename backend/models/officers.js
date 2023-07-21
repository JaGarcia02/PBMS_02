module.exports = (sequelize, DataTypes) => {
  const admin_officers = sequelize.define(
    "admin_officers",
    {
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Contact_num: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );
  return admin_officers;
};
