import React, { useState, useEffect } from 'react';
import {  Link } from 'react-router-dom';

function CarManagement() {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    model: '',
    image_url: '',
    car_info: ''
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:8080/carshow');
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to add car');
      }
      setFormData({
        type: '',
        name: '',
        model: '',
        image_url: '',
        car_info: ''
      });
      fetchCars();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
       <h4 className="text-center text-uppercase pt-1" style={{ backgroundColor: 'blue', width: '100%', marginLeft: '0%', padding: '15px', color: 'white' }}>
        CAR MANAGEMENT
      </h4>
      <div className="row">
        <div className="col-md-4">
          <h3 className="text-center pt-1" style={{ backgroundColor: 'yellow', width: '100%', marginLeft: '0%', padding: '10px', color: 'black' }}>Add New Car</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="type" className="form-label">Type</label>
              <input type="text" className="form-control" id="type" name="type" value={formData.type} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="model" className="form-label">Model</label>
              <input type="text" className="form-control" id="model" name="model" value={formData.model} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="image_url" className="form-label">Image URL</label>
              <input type="text" className="form-control" id="image_url" name="image_url" value={formData.image_url} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="car_info" className="form-label">Car Info</label>
              <textarea className="form-control" id="car_info" name="car_info" value={formData.car_info} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{width:'100%'}}>Add Car</button>
          </form>
        </div>
        <div className="col-md-8">
          <h3 className="text-center pt-1" style={{ backgroundColor: 'yellow', width: '100%', marginLeft: '0%', padding: '10px', color: 'black' }}>All Cars</h3>
          <ul className="list-group">
            {cars.map(car => (
              <li key={car._id} className="list-group-item">
                <div className="row">
                  <div className="col-md-">
                    <h5>{car.name}</h5>
                    <h5>CAR ID : {car._id}</h5>
                    <p>Model: {car.model}</p>
                    <p>{car.car_info}</p>
                   
                  </div>
                  <div className="col-md-12">
                    <img src={car.image_url} alt={car.name} style={{ maxWidth: '100%', maxHeight: '300px' }} />
                  </div>
                  <button type ='button' className="btn btn-primary" style={{ marginRight: '8%' ,backgroundColor:'black',width:'30%',marginLeft:'2%' }}>
        <Link to="/dealinfo" className="nav-linkr ">
          {' '}
          Check the Car Deal{' '}
        </Link>
      </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CarManagement;


