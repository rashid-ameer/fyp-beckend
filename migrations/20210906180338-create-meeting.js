'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('meetings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      supervisor_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'supervisors',
          key: 'id'
        }
      },
      group_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'groups',
          key: 'id'
        }
      },
      agenda: {
        type: Sequelize.STRING
      },
      action_work: {
        type: Sequelize.STRING
      },
      meeting_duration: {
        type: Sequelize.INTEGER
      },
      date_and_time: {
        type: Sequelize.DATE
      },
      location: {
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
    await queryInterface.dropTable('meetings');
  }
};