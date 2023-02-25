'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let employees = [
      {
        username:"employee",
        password: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    await queryInterface.bulkInsert("Employees", employees)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Employees', null, {})
  }
};
