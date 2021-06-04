'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('players', {
            pid: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            uid: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            balance: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            current_position: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            is_playing: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('players');
    }
};