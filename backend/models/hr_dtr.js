module.exports = (sequelize, DataTypes) => {
  const hr_dtr = sequelize.define(
    "hr_dtr",
    {
      ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      cutOffID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Time: { type: DataTypes.STRING, allowNull: true },
      Date: { type: DataTypes.STRING, allowNull: true },
      BioID: { type: DataTypes.STRING, allowNull: true },
      TR: { type: DataTypes.STRING, allowNull: true },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );
  return hr_dtr;
};
