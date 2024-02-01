module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Category', 
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  }, {
    timestamps: false,
    underscored: true,
  });
  
  Categories.associate = ({ BlogPost, Category }) => {
    Categories.belongsToMany(BlogPost, {
      through: Category,
      foreignKey: 'categoryId',
      as: 'blogPosts',
      otherKey: 'postId',
    });
  }

  return Categories;
};