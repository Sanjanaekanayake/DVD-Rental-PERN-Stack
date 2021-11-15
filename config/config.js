 require("dotenv").config();
 module.exports = {
  development: {
      HOST: process.env.PG_HOST,
      USER: process.env.PG_USER,
      PASSWORD: process.env.PG_PASSWORD,
      DB: process.env.PG_DATABASE,
      PORT: process.env.PG_PORT,
      dialect:process.env.PG_DIALECT,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
  },
  test: {
    HOST: process.env.PG_HOST,
    USER: process.env.PG_USER,
    PASSWORD: process.env.PG_PASSWORD,
    DB: process.env.PG_DATABASE,
    PORT: process.env.PG_PORT,
    dialect:process.env.PG_DIALECT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  production: {
      use_env_variable : process.env.DATABASE_URL, //heroku addons
      dialect:"postgres",
      dialectOptions: {
        ssl: false,
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
  },
};