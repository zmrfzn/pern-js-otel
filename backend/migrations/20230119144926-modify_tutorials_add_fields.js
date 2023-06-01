'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('tutorials','author', {type: Sequelize.STRING, allowNull: true}),
      queryInterface.addColumn('tutorials','category', {type: Sequelize.STRING, allowNull: true}),

    ])
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn('tutorials', 'author'),
      queryInterface.removeColumn('tutorials', 'category'),
    ]);
  }
};
