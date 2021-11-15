const db = require("../models");
const Film = db.film;
const Actor = db.actor;

module.exports = (sequelize, Sequelize) => {

const Film_Actor = sequelize.define('film_actor', {
    film_id: {
        type: Sequelize.BIGINT,
        primaryKey: true
      },
      actor_id: {
        type: Sequelize.BIGINT,
        primaryKey: true
      }
}, { timestamps: false });


Film_Actor.removeAttribute('id');
Film_Actor.removeAttribute('createdAt');
Film_Actor.removeAttribute('updatedAt');


return Film_Actor;

};
