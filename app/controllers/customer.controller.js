const db = require("../models");
const Customer = db.customer;
const Rental = db.rental;
const Sequelize = require("sequelize");


exports.findAll = async(req, res) => {
    
    
      return Customer.findAll({
        include: [{
          model: Rental,
          as: "rental",
          attributes: ['return_date','customer_id'],
          
        }],
  
      }).then((customers) => {
        res.json(customers) 
        
      })
      .catch((err) => {
          console.log(">> Error while retrieving customers: ", err);
        });
     
      
      
  };

  exports.findByName = (req, res) => {
    const name = req.params.name;
    console.log(name);
    return Customer.findAll({ 
      where: { 
        first_name:{
          [Sequelize.Op.iLike]: name
        }
      } 
    })   
      .then((customer) => {
        return res.json(customer) ;
      })
      .catch((err) => {
        console.log(">> Error while finding Category: ", err);
      });
  };

  exports.findById = (req, res) => {
    const id = req.params.customer_id;
    
    return Customer.findByPk(id)   
      .then((customer) => {
        return res.json(customer) ;
      })
      .catch((err) => {
        console.log(">> Error while finding Category: ", err);
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
      {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      active: req.body.active
      },
      {returning: true, where: {customer_id: req.body.customer_id} }
    )
    
    .then(function([ rowsUpdate, [updatedBook] ]) {
   
     
      res.json(updatedBook)
     
    })
    .catch(err => {
      res.status(400).send({
        message:
          err.message || "Some error occurred while updating the customer."
      });
    });
  }

  exports.delete = (req, res) => {
    const id = req.params.customer_id;
    console.log(id);
  
    Customer.destroy({
      where: { customer_id: id }
    })
      .then(num => {
        
        if (num == 1) {
          res.send({
            message: "Customer was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Customer with id=" + id
        });
      });
  };

  exports.deleteAll = (req, res) => {
    Customer.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
      
        res.send({ message: `${nums} Customers were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      });
  };


 

  

  



  

  