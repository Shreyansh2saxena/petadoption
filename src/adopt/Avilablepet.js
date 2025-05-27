import React, { useEffect, useState } from "react";
import axios from "axios";
import LoginPage from "../authpage/Login";

export default function AdoptPage() {
  const [selectedPet, setSelectedPet] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [confirmation, setConfirmation] = useState("");
  const [availablePets, setAvailablePets] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false); // Initialize as false
  const userId = localStorage.getItem("userId");

  // Check login status on mount
  useEffect(() => {
    if (userId) {
      setLoggedIn(true);
      fetchAdoptList();
    } else {
      setLoggedIn(false);
    }
  }, [userId]); // Dependency on userId

  const fetchAdoptList = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/donate/adoptablePets/${userId}`);
      if (response.data.success) {
        setAvailablePets(response.data.pets);
        console.log('pets------->', response.data.pets);
      }
    } catch (err) {
      console.error("Failed to fetch adoptable pets:", err);
      // Optionally set an error state to display to the user
    }
  };

  const handleAdoptClick = (pet) => {
    setSelectedPet(pet);
    console.log('Selected pet--->', pet);
    setConfirmation("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = async () => {
    if (!userId) {
      setLoggedIn(false);
      return;
    }
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/donate/send-adoption-mail", {
        ownerName: selectedPet.ownerName,
        adopterName: formData.name,
        adopterEmail: formData.email,
        message: formData.message,
        petName: selectedPet.name,
        ownerEmail: selectedPet.email,
      });

      setConfirmation(`Request sent to adopt ${selectedPet.name}. You'll be contacted soon!`);
      alert(`Request sent to adopt ${selectedPet.name}. You'll be contacted soon!`)
      setFormData({ name: "", email: "", message: "" });
      setSelectedPet(null);
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send request. Please try again.");
    }
  };

  // If not logged in, show LoginPage
  if (!loggedIn) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Pets for Adoption 🐶</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {availablePets.map((pet) => (
          <div key={pet._id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <img
              src={pet?.image?.url}
              alt={pet.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{pet.name}</h3>
              <p className="text-gray-500">{pet.city}</p>
              <button
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => handleAdoptClick(pet)}
              >
                Adopt
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Adoption Form Modal */}
      {selectedPet && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-bold mb-4">Adopt {selectedPet.name}</h3>
            <input
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full mb-3 px-4 py-2 border rounded"
            />
            <input
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full mb-3 px-4 py-2 border rounded"
            />
            <textarea
              name="message"
              placeholder="Why do you want to adopt?"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full mb-4 px-4 py-2 border rounded"
            />
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setSelectedPet(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={sendEmail}
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmation && (
        <div className="mt-6 text-center text-green-700 font-semibold">
          {confirmation}
        </div>
      )}
    </div>
  );
}