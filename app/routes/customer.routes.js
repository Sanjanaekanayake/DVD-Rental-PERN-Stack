module.exports = app => {
    const customer = require("../controllers/customer.controller.js");
    const loyalcustomer = require("../controllers/loyalcustomer.controller.js");
    var router = require("express").Router();

     // Retrieve all customers
     router.get('/customers',customer.findAll); 

     router.post("/createCustomers", customer.create);

     router.put("/updateCustomer",customer.update);

   

  

     
     router.get('/loyalCustomers',loyalcustomer.findAll); 

     
    
    // router.get('/loyalCustomers', (req, res) => {
    //   loyalcustomer.findAll().then((data) => {
    //     res.json(data);
    //   });
    // }); 

    app.use('/api', router);
  };

  

