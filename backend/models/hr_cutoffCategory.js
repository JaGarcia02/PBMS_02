module.exports = (sequelize, DataTypes) => {
  const hr_cutoffCategory = sequelize.define("hr_cutoffCategory", {
    ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cutOff: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cutOff_year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return hr_cutoffCategory;
};
