module.exports = (sequelize, Sequelize) => {
  
    const Rental = sequelize.define("rental", {
        rental_id: {
        type: Sequelize.BIGINT,
        primaryKey: true
      },
      rental_date: {
        type: Sequelize.DATE
      },
      inventory_id: {
        type: Sequelize.BIGINT
      },
      customer_id: {
        type: Sequelize.BIGINT
      },
      return_date: {
        type: Sequelize.DATE
      },
      staff_id: {
        type: Sequelize.BIGINT
      },
      last_update: {
        type: Sequelize.DATE
      }
    });

    Rental.removeAttribute('id');
    Rental.removeAttribute('createdAt');
    Rental.removeAttribute('updatedAt');
  
    return Rental;
  };