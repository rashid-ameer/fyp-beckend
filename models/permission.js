'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  permission.init({
    title: DataTypes.STRING,
    pid:DataTypes.INTEGER,
    slug: DataTypes.STRING,
    description: DataTypes.STRING,
    active: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'permission',
  });
  permission.associate = function(models){
    permission.hasMany(models.role_permission, {foreignKey:'permission_id', onUpdate:"CASCADE"});
  }
  return permission;
};