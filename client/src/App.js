import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import AddCustomer from "./components/addCustomer.component";
import CustomerList from "./components/customerList.component";
import Customer from "./components/customer.component";
import Home from "./components/home.component";


function App(){
  
    const today =new Date();
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/home" className="navbar-brand">
            DVD Rental Shop
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/customers"} className="nav-link">
                Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addCustomers"} className="nav-link">
                Add Customer
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          
          <Switch>
            <Route exact path="/home" component={Home} />  
            <Route exact path="/addCustomers" component={AddCustomer} /> 
            <Route exact path="/customers" component={CustomerList} />  
            <Route exact path="/customers/:customer_id" component={Customer} /> 
          

          
          </Switch>
        </div>
        <div style = {{minHeight:'15vh'}}>
                  
          <footer>
            <p>Copyright &copy; {today.getFullYear()}</p>
          </footer>
        </div>
      </div>
    );
  }


export default App;
