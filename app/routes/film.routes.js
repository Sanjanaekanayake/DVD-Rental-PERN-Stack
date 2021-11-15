module.exports = app => {
    const film = require("../controllers/film.controller.js");
    var router = require("express").Router();

     // Retrieve all films
     router.get('/films',film.findAll);
    //  router.get('/films', (req, res) => {
    //   film.findAll().then((data) => {
    //     res.json(data);
    //   });
    // });

    // Retrieve a single actor with id
     router.get("/films/:id", film.findFilmById); 
     
     router.post("/createCategory", film.createCategory);

     router.get("/category/:id", film.findCategoryById); 

     router.post("/addFilmToCategory", film.addFilmToCategory);

      

    app.use('/api', router);
  };

  

