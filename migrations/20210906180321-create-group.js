'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      project_title: {
        type: Sequelize.STRING
      },
      supervisor_id:{
        type: Sequelize.INTEGER,
        references:{
          model: 'supervisors',
          key: 'id'
        }
      },
      groupStatus:  {
        type: Sequelize.INTEGER
      },
      supervisor_id:{
        type: Sequelize.INTEGER,
        references:{
          model: 'supervisors'
        }
      },
      projectStatus:{
        type: Sequelize.STRING
      },
      committee_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'committees',
          key: 'id'
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
    await queryInterface.dropTable('groups');
  }
};