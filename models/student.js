"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  student.init(
    {
      user_id: DataTypes.STRING,
      group_id: DataTypes.INTEGER,
      batch_id: DataTypes.INTEGER,
      deleted_at: DataTypes.DATE,
      is_deleted: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "student",
    }
  );
  student.associate = function (models) {
    student.hasOne(models.user, { foreignKey: "id" });
    student.hasMany(models.attendance, { foreignKey: "student_id" });
    models.user.belongsTo(student, { foreignKey: "id" });
    student.belongsTo(models.batch, { foreignKey: "batch_id" });
  };
  return student;
};
