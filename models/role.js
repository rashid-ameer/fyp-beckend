'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  role.init({
    role_name: DataTypes.STRING,
    role_description: DataTypes.STRING,
    isActive: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'role',
  });

    role.associate = function(models){
    role.hasMany(models.user, {foreignKey:'role_id'});
    role.hasMany(models.role_permission, {foreignKey:'permission_id'});
    
  }

  return role;
};