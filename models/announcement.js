'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class announcement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  announcement.init({
    supervisor_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    batch_id: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE,
    is_deleted: DataTypes.INTEGER,
    date_and_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'announcement',
  });
  announcement.associate=function(models){
    
    announcement.hasMany(models.notification_queue,{foreignKey:"id"});
  }
  return announcement;
};