import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

function CarManagement() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

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

  const handleBookCar = (carId) => {
   
    navigate('/cardeal');
  };

  return (
    <div className="container mt-5">
      <h4 className="text-center text-uppercase pt-1" style={{ backgroundColor: 'blue', width: '100%', marginLeft: '0%', padding: '15px', color: 'white' }}>
        CAR MANAGEMENT
      </h4>
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center pt-1" style={{ backgroundColor: 'yellow', width: '100%', marginLeft: '0%', padding: '10px', color: 'black' }}>All Cars</h3>
          <ul className="list-group">
            {cars.map(car => (
              <li key={car._id} className="list-group-item">
                <div className="row">
                  <div className="col-md-">
                    <h5>{car.name}</h5>
                    <h5>CAR.Id :{car._id}</h5>
                    <p>Model: {car.model}</p>
                    <p>{car.car_info}</p>
                    
                   
                  </div>
                  <div className="col-md-12">
                    <img src={car.image_url} alt={car.name} style={{ maxWidth: '1000%', maxHeight: '400px' }} />
                  </div>
                  <button onClick={() => handleBookCar(car._id)} className="btn btn-primary">
                      Book the Car
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
