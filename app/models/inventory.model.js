module.exports = (sequelize, Sequelize) => {
  
    const Inventory = sequelize.define("inventory", {
        inventory_id: {
        type: Sequelize.BIGINT,
        primaryKey: true
      },
      film_id: {
        type: Sequelize.INTEGER
      },
      store_id: {
        type: Sequelize.INTEGER
      },
      last_update: {
        type: Sequelize.DATE
      }
    });

    Inventory.removeAttribute('id');
    Inventory.removeAttribute('createdAt');
    Inventory.removeAttribute('updatedAt');
  
    return Inventory;
  };