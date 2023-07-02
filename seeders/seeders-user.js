'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [
         {
            email: 'admin@gmail.com',
            password: 'admin',
            firstName: 'SERN',
            lastName: 'WEB',
            address: 'Đà Nẵng City',
            gender: 1,
            typeRole: 'ROLE',
            keyRole: 'R1',
            createdAt: new Date(),
            updatedAt: new Date(),
         },
      ]);
   },

   //dòng down khi muốn back phiên bản cũ của database
   down: async (queryInterface, Sequelize) => {
      /**
       * Add commands to revert seed here.
       *
       * Example:
       * await queryInterface.bulkDelete('People', null, {});
       */
   },
};
