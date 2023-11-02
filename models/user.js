'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    user_name: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    isActive: DataTypes.INTEGER,
    is_varified: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE,
    is_deleted: DataTypes.INTEGER,
    last_login: DataTypes.DATE,
    role_id: DataTypes.INTEGER,
    department_id:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  user.associate=function(models){
     user.belongsTo(models.role,{foreignKey:"role_id"});
    //  user.hasOne(models.student,{foreignKey:"id"});
    user.belongsTo(models.student,{foreignKey:"id"});
    user.belongsTo(models.user,{foreignKey:"id"});
    user.hasMany(models.attendance,{foreignKey:"student_id"});
  }
  return user;
};