import React, { useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email: userEmail,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const { token } = await response.json();
   
      console.log(token);
      setError('');
    
      navigate('/carshow');

    } catch (error) {
      setError(error.message || 'Invalid credentials');
    }
  };

  return (
    <div className="container mt-5">
      <h4 className="text-center text-uppercase pt-1" style={{ backgroundColor: 'blue', width: '50%', marginLeft: '25%', padding: '10px', color: 'white' }}>
        Admin Login
      </h4>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="userEmail" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="userEmail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          <p className="register" style={{ marginRight: '8%' }}>
        New User register here/<Link to="/user" className="nav-linkr ">
          {' '}
          Register{' '}
        </Link>
      </p>
      <p className="register" style={{ marginRight: '8%' }}>
         Dealer Login here/<Link to="/dealerLogin" className="nav-linkr ">
          {' '}
          Login {' '}
        </Link>
      </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
