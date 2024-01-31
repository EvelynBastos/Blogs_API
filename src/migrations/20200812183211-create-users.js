module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            displayName: {
                type: Sequelize.STRING,
                allowNull: false,
                field: 'display_name'
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            image: {
                allowNull: false,
                type: Sequelize.STRING,
            }
        });
    },

    async down (queryInterface, _Sequelize) {
        await queryInterface.dropTable('users');
    }
};