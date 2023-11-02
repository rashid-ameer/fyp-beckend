'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  attendance.init({
    student_id: DataTypes.INTEGER,
    meeting_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    status_is_present: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'attendance',
  });
  attendance.associate=function(models){
    
    attendance.belongsTo(models.student,{foreignKey:"id"});
    attendance.belongsTo(models.user,{foreignKey:"id"});
}

  return attendance;
};