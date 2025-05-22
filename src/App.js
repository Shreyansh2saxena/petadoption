
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
import PrivateRoute from './authpage/Privateroute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/adopt"
          element={
            <PrivateRoute>
              <Avilablepet />
            </PrivateRoute>
          }
        />
        <Route
          path="/feed"
          element={
            <PrivateRoute>
              <Petfeed />
            </PrivateRoute>
          }
        />
        <Route
          path="/postform"
          element={
            <PrivateRoute>
              <Postform />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/donate"
          element={
            <PrivateRoute>
              <Donate />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;