module.exports = app => {
    const actor = require("../controllers/actor.controller.js");
      
    var router = require("express").Router();

    
    // Retrieve all actors
    router.get("/actors", actor.findAll);
  

    // Retrieve a single actor with id
    router.get("/actors/:id", actor.findOne);   

     
  
    app.use('/api', router);
  };