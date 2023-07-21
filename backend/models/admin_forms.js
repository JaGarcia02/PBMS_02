module.exports = (sequelize, DataTypes) => {
  const admin_forms = sequelize.define(
    "admin_forms",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      admin_FormName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin_FormPath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin_Dept: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin_FormStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      admin_DateRequested: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );
  return admin_forms;
};
