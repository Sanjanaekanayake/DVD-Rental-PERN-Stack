module.exports = (sequelize, Sequelize) => {
  
    const Staff = sequelize.define("staff", {
        staff_id: {
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
      },
    });

    Staff.removeAttribute('id');
    Staff.removeAttribute('createdAt');
    Staff.removeAttribute('updatedAt');
  
    return Staff;
  };