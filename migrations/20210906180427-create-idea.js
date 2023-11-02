'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ideas', {
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
      keywords: {
        type: Sequelize.STRING
      },
      approved_status: {
        type: Sequelize.INTEGER
      },
      status_updated_at: {
        type: Sequelize.DATE
      },
      remarks: {
        type: Sequelize.STRING
      },
      deleted_at: {
        type: Sequelize.DATE
      },
      is_deleted: {
        type: Sequelize.INTEGER
      },
      group_id:{
        type:Sequelize.INTEGER,
        references:{
          model:'groups',
          key:'id'
        }
      },
      supervisor_id:{
        type:Sequelize.INTEGER,
        references:{
          model:'supervisors',
          key:'id'
        }
      },
      committee_id:{
        type:Sequelize.INTEGER,
        references:{
          model:'committees',
          key:'id'
        }
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
    await queryInterface.dropTable('ideas');
  }
};