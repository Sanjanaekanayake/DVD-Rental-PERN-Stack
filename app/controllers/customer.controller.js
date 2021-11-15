const db = require("../models");
const Customer = db.customer;
const Rental = db.rental;

exports.findAll = async(req, res) => {
 
   
      return Customer.findAll({
        include: [{
          model: Rental,
          as: "rental",
          attributes: ['return_date','customer_id'],
          where: {
              return_date: null
          }
        }],
  
      }).then((customers) => {
        res.json(customers)
        
      })
      .catch((err) => {
          console.log(">> Error while retrieving customers: ", err);
        });
  };





  exports.create = (req, res) => {
    // Validate request
    if (!req.body.store_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a Customer
    const customer = {
  
      store_id: req.body.store_id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      address_id: req.body.address_id,
      activebool: req.body.activebool,
      create_date: req.body.create_date,
      last_update:req.body.last_update,
      active: req.body.active,
     
    
    };
     // Save Customer in the database
    Customer.create(customer)
      .then(data => {
       
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the customer."
        });
      });
  };

  exports.update = (req,res) =>{
    Customer.update(
      {first_name: req.body.first_name},
      {returning: true, where: {customer_id: req.body.customer_id} }
    )
    
    .then(function([ rowsUpdate, [updatedBook] ]) {
   
      
      res.json(updatedBook)
      // return updatedBook;
    })
    .catch(err => {
      res.status(400).send({
        message:
          err.message || "Some error occurred while updating the customer."
      });
    });
  }


 

  

  



  

  