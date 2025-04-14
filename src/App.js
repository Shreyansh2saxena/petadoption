
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Avilablepet from './adopt/Avilablepet';
import Login from './authpage/Login';
import Signup from './authpage/Signup';
import Petfeed from './feed/Petfeed';
import Postform from './feed/Postform';
import Profile from './profile/Profile';
import Home from './component/Home';
import Donate from './adopt/Donate';

function App() {

  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/adopt" element={<Avilablepet />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/feed" element={<Petfeed />} />
      <Route path="/postform" element={<Postform />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/donate" element={<Donate/>} />
    </Routes>
  </Router>
  );
}

export default App;
