import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';


function LoginForm() {
  const [formData, setFormData] = useState({
    dealership_email: '',
    password: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/Dealerlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        navigate('/carview');
        
      } else {
        const errorData = await response.json();
        console.error('Login Error:', errorData.error);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center text-uppercase pt-1" style={{ backgroundColor: 'blue', width: '100%', padding: '15px', color: 'white' }}>Dealer Login</h1>
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
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          <p className="register" style={{ marginRight: '8%' }}>
        New Dealer register here/<Link to="/dealerSign" className="nav-linkr ">
          {' '}
          Register{' '}
        </Link>
      </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
