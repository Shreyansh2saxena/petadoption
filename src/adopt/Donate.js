import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import animation from '../assests/Animation - 1744618965062.json';
import axios from 'axios';

const Donate = () => {
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        type: '',
        ownerName: '',
        email: '',
        age: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Function to decode JWT
    const decodeToken = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (err) {
            console.error('Token decoding failed:', err);
            return null;
        }
    };

    // Fetch ownerName and email from token
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const user = localStorage.getItem('userName');
        if (token) {
            const decoded = decodeToken(token);
            if (decoded && decoded.email) {
                setFormData((prev) => ({
                    ...prev,
                    ownerName: user,
                    email: decoded.email,
                }));
            } else {
                setError('Invalid or incomplete token data');
            }
        } else {
            setError('No token found in localStorage');
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target; // Use name instead of id
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        const data = new FormData();
        for (let key in formData) {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        }

        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.post(`http://localhost:5000/api/donate/pet/${userId}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccess('Form submitted successfully!');
            setFormData({
                name: '',
                breed: '',
                type: '',
                ownerName: formData.ownerName,
                email: formData.email,
                age: '',
            });
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-10">
                <h1 className="text-4xl font-extrabold text-center mb-10">Donate to Help Pets in Need</h1>

                <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto p-8 bg-white dark:bg-gray-900 space-y-6 overflow-hidden">
                    <div>
                        <label className="block text-lg font-semibold mb-1" htmlFor="name">
                            Name:
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"

                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold mb-1" htmlFor="age">
                            Age:
                        </label>
                        <input
                            onChange={handleChange}
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"

                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold mb-1" htmlFor="breed">
                            Breed:
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            id="breed"
                            name="breed"
                            value={formData.breed}
                            className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"

                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold mb-1" htmlFor="type">
                            Type:
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            id="type"
                            name="type"
                            value={formData.type}
                            className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"

                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold mb-1" htmlFor="photo">
                            Photo:
                        </label>
                        <input
                            onChange={handleChange}
                            type="file"
                            id="photo"
                            name="image"
                            accept="image/*"
                            className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-3 w-full focus:outline-none opacity-30 dark:opacity-30 focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {success && <p className="text-green-500 text-center">{success}</p>}

                    <div className="text-center">
                        <button
                            type="submit"
                            className="relative flex items-center justify-center bg-green-600 text-white rounded-full text-base w-24 h-10"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Lottie
                                    animationData={animation}
                                    loop
                                    autoplay
                                    className="w-10 h-10"
                                />
                            ) : (
                                <span className="text-sm">Submit</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Donate;