const db = require("../models");
const Actor = db.actor;
const Op = db.Sequelize.Op;

// Retrieve all Actors from the database.

exports.findAll = (req, res) => {
    const first_name = req.query.first_name;
  var condition = first_name ? { first_name: { [Op.iLike]: `%${first_name}%` } } : null;


  Actor.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
  
};


// Find a single Actor with an id
exports.findOne = (req, res) => {
    const actor_id = req.params.id;

    Actor.findByPk(actor_id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + actor_id
        });
      });
};




