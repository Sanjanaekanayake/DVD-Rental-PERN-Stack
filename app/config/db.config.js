const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = {
  HOST: process.env.PG_HOST,
  USER: process.env.PG_USER,
  PASSWORD: process.env.PG_PASSWORD,
  DB: process.env.PG_DATABASE,
  PORT: process.env.PG_PORT,
  dialect:"postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
   
};

const proConfig = {
  use_env_variable : process.env.DATABASE_URL, //heroku addons
  dialect:"postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}

 module.exports = {
  connectionString:
     process.env.NODE_ENV === "production" ? proConfig : devConfig
 };