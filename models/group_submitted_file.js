'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class group_submitted_file extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  group_submitted_file.init({
    group_id: DataTypes.INTEGER,
    assigned_work_id: DataTypes.INTEGER,
    submission_date_time: DataTypes.DATE,
    submission_status: DataTypes.INTEGER,
    obtained_marks: DataTypes.INTEGER,
    comments: DataTypes.STRING,
    evaluation_at: DataTypes.DATE,
    evaluation_status: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'group_submitted_file',
  });
  group_submitted_file.associate=function(models){
    //assigned_work.belongsTo(models.report_type,{foreignKey:"id"});
    // models.report_type.hasMany(assigned_work,{foreignKey:"report_type_id"});
    group_submitted_file.hasMany(models.file,{foreignKey:"group_submitted_files_id"});
  }
  return group_submitted_file;
};