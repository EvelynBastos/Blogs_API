module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, 
  {
    timestamps: false,
    underscored: true
  })

  BlogPost.associate = ({ Category, User }) => {
    BlogPost.belongsToMany(Category, {
        through: 'PostCategories',
        foreingKey: 'postId',
        as: 'categories',
        otherKey: 'categoryId',
    });

    BlogPost.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user',
    });
}
  return BlogPost;
};