import React, { useState } from 'react';
import axios from 'axios';

function DealerForm() {
  const [formData, setFormData] = useState({
    dealership_email: '',
    password: '',
    dealership_name: '',
    dealership_location: '',
    dealership_info: '',
    cars: [],
    deals: [],
    sold_vehicles: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/dealerData', formData);
      console.log(response.data);
      
    } catch (error) {
      console.error('Error:', error.response.data);
   
    }
  };

  return (
    <div className="container">
       <h4 className="text-center text-uppercase pt-1" style={{ backgroundColor: 'blue', width: '40%', marginLeft: '30%', padding: '10px', color: 'white' }}>
        Dealer Form
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="dealership_email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="dealership_email" name="dealership_email" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="dealership_name" className="form-label">Name</label>
          <input type="text" className="form-control" id="dealership_name" name="dealership_name" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="dealership_location" className="form-label">Location</label>
          <input type="text" className="form-control" id="dealership_location" name="dealership_location" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="dealership_info" className="form-label">Info</label>
          <textarea className="form-control" id="dealership_info" name="dealership_info" onChange={handleChange}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="cars" className="form-label">Cars</label>
          <input type="text" className="form-control" id="cars" name="cars" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="deals" className="form-label">Deals</label>
          <input type="text" className="form-control" id="deals" name="deals" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="sold_vehicles" className="form-label">Sold Vehicles</label>
          <input type="text" className="form-control" id="sold_vehicles" name="sold_vehicles" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default DealerForm;

