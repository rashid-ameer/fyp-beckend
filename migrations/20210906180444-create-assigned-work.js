'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('assigned_works', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      deadLine:{
        type: Sequelize.DATE
      },
      total_points: {
        type: Sequelize.STRING
      },
      report_type_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'report_types',
          key:'id'
        }
      },
      batch_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'batches',
          key:'id'
        }
      },
      deleted_at: {
        type: Sequelize.DATE
      },
      is_deleted: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('assigned_works');
  }
};