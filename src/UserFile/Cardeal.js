import React, { useState } from 'react';


function DealManagement() {
  const [formData, setFormData] = useState({
    car_id: '',
    deal_info: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/cardeal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setFormData({
          car_id: '',
          deal_info: ''
        });
        setSuccessMessage('Car Book successfully!');

        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
       
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleContinueBooking = () => {
    
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center text-uppercase pt-1" style={{ backgroundColor: 'blue', width: '100%', marginLeft: '0%', padding: '15px', color: 'white' }}>Deal Management</h1>
      <div className="row" style={{ marginLeft: '25%' }}>
        <div className="col-md-6">
          <h3 className="text-center pt-1" style={{ backgroundColor: 'yellow', width: '100%', marginLeft: '0%', padding: '10px', color: 'black' }}>Add New Deal</h3>
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
              <button type="button" className="btn btn-primary ml-2" onClick={handleContinueBooking}>Continue Booking</button>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="car_id" className="form-label">CAR ID</label>
              <input type="text" className="form-control" id="car_id" name="car_id" value={formData.car_id} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="deal_info" className="form-label">Deal Info</label>
              <textarea className="form-control" id="deal_info" name="deal_info" value={formData.deal_info} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Add Deal</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DealManagement;
