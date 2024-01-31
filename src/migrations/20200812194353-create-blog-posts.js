module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('blog_posts', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            content: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                field: 'user_id',
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
            },
            published: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable('blog_posts');
    }
};