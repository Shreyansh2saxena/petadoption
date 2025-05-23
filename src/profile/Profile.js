import React, { useState, useEffect } from "react";
import axios from 'axios';
const initialUser = {
  name: "shreyansh",
  city: "Mumbai",
  bio: "Animal lover 🐾 | Looking to help pets find a home 🏡",
  profilePic:
    "https://images.unsplash.com/photo-1603415526960-f7e0328c9a4b?auto=format&fit=crop&w=300&q=60",
};


const userContributions = [
  {
    id: 101,
    type: "Adopted",
    name: "Oscar",
    image:
      "https://images.unsplash.com/photo-1583511655826-b53cdd8bd07c?auto=format&fit=crop&w=500&q=60",
    description: "Adopted Oscar in Feb 2024. He's now part of the family!",
  },
  {
    id: 102,
    type: "Donated",
    name: "Shelter Paws",
    image:
      "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=500&q=60",
    description:
      "Donated to Shelter Paws for food and vaccination support in May 2024.",
  },
];

export default function UserProfilePage() {
  const [user, setUser] = useState(initialUser);
  const [editMode, setEditMode] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const userId = localStorage.getItem('userId');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchUserPets = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/pet/getAllPets/${userId}`);
    if(res.data.success){
      setUserPosts(res.data.pets);
    }
    
    console.log(res.data.pets); // render on UI
  } catch (error) {
    console.error('Error fetching user pets:', error.response?.data?.message || error.message);
  }
};

useEffect(() => {
  fetchUserPets();
}, [])


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white py-6 px-4 transition-colors">
      {/* Profile Header */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={user.profilePic}
            alt={user.name}
            className="w-32 h-32 object-cover rounded-full border-4 border-blue-500"
          />
          <div className="text-center md:text-left space-y-2 flex-1">
            {editMode ? (
              <div className="space-y-2">
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Name"
                />
                <input
                  type="text"
                  name="city"
                  value={user.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="City"
                />
                <textarea
                  name="bio"
                  value={user.bio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Bio"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="text-sm"
                />
                <button
                  onClick={() => setEditMode(false)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="text-gray-500 dark:text-gray-300">{user.city}</p>
                <p className="text-gray-700 dark:text-gray-200">{user.bio}</p>
                <div className="flex gap-6 justify-center md:justify-start pt-2">
                  <span className="font-semibold">{userPosts.length}</span>
                  <span className="text-gray-500 dark:text-gray-400">Posts</span>
                </div>
                <button
                  onClick={() => setEditMode(true)}
                  className="mt-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-sm px-4 py-1 rounded"
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-4xl mx-auto mb-10">
        <h3 className="text-xl font-semibold mb-4">My Pets</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {userPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden"
            >
              <img
                src={post.image.url}
                alt={post.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold">{post.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-300">{post.city}</p>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  ❤️ {post.like} likes
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contributions Section */}
      <div className="max-w-4xl mx-auto mb-10">
        <h3 className="text-xl font-semibold mb-4">My Contributions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {userContributions.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow flex flex-col overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded ${
                      item.type === "Adopted"
                        ? "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300"
                        : "bg-yellow-100 text-yellow-600 dark:bg-yellow-800 dark:text-yellow-300"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
