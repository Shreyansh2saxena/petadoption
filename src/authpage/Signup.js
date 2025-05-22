import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Lottie from "lottie-react";
import animation from '../assests/Animation - 1744618965062.json'; // Import your animation file

const generateFakeJWT = (email) => {
  return btoa(JSON.stringify({ sub: email, exp: Date.now() + 1000 * 60 * 60 }));
};

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: '',
    email: '', 
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;
    
    if (!name.trim()) {
      setError('Name is required');
      return false;
    }
    
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    const { name, email } = formData;
  
    setTimeout(() => {
      // Simulate user registration
      const fakeToken = generateFakeJWT(email);
      localStorage.setItem('jwtToken', fakeToken);
      localStorage.setItem('userName', name);
      navigate('/');
      setIsLoading(false);
    }, 1500); // simulate async registration
  };
  
  return (
    <div className="relative h-[91vh] flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 bg-cover bg-center bg-no-repeat bg-[url('assests/profilepet.png')] dark:bg-[url('assests/profilepetdark.png')]">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 bg-opacity-20 dark:bg-opacity-20 shadow-md rounded p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Sign Up for Pet Adoption
        </h2>
        
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-white opacity-30 dark:opacity-30"
            placeholder="Enter your full name"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-white opacity-30 dark:opacity-30"
            placeholder="Enter your email"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-white opacity-30 dark:opacity-30"
            placeholder="Create a password (min. 6 characters)"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-200 mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-white opacity-30 dark:opacity-30"
            placeholder="Confirm your password"
          />
        </div>
        
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="relative flex items-center justify-center bg-green-600 text-white rounded-full text-base w-1/2 h-10 disabled:opacity-60 mx-auto hover:bg-green-700 transition-colors"
          >
            {isLoading ? (
              <Lottie
                animationData={animation}
                loop
                autoplay
                className="w-10 h-10"
              />
            ) : (
              <span className="text-sm">Sign Up</span>
            )}
          </button>
        </div>

        <div className="text-center mt-4">
          <span className="text-gray-600 dark:text-gray-300">Already have an account? </span>
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;