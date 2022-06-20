'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('roles', [
      {
      role_name: "Super Admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      role_name: "Admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      role_name: "Employee",
      createdAt: new Date(),
      updatedAt: new Date(),
    },      
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('roles', null, {});  
  }
};
