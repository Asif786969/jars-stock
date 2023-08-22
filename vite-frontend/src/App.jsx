import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Explore from './pages/Explore';


import './App.css'

import StockPage from './pages/StockPage';
import Alarms from './pages/Alarms';

function App() {
  return ( 
    <>
    <Router>      
    {/* <Navbarheading/> */}
        <Routes>
           
          {/*<Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgotpassword" element={<ForgotPassword/>}/> */}
          <Route path="/alarms" element={<Alarms/>}/>
          <Route path="/" element={<Explore />} />
          <Route path="/userstocks" element={<StockPage/>}/>
          
        </Routes>            
    </Router>
    </>
    
  );
}

export default App
