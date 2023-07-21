module.exports = (sequelize, DataTypes) => {
  const hr_schedule = sequelize.define(
    "hr_schedule",
    {
      ID: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      schedule_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      schedule_workdayFrom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      schedule_workdayTo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      schedule_timeFrom: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      schedule_timeTo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      schedule_restdayFrom: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      schedule_restdayTo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      schedule_restday: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );
  return hr_schedule;
};
