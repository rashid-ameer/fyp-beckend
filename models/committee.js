"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class committee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  committee.init(
    {
      supervisor_id: DataTypes.INTEGER,
      batch_id: DataTypes.INTEGER,
      deleted_at: DataTypes.DATE,
      is_deleted: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "committee",
    }
  );

  committee.associate = function (models) {
    committee.belongsTo(models.batch, { foreignKey: "batch_id" });
    committee.hasMany(models.supervisor_committee, { foreignKey: "committee_id" });
    committee.hasMany(models.group, { foreignKey: "committee_id" });
  };

  return committee;
};
