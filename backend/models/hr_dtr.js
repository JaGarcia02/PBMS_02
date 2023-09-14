module.exports = (sequelize, DataTypes) => {
  const hr_dtr = sequelize.define(
    "hr_dtr",
    {
      ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      Cutoff: { type: DataTypes.STRING, allowNull: false },
      Date_day: { type: DataTypes.STRING, allowNull: false },
      Time_in: { type: DataTypes.STRING, allowNull: false },
      Time_break_start: { type: DataTypes.STRING, allowNull: false },
      Time_break_end: { type: DataTypes.STRING, allowNull: false },
      Time_out: { type: DataTypes.STRING, allowNull: false },
      BioID: { type: DataTypes.STRING, allowNull: false },
      EmpID: { type: DataTypes.STRING, allowNull: false },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );
  return hr_dtr;
};
