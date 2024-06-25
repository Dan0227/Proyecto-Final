import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AuthContainer from './components/AuthContainer';
import Inventory from './pages/Inventory';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import ForgotPass from './pages/ForgotPassword'

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthContainer />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/forgot-password' element={<ForgotPass/>} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
