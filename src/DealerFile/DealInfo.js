import React, { useState, useEffect } from 'react';
import {  Link } from 'react-router-dom';

function DealManagement() {
  const [deals, setDeals] = useState([]);
 

  useEffect(() => {
    fetchDeals();
  }, []);
  
  const fetchDeals = async () => {
   
    try {
      const response = await fetch('http://localhost:8080/allcar');
      if (response.ok) {
        const data = await response.json();
        setDeals(data);
        //navigate('/carsold');

      } else {
        throw new Error('Failed to fetch deals');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

 

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center text-uppercase pt-1" style={{ backgroundColor: 'blue', width: '100%',  padding: '15px', color: 'white' }} >Deal Management</h1>
      <div className="row">
       
        <div className="col-md-8" style={{marginLeft:'20%'}}>
          <h3 className="text-center pt-1" style={{ backgroundColor: 'yellow', width: '100%',  padding: '10px', color: 'black' }}>All Deals</h3>
          <ul className="list-group">
            {deals.map(deal => (
              <li key={deal._id} className="list-group-item">
                <strong>Car ID:</strong> {deal.car_id}<br />
                <strong>Deal Info:</strong> {deal.deal_info}<br />
                <button type ='button' className="btn btn-primary" style={{ marginRight: '8%' ,backgroundColor:'green',width:'20%',marginLeft:'0%' }}>
        <Link to="/carsold" className="nav-linkr ">
          {' '}
          Accept the Deal{' '}
        </Link>
      </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DealManagement;
