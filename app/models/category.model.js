module.exports = (sequelize, Sequelize) => {
  
    const Category = sequelize.define("category", {
        category_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      last_update: {
        type: Sequelize.DATE
      }
    },
    {
      timestamps: false,

      createdAt: false,
    
      updatedAt: false,
    });

    Category.removeAttribute('id');

  
    return Category;
  };