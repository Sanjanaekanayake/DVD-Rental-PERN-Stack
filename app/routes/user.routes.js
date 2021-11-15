const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const filmcontroller = require("../controllers/film.controller");
const customercontroller = require("../controllers/customer.controller");
const rentalcontroller = require("../controllers/rental.controller.js");
const staffcontroller = require("../controllers/staff.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

   // All can access
  //  app.get("/api/films", filmcontroller.findAll);
 

    //moderators can only access
  app.get(
    "/api/mod/rental",
    [authJwt.verifyToken, authJwt.isModerator],
    rentalcontroller.findAll
  );

  //admin can only access
  app.get(
    "/api/admin/staff",
    [authJwt.verifyToken, authJwt.isAdmin],
    staffcontroller.findAll
  );
  app.get(
    "/api/admin/customers",
    [authJwt.verifyToken, authJwt.isAdmin],
    customercontroller.findAll
  );

  
};