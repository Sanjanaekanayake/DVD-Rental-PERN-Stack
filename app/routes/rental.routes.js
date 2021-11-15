module.exports = app => {
    const Rental = require("../controllers/rental.controller.js");
    var router = require("express").Router();

     // Retrieve all films
     router.get('/rental', (req, res) => {
        Rental.findAll().then((data) => {
        res.json(data);
      });
    });  
    
   

    app.use('/api', router);
  };

  

