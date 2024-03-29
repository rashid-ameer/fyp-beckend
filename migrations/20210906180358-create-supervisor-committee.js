"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("supervisor_committees", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      committee_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "committees",
          key: "id",
        },
      },
      supervisor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "supervisors",
          key: "id",
        },
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
      is_deleted: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("supervisor_committees");
  },
};
