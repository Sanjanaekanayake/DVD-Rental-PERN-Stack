const db = require("../models");
const Film = db.film;
const Category = db.category;

module.exports = (sequelize, Sequelize) => {

const Film_Category = sequelize.define('film_category', {
    film_id: {
        type: Sequelize.BIGINT,
        primaryKey: true
      },
      category_id: {
        type: Sequelize.BIGINT,
        primaryKey: true
      }
}, { timestamps: false });


Film_Category.removeAttribute('id');
Film_Category.removeAttribute('createdAt');
Film_Category.removeAttribute('updatedAt');


return Film_Category;

};
