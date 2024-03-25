"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class supervisor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  supervisor.init(
    {
      user_id: DataTypes.STRING,
      office: DataTypes.STRING,
      specialization: DataTypes.STRING,
      deleted_at: DataTypes.DATE,
      is_deleted: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "supervisor",
    }
  );
  supervisor.associate = function (models) {
    supervisor.hasOne(models.user, { foreignKey: "id" });
    models.user.belongsTo(supervisor, { foreignKey: "id" });
    supervisor.belongsTo(models.department, { foreignKey: "id" });
    supervisor.hasMany(models.supervisor_committee, { foreignKey: "supervisor_id" });
    supervisor.hasMany(models.group, { foreignKey: "supervisor_id" });
  };
  return supervisor;
};
