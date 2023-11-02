'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class assigned_work extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  assigned_work.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    total_points: DataTypes.STRING,
    report_type_id: DataTypes.INTEGER,
    deadLine: DataTypes.DATE,
    batch_id: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE,
    is_deleted: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'assigned_work',
  });
  assigned_work.associate=function(models){
    //assigned_work.belongsTo(models.report_type,{foreignKey:"id"});
    // models.report_type.hasMany(assigned_work,{foreignKey:"report_type_id"});
    assigned_work.hasOne(models.group_submitted_file,{foreignKey:"assigned_work_id"});
  }
  return assigned_work;
};