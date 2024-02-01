module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',
   {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
   {
    timestamps: false,
    underscored: true,
   }
  );

  PostCategory.associate = ({ Category, BlogPost }) => {
    Category.belongsToMany(BlogPost, {
        through: PostCategory,
        foreignKey: 'categoryId',
        as: 'posts',
        otherKey: 'postId',
    });
    
    BlogPost.belongsToMany(Category, {
        through: PostCategory,
        foreignKey: 'postId',
        as: 'categories',
        otherKey: 'categoryId',
    });
};

  return PostCategory;
};