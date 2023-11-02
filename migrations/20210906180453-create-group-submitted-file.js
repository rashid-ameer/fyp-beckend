'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('group_submitted_files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      group_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'groups',
          key:'id'
        }
      },
      assigned_work_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'assigned_works',
          key:'id'
        }
      },
      submission_date_time: {
        type: Sequelize.DATE
      },
      submission_status: {
        type: Sequelize.INTEGER
      },
      obtained_marks: {
        type: Sequelize.INTEGER
      },
      comments: {
        type: Sequelize.STRING
      },
      evaluation_at: {
        type: Sequelize.DATE
      },
      evaluation_status: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('group_submitted_files');
  }
};