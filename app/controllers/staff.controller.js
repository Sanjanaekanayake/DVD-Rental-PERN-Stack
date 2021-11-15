const db = require("../models");
const Staff = db.staff;
const Rental = db.rental;
const Sequelize = require("sequelize");

// exports.findAll = () => {
//     return Staff.findAll({
//       include: [{
//         model: Rental,
//         as: "rental",
//         attributes: ['staff_id',[Sequelize.fn('COUNT', Sequelize.col('staff.staff_id')), 'quantity']],
//         group: ['staff.staff_id','rental.staff_id']
//       }],

//     }).then((staff) => {
//       return staff;
//     })
//     .catch((err) => {
//         console.log(">> Error while retrieving staff: ", err);
//       });
//   };
Rental.removeAttribute('rental_id');

exports.findAll = (req, res) => {
    return Staff.findAll({
        attributes: [
            'staff_id',
            'first_name',
            'last_name'
                      
        ],
        include: [
        {
            model: Rental,
            as: "rental",
            attributes: [[Sequelize.fn('COUNT', Sequelize.col('staff.staff_id')), 'quantity']]
        }
        ],
        group: ['staff.staff_id','rental.staff_id']

    }).then((staff) => {
        // res.json(staff) ;
        return staff;
    })
    .catch((err) => {
        console.log(">> Error while retrieving staff: ", err);
      });
  };
  