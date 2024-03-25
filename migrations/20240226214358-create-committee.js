"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("committees", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      supervisor_id: {
        type: Sequelize.INTEGER,
        allowNull: false, // Ensure supervisor_id is not null
        references: {
          model: "supervisors",
          key: "id",
          onUpdate: "CASCADE", // Optional: Cascade updates to supervisor_id
          onDelete: "CASCADE", // Optional: Cascade deletes to supervisor_id
        },
      },
      batch_id: {
        type: Sequelize.INTEGER,
        allowNull: false, // Ensure batch_id is not null
        references: {
          model: "batches",
          key: "id",
          onUpdate: "CASCADE", // Optional: Cascade updates to batch_id
          onDelete: "CASCADE", // Optional: Cascade deletes to batch_id
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
    await queryInterface.dropTable("committees");
  },
};
