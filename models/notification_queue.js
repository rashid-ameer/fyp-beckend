'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification_queue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  notification_queue.init({
    user_id: DataTypes.INTEGER,
    status_viewed: DataTypes.INTEGER,
    viewed_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'notification_queue',
  });
  notification_queue.associate=function(models){
    notification_queue.belongsTo(models.announcement,{primaryKey: "announcement_id",foreignKey:"id"});
  }
  return notification_queue;
};