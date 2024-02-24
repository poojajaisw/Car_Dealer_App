import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';


function RegistrationForm() {
  const [formData, setFormData] = useState({
    user_email: '',
    password: '',
    user_location: '',
    user_info: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/userdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
    
      setFormData({
        user_email: '',
        password: '',
        user_location: '',
        user_info: ''
      });
      navigate('/carshow');
    } catch (error) {
      console.error('Error:', error);
      
    }
  };

  return (
    <div className="container mt-5">
      <h4 className="text-center text-uppercase pt-1" style={{ backgroundColor: 'blue', width: '40%', marginLeft: '30%', padding: '10px', color: 'white' }}>
        User Registration Form
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="user_email" className="form-label">Email</label>
          <input
            type="email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="user_location" className="form-label">Location</label>
          <input
            type="text"
            name="user_location"
            value={formData.user_location}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="user_info" className="form-label">Additional Info</label>
          <textarea
            name="user_info"
            value={formData.user_info}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
