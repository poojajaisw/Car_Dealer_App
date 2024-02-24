import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './UserFile/UserForm'; 
import Dealer from './DealerFile/Dealer'
import Cardeal from './UserFile/Cardeal'
import Carshow from './UserFile/Carshow'
import SoldCar from './UserFile/SoldCar'
import Admin from './UserFile/Admin'
import Carview from'./UserFile/Carview'
import Dealersignup from './DealerFile/Dealersignup'
import DealerLogin from './DealerFile/DealerLogin'
import DealInfo from './DealerFile/DealInfo'

const App = () => {
  return (
    <>
      
      <Router>
      
        <Routes>
        <Route path="/" element={<Admin />} />
          <Route path="/user" element={<UserForm />} />
          <Route path="/dealer" element={<Dealer/>} />
          <Route path="/cardeal" element={<Cardeal/>} />
          <Route path="/carshow" element={<Carshow/>} />
          <Route path="/carview" element={<Carview/>} />
          <Route path="/carsold" element={<SoldCar/>} />
          <Route path="/dealerSign" element={<Dealersignup/>} />
          <Route path="/dealerLogin" element={<DealerLogin/>} />
          <Route path="/dealInfo" element={<DealInfo/>} />

          
        </Routes>
      </Router>
    </>
  );
};

export default App;
