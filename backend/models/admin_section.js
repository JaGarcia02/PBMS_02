module.exports = (sequelize, DataTypes) => {
  const admin_section = sequelize.define(
    "admin_section",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      admin_sectionName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin_sectionStatus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin_sectionDepartment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );
  return admin_section;
};
