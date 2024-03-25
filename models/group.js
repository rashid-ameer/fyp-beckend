"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  group.init(
    {
      project_title: DataTypes.STRING,
      committee_id: DataTypes.INTEGER,
      supervisor_id: DataTypes.INTEGER,
      groupStatus: DataTypes.INTEGER,
      projectStatus: DataTypes.STRING,
      deleted_at: DataTypes.DATE,
      is_deleted: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "group",
    }
  );
  group.associate = function (models) {
    group.hasMany(models.student, { foreignKey: "group_id" });
    group.belongsTo(models.committee, { foreignKey: "committee_id" });
    group.belongsTo(models.supervisor, { foreignKey: "supervisor_id" });
  };

  return group;
};
