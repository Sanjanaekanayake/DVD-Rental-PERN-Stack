module.exports = app => {
    const Staff = require("../controllers/staff.controller.js");
    var router = require("express").Router();

     // Retrieve all films
     router.get('/staff', (req, res) => {
      Staff.findAll().then((data) => {
        res.json(data);
      });
    });    

    app.use('/api', router);
  };

  

