import CustomerDataService from "../services/customer.service";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


const Customers = () => {

    const [customers, setCustomers] =useState([]);
    const [currentCustomer, setCurrentCustomer] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState(""); 
   
    

    useEffect(() => {
        retrieveCustomers();
       
    }, []);


    const retrieveCustomers = () => {
        CustomerDataService.getAll()
        .then(response => {
            setCustomers(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const refreshList = () => {
        retrieveCustomers();
        setCurrentCustomer(null);
        setCurrentIndex(-1);
        setSearchName("")
       
      };

    const setActiveCustomer = (customer, index) => {
    setCurrentCustomer(customer);
    setCurrentIndex(index);
    };

    const removeAllCustomers = () => {
        CustomerDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      };

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
      };
    
    const findByName = () => {
    CustomerDataService.findByName(searchName)
        .then(response => {
        setCustomers(response.data);
        setCurrentCustomer(null)
        console.log(response.data);
        })
        .catch(e => {
        console.log(e);
        });
    };

    
    
    return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
      <h4>Customer List </h4>

        <ul className="list-group">
          {customers &&
            customers.map((customer,index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveCustomer(customer, index)}
                key={index}
              >
                {customer.first_name}
              </li>
            ))}
        </ul>
        
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={() => { if (window.confirm('Are you sure you wish to delete all the customers?')) removeAllCustomers() }}
        >
          Remove All
        </button>

        
        
        &nbsp;&nbsp;&nbsp;
        {searchName ? (<button
          className="m-3 btn btn-sm btn-danger"
          onClick={refreshList}
        >
          Back
        </button>): null}
        
        

        
        
      </div>

      <div className="col-md-6">
        {currentCustomer ? (
          <div>
            <h4>Customer</h4>
            <div>
              <label>
                <strong>First Name:</strong>
              </label>{" "}
              {currentCustomer.first_name}
            </div>
            <div>
              <label>
                <strong>Last Name:</strong>
              </label>{" "}
              {currentCustomer.last_name}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentCustomer.active ? "Active" : "Inactive"}
            </div>
            

            <Link
              to={"/customers"+"/"+currentCustomer.customer_id}
              className="m-3 btn btn-sm btn-danger"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Customer...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Customers