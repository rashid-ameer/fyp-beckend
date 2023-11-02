'use strict';
const {
  Model
} = require('sequelize');
const role = require('./role');
module.exports = (sequelize, DataTypes) => {
  class role_permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  role_permission.init({
    role_id: DataTypes.INTEGER,
    permission_id: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'role_permission',
  });
  //https://sequelize.org/master/manual/advanced-many-to-many.html
  role_permission.associate=function(models){
    models.role.belongsToMany(models.permission,{through:"role_permission",foreignKey: 'role_id',onUpdate:"CASCADE"});
    models.permission.belongsToMany(models.role,{through:"role_permission",foreignKey: 'permission_id',onUpdate:"CASCADE"})
  }
  return role_permission;
};