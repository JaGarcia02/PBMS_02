module.exports = (sequelize, DataTypes) => {
  const hr_dtr = sequelize.define(
    "hr_dtr",
    {
      ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      Time: { type: DataTypes.STRING, allowNull: true },
      BioID: { type: DataTypes.STRING, allowNull: true },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );
  return hr_dtr;
};
