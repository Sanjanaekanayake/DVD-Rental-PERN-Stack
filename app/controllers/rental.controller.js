
const db = require("../models");
const Film = db.film;
const Category = db.category;
const Inventory = db.inventory;
const Rental = db.rental;
const Customer = db.customer;
const FilmCategory = db.film_category;
const Sequelize = require("sequelize");


// Category.removeAttribute('category_id');
 FilmCategory.removeAttribute('film_id');
 FilmCategory.removeAttribute('category_id');
// Rental.removeAttribute('rental_id');

exports.findAll = (req,res) => {
    return Category.findAll({
        attributes:  ['name'],
        raw: true,
        include : [{             
            model: Film,
            as: 'film',
            attributes : [],
            raw: true,
            include:[{
                model : Inventory,
                as : 'inventory',
                attributes : [],
                raw: true,
                include: [{
                    model : Rental,
                    required: false,
                    as : 'rental',
                    attributes: [
                        [ Sequelize.fn("date_part",'month', Sequelize.col('film->inventory->rental.rental_date')), 'rental_month']],
                    raw: true,
                    include : [{
                        model : Customer,
                        as : 'customer',
                        attributes: [
                            [Sequelize.fn('COUNT', Sequelize.col('film->inventory->rental->customer.customer_id')), 'count']]                       
                    }]

                }]
            }]
        }],
       
        
        group: [[Sequelize.fn("date_part",'month', Sequelize.col('film->inventory->rental.rental_date'))],'category.name'],
        order: [[Sequelize.fn("date_part",'month', Sequelize.col('film->inventory->rental.rental_date'))],[Sequelize.fn('COUNT', Sequelize.col('film->inventory->rental->customer.customer_id')),'DESC']] 

    }).then((category) => {
      res.json(category) ;
    })
    .catch((err) => {
        console.log(">> Error while retrieving rental dates: ", err);
      });
  };


