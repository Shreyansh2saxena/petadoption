import React, { useState } from 'react'
import Lottie from 'lottie-react';
import animation from '../assests/Animation - 1744618965062.json'; 

const Donate = () => {
    const [formData, setFormData] = useState({
        name: "",
        breed: "",
        type: "",
        ownerName: "",
        phoneNo: "",
        email: "",
        medicalCertificate: "",
        age: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const hc = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const hsubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const data = new FormData();
        for (let key in formData) {
            data.append(key, formData[key]);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        console.log(data);

        setFormData({
            name: "",
            breed: "",
            type: "",
            ownerName: "",
            phoneNo: "",
            email: "",
            medicalCertificate: "",
            age: "",
        });
    }

    return (
        <div>
            <div className="min-h-screen  dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-10">

                <h1 className="text-4xl font-extrabold text-center mb-10">Donate to Help Pets in Need </h1>

                <form onSubmit={hsubmit} className="relative max-w-lg mx-auto p-8 bg-white dark:bg-gray-900    space-y-6 overflow-hidden">

                    {/* Name */}
                    <div>
                        <label className="block text-lg font-semibold mb-1" htmlFor="name">Name:</label>
                        <input
                            onChange={hc}
                            type="text"
                            id="name"
                            name="name"
                            className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Age */}
                    <div>
                        <label className="block text-lg font-semibold mb-1" htmlFor="age">Age:</label>
                        <input
                            onChange={hc}
                            type="number"
                            id="age"
                            name="age"
                            className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Breed */}
                    <div>
                        <label className="block text-lg font-semibold mb-1" htmlFor="breed">Breed:</label>
                        <input
                            onChange={hc}
                            type="text"
                            id="breed"
                            name="breed"
                            className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Type */}
                    <div>
                        <label className="block text-lg font-semibold mb-1" htmlFor="type">Type:</label>
                        <input
                            onChange={hc}
                            type="text"
                            id="type"
                            name="type"
                            className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Photo */}
                    <div>
                        <label className="block text-lg font-semibold mb-1" htmlFor="photo">Photo:</label>
                        <input
                            onChange={hc}
                            type="file"
                            id="photo"
                            name="photo"
                            accept="image/*"
                            className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Medical Certificate */}
                    <div>
                        <label className="block text-lg font-semibold mb-1" htmlFor="medicalCertificate">Medical Certificate:</label>
                        <input
                            onChange={hc}
                            type="file"
                            id="medicalCertificate"
                            name="medicalCertificate"
                            className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>


                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            onClick={hsubmit}
                            className="relative flex items-center justify-center bg-green-600 text-white rounded-full text-base w-24 h-10" // fixed width and height
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
    )
}

export default Donate