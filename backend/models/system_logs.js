module.exports = (sequelize, DataTypes) => {
  const system_logs = sequelize.define(
    "system_logs",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      User: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Action: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );
  return system_logs;
};
