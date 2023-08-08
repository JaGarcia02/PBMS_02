module.exports = (sequelize, DataTypes) => {
  const hr_employeeStatus = sequelize.define("hr_employeeStatus", {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employee_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return hr_employeeStatus;
};
