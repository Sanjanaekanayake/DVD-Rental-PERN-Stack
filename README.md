# :zap: PERN Full Stack CRUD App

* PostgreSQL Express React Node (PERN) full-stack app, integrates React frontend with Node.js backend.

* **Note:** to view the app use the below link

![GitHub repo size](https://dvd-rental-pern-stack.herokuapp.com/)

## :page_facing_up: Table of contents

* [General info](#general-info)
* [Screenshots](#ER-Diagram)
* [Technologies](#technologies)
* [Setup](#setup)

## :books: General info

### Backend

* PostgreSQL needs to be installed and [dvdrental sample database](https://www.postgresqltutorial.com/postgresql-sample-database/) is used as the data source
* Sequelize,  Object-Relational Mapper (ORM) is used to map object syntax onto database schemas using postgres dialect.
* Postman used to test the backend before frontend was available

### Frontend

* React frontend includes a simple customer detail list with a user input form. User can edit and delete customers.
* [JavaScript XML (JSX)](https://reactjs.org/docs/introducing-jsx.html) used to write HTML elements in Javascript
* [React useState and UseEffect Hooks](https://reactjs.org/docs/hooks-intro.html) to add state to function component and to perform side effects from a function component 

## :camera: ER Diagram

![image](https://user-images.githubusercontent.com/40081027/142426947-4f202d60-df40-4483-9041-afd18f51e894.png)

## :signal_strength: Technologies - Backend

* [PostgreSQL v12](https://www.postgresql.org/)
* [PostgreSQL Installer for Windows](https://www.postgresqltutorial.com/install-postgresql/)
* [Express.js middleware v4](https://expressjs.com/)
* [Node.js v14](https://nodejs.org/es/)
* [Nodemon](https://www.npmjs.com/package/nodemon) npm module so backend server will automatically restart after code changes
* [Postman API](https://www.postman.com/downloads/) to simulate a frontend

## :signal_strength: Technologies - Frontend

* [React framework v16](https://reactjs.org/)
* [Bootstrap v4](https://getbootstrap.com/) component library

## :floppy_disk: Setup - Backend

* Change to folder's root directory
* Install dependencies using `npm i`
* Install [nodemon](https://www.npmjs.com/package/nodemon) globally if you don't already have it
* Install [PostgreSQL](https://www.postgresql.org/) & run it (requires the password you created during installation)
* Add database access credentials to `config/config.js` - recommend installing [npm dotenv](https://www.npmjs.com/package/dotenv) & using .env to hide credentials if commiting to Github
* Postgresql shell commands: `\l` list all databases. `\c` database1 connect to database1. `\dt` inspect tables. `\d+` inspect table & show relation information. `\q` to quit.
* Run `npm run dev` for a dev server
* `http://localhost:8080/api` can be accessed for CRUD operations such as POST, GET, PUT, DELETE etc. using Postman

## :floppy_disk: Setup - Frontend

* Change to `/client` directory
* Install dependencies using `npm i`.
* run `npm start`. Frontend will open at `http://localhost:9090/`
