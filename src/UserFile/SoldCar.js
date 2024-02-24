import React, { useState } from 'react';

function SoldVehicleManagement() {
  const [formData, setFormData] = useState({
    car_id: '',
    vehicle_info: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/soldvehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSuccessMessage(' Car Booked successfully!');
        setFormData({
          car_id: '',
          vehicle_info: ''
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add sold vehicle');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center text-uppercase pt-1" style={{ backgroundColor: 'blue', width: '100%', marginLeft: '0%', padding: '15px', color: 'white' }}>Sold Vehicle Management</h1>
      <div className="row" style={{marginLeft:'30%'}}>
        <div className="col-md-6">
          <h3 className="text-center pt-1" style={{ backgroundColor: 'yellow', width: '100%', marginLeft: '0%', padding: '10px', color: 'black' }}>Add New Sold Vehicle</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="car_id" className="form-label">Car ID</label>
              <input type="text" className="form-control" id="car_id" name="car_id" value={formData.car_id} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="vehicle_info" className="form-label">Vehicle Info</label>
              <textarea className="form-control" id="vehicle_info" name="vehicle_info" value={formData.vehicle_info} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Add Sold Vehicle</button>
          </form>
          {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
        </div>
        <div className="col-md-6">
         
        </div>
      </div>
    </div>
  );
}

export default SoldVehicleManagement;
