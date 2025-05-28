import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Lottie from "lottie-react";
import animation from '../assests/Animation - 1744618965062.json'; 
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');
  const { email, password } = credentials;

  try {
    const response = await axios.post('http://localhost:5000/api/user/login', {
      email,
      password
    });

    if (response.data.success) {
      const { token, user } = response.data;

     
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('userName', user.name); 
      localStorage.setItem('userId', user.id);

      navigate('/');
    } else {
      setError(response.data.message || 'Login failed');
    }
  } catch (error) {
    if (error.response && error.response.data) {
      setError(error.response.data.message || 'Login failed');
    } else {
      setError('Something went wrong. Please try again.');
    }
  } finally {
    setIsLoading(false);
  }
};
  
  return (
<div className="relative h-[91vh] flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 bg-cover bg-center bg-no-repeat bg-[url('assests/profilepet.png')] dark:bg-[url('assests/profilepetdark.png')]">

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 bg-opacity-20 dark:bg-opacity-20  shadow-md rounded p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Login to Pet Adoption
        </h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-100 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-white "
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-200 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-white opacity-30 dark:opacity-30"
          />
        </div>
        <div className="text-center">
  <button
    type="submit"
    disabled={isLoading}
    className="relative flex items-center justify-center bg-green-600 text-white rounded-full text-base w-1/2 h-10 disabled:opacity-60 mx-auto"
  >
    {isLoading ? (
      <Lottie
        animationData={animation}
        loop
        autoplay
        className="w-10 h-10"
      />
    ) : (
      <span className="text-sm">Login</span>
    )}
  </button>
</div>


        <div className="text-center mt-4">
          <span className="text-gray-600 dark:text-gray-300">Don't have an account? </span>
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
