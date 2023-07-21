module.exports = (sequelize, DataTypes) => {
  const hr_pagibigDeductions = sequelize.define(
    "hr_pagibigDeductions",
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pagibig_value: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );
  return hr_pagibigDeductions;
};
