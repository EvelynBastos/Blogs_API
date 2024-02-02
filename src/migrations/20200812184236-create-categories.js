module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('categories', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
            }
        });
    },

    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable('categories');
    }
};