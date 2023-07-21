module.exports = (sequelize, DataTypes) => {
  const hr_timekeeping = sequelize.define(
    "hr_timekeeping",
    {
      ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      cutOffID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      REG: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      ABSENT: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      Employee_ID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );

  return hr_timekeeping;
};
