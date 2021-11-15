module.exports = (sequelize, Sequelize) => {
    const Film = sequelize.define("film", {
      film_id: {
        type: Sequelize.BIGINT,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      release_year: {
        type: Sequelize.DATE,
      },
      language_id: {
        type: Sequelize.INTEGER,
      },
      rental_duration: {
        type: Sequelize.DECIMAL,
      },
      length: {
        type: Sequelize.INTEGER,
      }
    });

    Film.removeAttribute('id');
    Film.removeAttribute('createdAt');
    Film.removeAttribute('updatedAt');
  
    return Film;
  };