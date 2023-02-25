'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let admins = [
      {
        username:"admin",
        password: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    await queryInterface.bulkInsert("Admins", admins)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', null, {})
  }
};
