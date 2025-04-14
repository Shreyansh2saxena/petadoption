import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react'; // we'll use lucide-react for icons

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <nav className="flex justify-between items-center p-4 bg-green-600 dark:bg-gray-800">
      <h2 className="text-white text-2xl font-bold">Pet Adoption</h2>
      <div className="flex items-center space-x-6">
        <Link to="/adopt" className="text-white hover:text-yellow-300 font-semibold">Adopt</Link>
        <Link to="/feed" className="text-white hover:text-yellow-300 font-semibold">Feed</Link>
        <Link to="/postform" className="text-white hover:text-yellow-300 font-semibold">Post a Pet</Link>
        <Link to="/profile" className="text-white hover:text-yellow-300 font-semibold">Profile</Link>
        <Link to="/login" className="text-white hover:text-yellow-300 font-semibold">Login</Link>
        <Link to="/signup" className="text-white hover:text-yellow-300 font-semibold">Signup</Link>

        {/* Dark Mode Toggle Button */}
        <button onClick={toggleDarkMode} className="text-white hover:text-yellow-300">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
