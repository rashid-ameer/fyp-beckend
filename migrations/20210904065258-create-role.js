'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_name: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.INTEGER
      },
      role_description: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('roles');
  }
};