'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  meeting.init({
    supervisor_id: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER,
    agenda: DataTypes.STRING,
    action_work: DataTypes.STRING,
    meeting_duration: DataTypes.INTEGER,
    date_and_time: DataTypes.DATE,
    location: DataTypes.STRING,
    deleted_at: DataTypes.DATE,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'meeting',
  });
  return meeting;
};