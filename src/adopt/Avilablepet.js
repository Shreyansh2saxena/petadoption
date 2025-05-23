import React, { useState } from "react";

// Example pet data (normally this would come from your backend)
const availablePets = [
  {
    id: 1,
    name: "Buddy",
    image:
      "https://images.unsplash.com/photo-1618817171250-3dbbe6c59dfb?auto=format&fit=crop&w=500&q=60",
    city: "Mumbai",
    ownerEmail: "john@example.com",
  },
  {
    id: 2,
    name: "Milo",
    image:
      "https://images.unsplash.com/photo-1601758124380-9b67d903ac8a?auto=format&fit=crop&w=500&q=60",
    city: "Delhi",
    ownerEmail: "jane@example.com",
  },
];

export default function AdoptPage() {
  const [selectedPet, setSelectedPet] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [confirmation, setConfirmation] = useState("");

  const handleAdoptClick = (pet) => {
    setSelectedPet(pet);
    setConfirmation("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = () => {
    // Simulate sending email
    console.log("Sending email to:", selectedPet.ownerEmail);
    console.log("Email body:", {
      adopter: formData,
      pet: selectedPet,
    });

    setConfirmation(
      `Request sent to adopt ${selectedPet.name}. You'll be contacted soon!`
    );

    // Clear form and selected pet
    setFormData({ name: "", email: "", message: "" });
    setSelectedPet(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Pets for Adoption 🐶</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {availablePets.map((pet) => (
          <div
            key={pet.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={pet.image}
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
            <h3 className="text-lg font-bold mb-4">
              Adopt {selectedPet.name}
            </h3>
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
