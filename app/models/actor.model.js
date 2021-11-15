module.exports = (sequelize, Sequelize) => {
  
    const Actor = sequelize.define("actor", {
      actor_id: {
        type: Sequelize.BIGINT,
        primaryKey: true
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      last_update: {
        type: Sequelize.DATE
      }
    });

    Actor.removeAttribute('id');
    Actor.removeAttribute('createdAt');
    Actor.removeAttribute('updatedAt');
  
    return Actor;
  };