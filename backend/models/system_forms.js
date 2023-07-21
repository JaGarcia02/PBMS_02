module.exports = (sequelize, DataTypes) => {
  const system_forms = sequelize.define(
    "system_forms",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Requestor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Reference_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      validated_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      finished_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      edited_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      canceled_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type_of_form: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      form_department: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );
  return system_forms;
};
