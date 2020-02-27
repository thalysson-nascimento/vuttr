module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('tools', 'user_id', {
            type: Sequelize.INTEGER,
            references: { model: 'users', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: false,
        });
    },

    down: queryInterface => {
        return queryInterface.removeColumn('users', 'user_id');
    },
};
