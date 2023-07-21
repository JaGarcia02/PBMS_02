module.exports = (sequelize, DataTypes) => {
  const admin_openJobs = sequelize.define(
    "admin_openJobs",
    {
      ID: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      request_position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      request_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      request_department: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      request_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      request_positionLevel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      request_salary: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      request_jobDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      request_qualification: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      request_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      request_specifiactionWorkExperience: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );
  return admin_openJobs;
};
