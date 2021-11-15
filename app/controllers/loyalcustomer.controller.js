
const db = require("../models");
const Film = db.film;
const Inventory = db.inventory;
const Rental = db.rental;
const Customer = db.customer;
const Payment = db.payment;
const Sequelize = require("sequelize");
const { Op } = require("sequelize");


exports.findAll = async(req, res) => {
   
    return Customer.findAll({
        attributes:  ['first_name','last_name'],
        raw: true,
            include : [{
                model: Rental,
                as: 'rental',
                attributes : ['rental_date','return_date',
                /*  [Sequelize.col('rental.return_date')- Sequelize.col('rental.rental_date'),'datedifference'],*/
                
                [Sequelize.fn('date',Sequelize.literal('rental.return_date')),'return_date'],
                [Sequelize.fn('date',Sequelize.literal('rental.rental_date')),'rental_date'],
                [Sequelize.literal('(return_date -rental_date)'),'datedifference'] 
                 ],                       
               
                include:[{
                    model : Inventory,
                    as : 'inventory',
                    attributes : [],
                    raw: true,
                    include: [{
                        model : Film,
                        as : 'film',
                        attributes: ['rental_duration',],
                        raw: true,

                    }]
                }]

             }] ,         
            
    //    }],
         /*  where : Sequelize.where(
          [Sequelize.literal(
           `(Sequelize.fn('date',Sequelize.literal('rental.return_date'))-Sequelize.fn('date',Sequelize.literal('rental.rental_date')))`
           )] ,
            Sequelize.col('rental->inventory->film.rental_duration')
            )   */ 
                               
                  
        //  where: Sequelize.where(Sequelize.col('rental->inventory->film.rental_duration'),4)

                
                

    }).then((customers) => {
      res.json(customers) ;
    })
    .catch((err) => {
        console.log(">> Error while retrieving loyal customers: ", err);
      });
    
  };


