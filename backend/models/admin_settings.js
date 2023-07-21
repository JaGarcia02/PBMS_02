module.exports = (sequelize, DataTypes) => {
  const admin_setting = sequelize.define(
    "admin_setting",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Timezone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      DateTimeFormat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Region: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Language: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Currency: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );
  return admin_setting;
};
