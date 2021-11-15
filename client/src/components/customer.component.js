import CustomerDataService from "../services/customer.service";
import { useState, useEffect } from 'react';

const Customers = () => {

    const [customers, setCustomers] =useState([]);

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
    
    return (
        <main>
           
                <ul>
                    {customers.slice(0,10).map((customer) => (
                        <li className="customer" key={customer.customer_id}>
                            <div>{customer.first_name}</div>
                            <div>{customer.last_name}</div>
                        </li>
                    ))}
                </ul>
            
        </main>

    );
}

export default Customers