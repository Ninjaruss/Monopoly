'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('games', {
            gid: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            current_player: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            game_code: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            player_one: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            player_two: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            player_three: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            player_four: {
                type: Sequelize.INTEGER,
                allowNull: true
            }
        });
    },

    down: (queryInterface, _) => {
        return queryInterface.dropTable('games');
    }
};