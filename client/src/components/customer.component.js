import  { useState, useEffect } from "react";
import CustomerDataService from "../services/customer.service";
import { useHistory } from "react-router-dom";

const Customer = props => {

  const history = useHistory();
  
  const handleRoute = () =>{ 
    history.push("/customers");
  }
  
  const initialCustomerState = {
      customer_id: null,
      store_id:1,
      first_name: "",
      last_name:"",
      email:"",
      address_id:1,
      activebool:false,
      create_date:null,         
      last_update:null,
      active:1,
     
  };
  const [currentCustomer, setCurrentCustomer] = useState(initialCustomerState);
  const [message, setMessage] = useState("");

  const getCustomer = customer_id => {
    CustomerDataService.get(customer_id)
      .then(response => {
        setCurrentCustomer(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    
    getCustomer(props.match.params.customer_id);
  }, [props.match.params.customer_id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentCustomer({ ...currentCustomer, [name]: value });
  };

  const updateActive = status => {
    var data = {

      customer_id: currentCustomer.customer_id,
      store_id:currentCustomer.store_id,
      first_name: currentCustomer.first_name,
      last_name:currentCustomer.last_name,
      email:currentCustomer.email,
      address_id:currentCustomer.address_id,
      activebool:currentCustomer.activebool,
      create_date:currentCustomer.create_date,         
      last_update:currentCustomer.last_update,
      active:status    

    };
    console.log(data);

    CustomerDataService.update(currentCustomer.customer_id, data)
      .then(response => {
        setCurrentCustomer({ ...currentCustomer,  active: status});
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateCustomer = () => {
    

    CustomerDataService.update(currentCustomer.customer_id, currentCustomer)
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteCustomer = () => {
    CustomerDataService.delete(currentCustomer.customer_id)
      .then(response => {
        console.log(response.data);
        props.history.push("/customers");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCustomer ? (
        <div className="edit-form">
          <h4>Customer</h4>
          <form>
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                value={currentCustomer.first_name}
                onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                value={currentCustomer.last_name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentCustomer.active ? "Active" : "Inative"}
            </div>
          </form>
          <div style={{
            position: 'absolute', left: '50%', top: '70%',
            transform: 'translate(-50%, -50%)'
          }}>
          
            {currentCustomer.active ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => updateActive(0)}
              >
                Deactive
              </button>
              
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => updateActive(1)}
              >
                Active
              </button>
            )}

            <button className="badge badge-danger mr-2" onClick={() => { if (window.confirm('Are you sure you wish to delete this customer?')) deleteCustomer() }}>
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={updateCustomer}
            >
              Update
            </button>
            <button
              type="submit"
              className="badge badge-success"
              onClick={handleRoute}
            >
            Back
            </button>
            <p>{message}</p>
          </div>
        </div>

      ) : (
        <div>
          <br />
          <p>Please click on a Customer...</p>
        </div>
      )}
    </div>
  );
};

export default Customer;