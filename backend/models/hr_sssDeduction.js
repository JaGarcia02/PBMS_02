module.exports = (sequelize, DataTypes) => {
  const hr_sssDeduction = sequelize.define(
    "hr_sssDeduction",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Range1: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      Range2: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      Provident_fund: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      Monthly_salary: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      ER: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      EE: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      Total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      Final_EC: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      Provident_ER: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      Provident_EE: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      Final_ER: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      Final_EE: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      Final_Total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );

  return hr_sssDeduction;
};
