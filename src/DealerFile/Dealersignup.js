import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

function SignupForm() {
  const [formData, setFormData] = useState({
    dealership_email: '',
    password: '',
    dealership_name: '',
    dealership_location: '', 
    dealership_info: ''      
  });


  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate('/dealerLogin');

      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center text-uppercase pt-1" style={{ backgroundColor: 'blue', width: '100%', padding: '15px', color: 'white' }}>Dealer Signup</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="dealership_email" className="form-label">Email</label>
              <input type="email" className="form-control" id="dealership_email" name="dealership_email" value={formData.dealership_email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="dealership_name" className="form-label">Name</label>
              <input type="text" className="form-control" id="dealership_name" name="dealership_name" value={formData.dealership_name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="dealership_location" className="form-label">Location</label>
              <input type="text" className="form-control" id="dealership_location" name="dealership_location" value={formData.dealership_location} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="dealership_info" className="form-label">Info</label>
              <input type="text" className="form-control" id="dealership_info" name="dealership_info" value={formData.dealership_info} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
