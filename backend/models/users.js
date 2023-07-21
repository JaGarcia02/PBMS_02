module.exports = (sequelize, DataTypes) => {
  const users_data = sequelize.define(
    "users_data",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING,
      },
      permission: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      access_right: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      position: {
        type: DataTypes.STRING,
      },
      division: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      branch: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      section: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      employee_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      MiddleName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      acctStatus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Suspension: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      counterLogin: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lastLogin: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      online_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      change_password: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      expired_at: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );
  return users_data;
};
