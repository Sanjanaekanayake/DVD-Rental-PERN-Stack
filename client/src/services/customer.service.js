import http from "../http-common";

class CustomerDataService {
  getAll() {
    console.log("getall is called");
    return http.get("/customers");
  }

  get(id) {
    return http.get(`/customer/${id}`);
  }

  create(data) {
    
    console.log(data);
    return http.post("/createCustomers", data);
  }

  update(customer_id, data) {
    
    return http.put(`/customers/${customer_id}`, data);
  }

  delete(customer_id) {
    console.log(customer_id);
    return http.delete(`/customers/${customer_id}`);
  }

  deleteAll() {
    return http.delete(`/customers`);
  }

  findByName(name) {
    return http.get(`/customers/${name}`);
  }
}

export default new CustomerDataService();