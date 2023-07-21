module.exports = (sequelize, DataTypes) => {
  const hr_philhealthDeductions = sequelize.define(
    "hr_philhealthDeductions",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      hr_PhilHealth: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );
  return hr_philhealthDeductions;
};
