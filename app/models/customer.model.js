module.exports = (sequelize, Sequelize) => {
  
    const Customer = sequelize.define("customer", {
        customer_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      store_id: {
        type: Sequelize.INTEGER,
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      address_id: {
        type: Sequelize.INTEGER,
      },
      activebool: {
        type: Sequelize.BOOLEAN,
      },
      create_date: {
        type: Sequelize.DATE
      },         
      last_update: {
        type: Sequelize.DATE
      },
      active: {
        type: Sequelize.INTEGER
      }, 
      
    },
    {
      timestamps: false,

      createdAt: false,
    
      updatedAt: false,
    }
    );

    Customer.removeAttribute('id');
 
  
    return Customer;
  };