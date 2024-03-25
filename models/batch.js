"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class batch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  batch.init(
    {
      batch: DataTypes.STRING,
      isActive: DataTypes.INTEGER,
      deleted_at: DataTypes.DATE,
      is_deleted: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "batch",
    }
  );
  batch.associate = function (models) {
    batch.hasMany(models.student, { foreignKey: "batch_id" });
    batch.hasMany(models.committee, { foreignKey: "batch_id" });
  };
  return batch;
};
