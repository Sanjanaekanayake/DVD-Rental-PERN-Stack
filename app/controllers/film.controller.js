const db = require("../models");
const Film = db.film;
const Actor = db.actor;
const Category = db.category;


//find all films including actors
exports.findAll = async(req,res) => {
 
    return Film.findAll({
      include: [
        {
          model: Actor,
          as: "actors",
          attributes: ["first_name", "last_name"],
          through: {
            attributes: [],
          }
        },
      ],
    })
      .then((film) => {
         res.json(film);
      })
      .catch((err) => {
        console.log(">> Error while retrieving films: ", err);
      });
  };

  // find film by film id
  exports.findFilmById = (req, res) => {
    const film_id = req.params.id;

    return Film.findByPk(film_id, {
      include: [
        {
          model: Actor,
          as: "actors",
          attributes: ["first_name", "last_name"],
          through: {
            attributes: [],
          }
        },
      ],
    })
      .then((films) => {
        return films;
      })
      .catch((err) => {
        console.log(">> Error while finding film: ", err);
      });
  };

  //Save Category to database
  exports.createCategory = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a Category
    const category = {
      category_id: req.body.category_id,
      name: req.body.name,
      last_update:req.body.last_update,    
    
    };    
    // Save Category in the database
    Category.create(category)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the category."
        });
      });
  };

  //Find Category by category_id
  exports.findCategoryById = (req, res) => {
    const id = req.params.id;
    return Category.findByPk(id, {
      include: [
        {
          model: Film,
          as: "films",
          attributes: ["film_id", "title", "description"],
          through: {
            attributes: [],
          }
        },
      ],
    })
      .then((category) => {
        return res.json(category) ;
      })
      .catch((err) => {
        console.log(">> Error while finding Category: ", err);
      });
  };

  //Add Film to Category
  exports.addFilmToCategory = () => {
    const category_id = req.body.category_id;
    const film_id = req.body.film_id;
    return Category.findByPk(category_id)
      .then((category) => {
        if (!category) {
          console.log("Category not found!");
          return null;
        }
        return Film.findByPk(film_id).then((film) => {
          if (!film) {
            console.log("Film not found!");
            return null;
          }
  
          category.addFilmToCategory(film);
          console.log(`>> added Film id=${Film.film_id} to category id=${category.category_id}`);
          return res.json(film);
        });
      })
      .catch((err) => {
        console.log(">> Error while adding Tutorial to Tag: ", err);
      });
  };