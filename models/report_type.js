'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class report_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  report_type.init({
    report_type: DataTypes.STRING,
    deleted_at: DataTypes.DATE,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'report_type',
  });
  report_type.associate=function(models){
    // models.assigned_work.hasOne(report_type,{foreignKey:"id"});
    
    //models.assigned_work.belongsTo(report_type,{foreignKey:"report_type_id"});
    report_type.hasOne(models.assigned_work,{foreignKey:"report_type_id"});
  }

  return report_type;
};