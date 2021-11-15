'use strict';
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const dbConfig = require(__dirname + '/../../config/config.js')[env];
console.log(dbConfig);

const Sequelize = require("sequelize");
let sequelize;

if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(dbConfig.use_env_variable,dbConfig);

} else {
  sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    define: {
      timestamps: true,
      freezeTableName: true
    },
    pool :dbConfig.pool
  
  });
}
const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});




db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.actor = require("./actor.model.js")(sequelize, Sequelize);
db.film = require("./film.model.js")(sequelize, Sequelize);
db.film_actor  = require("./film_actor.model.js")(sequelize, Sequelize);

db.customer = require("./customer.model.js")(sequelize, Sequelize);
db.rental = require("./rental.model.js")(sequelize, Sequelize);

db.staff = require("./staff.model.js")(sequelize, Sequelize);

db.category = require("./category.model.js")(sequelize, Sequelize);
db.film_category = require("./film_category.model.js")(sequelize, Sequelize);

db.inventory =  require("./inventory.model.js")(sequelize, Sequelize);
db.payment =  require("./payment.model.js")(sequelize, Sequelize);

db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);


db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
  
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
db.ROLES = ["user", "admin", "moderator"];


db.film.belongsToMany(db.actor, {
  through: db.film_actor,
  as: "actors",
  foreignKey: "film_id",
});
db.actor.belongsToMany(db.film, {
  through: db.film_actor,
  as: "films",
  foreignKey: "actor_id",
});

db.customer.hasOne(db.rental, { 
  as: "rental" ,
  foreignKey: 'customer_id',
});
db.rental.belongsTo(db.customer, {
  foreignKey: "customer_id",
  as: "customer",
});

db.staff.hasMany(db.rental, { 
  as: "rental" ,
  foreignKey: 'staff_id',
});
db.rental.belongsTo(db.staff, {
  foreignKey: "staff_id",
  as: "staff",
});

db.customer.hasMany(db.payment, { 
  as: "payment" ,
  foreignKey: 'customer_id',
});
db.payment.belongsTo(db.customer, {
  foreignKey: "customer_id",
  as: "customer",
});

db.rental.hasMany(db.payment, { 
  as: "payment" ,
  foreignKey: 'rental_id',
});
db.payment.belongsTo(db.rental, {
  foreignKey: "rental_id",
  as: "rental",
});

db.film.belongsToMany(db.category, {
  through: db.film_category,
  as: "category",
  foreignKey: "film_id",
});
db.category.belongsToMany(db.film, {
  through: db.film_category,
  as: "film",
  foreignKey: "category_id",
});

db.film.hasMany(db.inventory, { 
  as: "inventory" ,
  foreignKey: 'film_id',
});
db.inventory.belongsTo(db.film, {
  foreignKey: "film_id",
  as: "film",
});

db.inventory.hasOne(db.rental, { 
  as: "rental" ,
  foreignKey: 'inventory_id',
});
db.rental.belongsTo(db.inventory, {
  foreignKey: "inventory_id",
  as: "inventory",
});

module.exports = db;