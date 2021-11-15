const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");
// set port, listen for requests
const PORT = process.env.PORT || 8080;

//process.env.PORT
//process.env.NODE_ENV => production or undefined

const db = require("./app/models");
db.sequelize.sync();

// var corsOptions = {
//   origin: "http://localhost:9090"
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, "client/build")));
 app.use(express.static("./client/build"));  //=> for demonstration

if (process.env.NODE_ENV === "production") {
  //server static content
  //npm run build
  //  app.use(express.static(path.join(__dirname, "client/build")));
}
console.log(__dirname);
console.log(path.join(__dirname, "client/build"));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
const Role = db.role;
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}


db.sequelize.sync().then(() => {
 // initial();
});



 require("./app/routes/actor.routes")(app);
 require("./app/routes/film.routes")(app);
 require("./app/routes/customer.routes")(app);
 require("./app/routes/staff.routes")(app);
 require("./app/routes/rental.routes")(app);

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);




// app.get('/films',filmController.findAll);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});