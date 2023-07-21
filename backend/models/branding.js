module.exports = (sequelize, DataTypes) => {
  const admin_branding = sequelize.define(
    "admin_branding",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Business_Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Business_Address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      TIN: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Logo: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );
  return admin_branding;
};
