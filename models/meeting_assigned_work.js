'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meeting_assigned_work extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  meeting_assigned_work.init({
    student_id: DataTypes.INTEGER,
    meeting_id: DataTypes.INTEGER,
    action_work: DataTypes.STRING,
    deleted_at: DataTypes.DATE,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'meeting_assigned_work',
  });
  return meeting_assigned_work;
};