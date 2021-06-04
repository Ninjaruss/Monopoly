'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('property_txn', {
            property_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            current_position: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            pid: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            gid: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('property_txn');
    }
};