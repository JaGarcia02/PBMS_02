module.exports = (sequelize, DataTypes) => {
  const hr_contractType = sequelize.define(
    "hr_contractType",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      employment_category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );

  return hr_contractType;
};
