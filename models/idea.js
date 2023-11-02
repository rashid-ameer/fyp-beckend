'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class idea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  idea.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    keywords: DataTypes.STRING,
    approved_status: DataTypes.INTEGER,
    status_updated_at: DataTypes.DATE,
    remarks: DataTypes.STRING,
    deleted_at: DataTypes.DATE,
    is_deleted: DataTypes.INTEGER,
    group_id:DataTypes.INTEGER,
    supervisor_id:DataTypes.INTEGER,
    committee_id:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'idea',
  });
  return idea;
};