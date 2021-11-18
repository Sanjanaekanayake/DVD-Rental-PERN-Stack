module.exports = app => {
  const customer = require("../controllers/customer.controller.js");
  const loyalcustomer = require("../controllers/loyalcustomer.controller.js");
  var router = require("express").Router();

   // Retrieve all customers
   router.get('/customers',customer.findAll); 

   router.get('/customers/:name',customer.findByName); 

   router.get('/customer/:customer_id',customer.findById); 

   router.post("/createCustomers", customer.create);

   router.put("/customers/:customer_id",customer.update);

   router.delete("/customers/:customer_id",customer.delete);

   router.delete("/customers",customer.deleteAll);

 



   
   router.get('/loyalCustomers',loyalcustomer.findAll); 

   
  
  // router.get('/loyalCustomers', (req, res) => {
  //   loyalcustomer.findAll().then((data) => {
  //     res.json(data);
  //   });
  // }); 

  app.use('/api', router);
};



