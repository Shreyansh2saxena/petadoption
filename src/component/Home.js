
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { PawPrint, Stethoscope, HeartHandshake, HelpingHand, School } from "lucide-react";


export default function Home() {
  const [formData, setFormData] = useState({
    city: "",
    breed: "",
    pets: [],
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePetSelection = (e) => {
    const selectedPet = e.target.value;
    
    setFormData((prev) => ({
      ...prev,
      pet: prev.pet === selectedPet ? "" : selectedPet,
    }));
  };

  const services = [
    {
      title: "Experienced Staff",
      text: "Our team is experienced in pet care and adoption support.",
      icon: <PawPrint className="w-8 h-8 text-pink-500 mb-4" />,
      link: "/staff",
    },
    {
      title: "Medical Checkup",
      text: "All pets receive regular health checkups before adoption.",
      icon: <Stethoscope className="w-8 h-8 text-green-500 mb-4" />,
      link: "/health-check",
    },
    {
      title: "Better Care",
      text: "We ensure your future pet is cared for and loved.",
      icon: <HeartHandshake className="w-8 h-8 text-yellow-500 mb-4" />,
      link: "/care",
    },
    {
        title: "Adoption Support",
        text: "We guide you throughout the adoption journey for a perfect match.",
        icon: <HelpingHand className="w-8 h-8 text-purple-500 mb-4" />,
        link: "/adoption-support",
      },
      {
        title: "Training Assistance",
        text: "Basic training help to make your pet feel at home.",
        icon: <School className="w-8 h-8 text-blue-500 mb-4" />,
        link: "/training-assistance",
      },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Hero Section */}
      <div className="h-auto">
        <div className="grid justify-items-start m-auto rounded-lg w-[95%] text-white my-6 bg-[url('http://source.colostate.edu/wp-content/uploads/2016/05/pet.health.senior.pets_.body2_.jpg')] bg-cover h-[450px]">
          <div className="flex justify-center">
            <div className="my-[70px] mx-[100px]">
              <h1 className="text-5xl font-bold my-4 tracking-wide">
                You can make a difference in their life
              </h1>
              <p className="mt-[10px] font-bold text-3xl">Adopt today!</p>
              <div className="mt-[95px]">
                <Link
                  className="px-4 py-3 bg-gray-100 text-black rounded-full w-[170px] hover:bg-white hover:shadow-md"
                  to="/donate"
                >
                  DONATE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Adoption Form */}
      <form onSubmit={handleSubmit} className="p-6 mx-[20%] flex flex-wrap gap-4">
        <h1 className="text-2xl font-bold w-full">Find and Adopt :</h1>

       
         {/* Pet Selection (Radio Buttons) */}
         <div className="flex gap-4">
          {["cat", "dog"].map((pet) => (
            <label
              key={pet}
              className="relative cursor-pointer inline-block transition duration-300 hover:scale-105 hover:ring-2 hover:ring-indigo-500 dark:hover:ring-indigo-300"
            >
              <input
                type="radio"
                name="pet" // Same name for all radio buttons
                value={pet}
                checked={formData.pet === pet} // Check if this pet is selected
                onChange={handlePetSelection} // Handle pet selection/deselection
                className="sr-only"
              />
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center ${
                  formData.pet === pet
                    ? "ring-2 ring-indigo-500"
                    : "bg-gray-700"
                }`}
              >
                <img
                  src={
                    pet === "cat"
                      ? "https://tse4.mm.bing.net/th?id=OIP.H4uOxT8c_wEq_81PzW9HAAHaHa&pid=Api&P=0&h=180"
                      : "https://tse2.mm.bing.net/th?id=OIP.mR1bdcwWAk_Z6E665LX3CgHaHa&pid=Api&P=0&h=180"
                  }
                  alt={`${pet} Icon`}
                  className="w-full h-full object-cover rounded-full"
                  title={pet.charAt(0).toUpperCase() + pet.slice(1)}
                />
              </div>
            </label>
          ))}
        </div>

        {/* Form Inputs */}
        <input
          type="text"
          id="city"
          onChange={handleChange}
          value={formData.city}
          className=" p-2 border border-gray-700 dark:border-gray-400 rounded-full shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-800"
          placeholder="City..."
        />
        <input
          type="text"
          id="breed"
          onChange={handleChange}
          value={formData.breed}
          className=" p-2  border border-gray-700 dark:border-gray-400 rounded-full shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-800"
          placeholder="breed..."
        />
        <button
          type="submit"
          className="bg-indigo-300 px-6 py-2 rounded-full text-black dark:text-white hover:bg-indigo-500"
        >
          Find
        </button>
      </form>

      {/* Info Section */}
      <div className="flex flex-col md:flex-row justify-center gap-9 m-20 bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
        <div>
          <img
            src="https://png.pngtree.com/png-clipart/20220206/original/pngtree-cute-cat-pet-png-image_7262541.png"
            alt="Cute Cat"
            className="w-[300px] h-[200px] object-cover"
          />
        </div>
        <div className="my-auto">
          <h1 className="text-4xl mb-4">What should I feed my pet?</h1>
          <p className="text-gray-700 dark:text-gray-300">
            Look for pet foods that meet the nutritional requirements
            established by the Association of American Feed Control Officials
            (AAFCO). Always make sure your pet has access to clean, fresh
            water.
          </p>
        </div>
      </div>

      {/* Featured Image */}
      <div className="w-[80%] m-auto mb-12">
      <img src="https://i.pinimg.com/736x/3c/67/62/3c67627aa25500da403b506a150fb782.jpg" 
          alt="Gemini "
          className="w-full h-[350px] object-cover rounded-lg shadow-md"
      />
      
       
      </div>

      {/* Services Section */}
      <div className="flex flex-wrap justify-center mb-12 gap-8">
      {services.map((service, index) => (
        <a
          key={index}
          href={service.link}
          className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center w-[260px] transition-transform transform hover:-translate-y-2 hover:shadow-2xl duration-300"
        >
          {/* Icon */}
          <div className="flex justify-center">{service.icon}</div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-pink-500">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-gray-500 dark:text-gray-300 text-sm">
            {service.text}
          </p>
        </a>
      ))}
    </div>
      
    </div>
  );
}
