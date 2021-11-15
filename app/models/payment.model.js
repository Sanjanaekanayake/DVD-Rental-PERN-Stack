module.exports = (sequelize, Sequelize) => {
  
    const Payment = sequelize.define("payment", {
        payment_id: {
        type: Sequelize.BIGINT,
        primaryKey: true
      },
      customer_id: {
        type: Sequelize.INTEGER
      },
      rental_id: {
        type: Sequelize.INTEGER
      },
      payment_date: {
        type: Sequelize.DATE
      },
      last_update: {
        type: Sequelize.DATE
      }
    });

    Payment.removeAttribute('id');
    Payment.removeAttribute('createdAt');
    Payment.removeAttribute('updatedAt');
  
    return Payment;
  };