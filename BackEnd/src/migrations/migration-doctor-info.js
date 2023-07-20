'use strict';
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('DoctorInfos', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         doctorId: {
            allowNull: false,
            type: Sequelize.INTEGER,
         },
         specialtyId: {
            allowNull: false,
            type: Sequelize.INTEGER,
         },
         clinicId: {
            allowNull: false,
            type: Sequelize.INTEGER,
         },
         count: {
            allowNull: false,
            type: Sequelize.INTEGER,
            defaultValue: 0,
         },

         priceId: {
            allowNull: false,
            type: Sequelize.STRING,
         },
         provinceId: {
            allowNull: false,
            type: Sequelize.STRING,
         },
         paymentId: {
            allowNull: false,
            type: Sequelize.STRING,
         },
         addressClinic: {
            allowNull: false,
            type: Sequelize.STRING,
         },
         nameClinic: {
            allowNull: false,
            type: Sequelize.STRING,
         },
         note: {
            type: Sequelize.STRING,
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
      await queryInterface.dropTable('DoctorInfos');
   },
};
