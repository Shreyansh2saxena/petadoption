import { useEffect, useState } from "react";
import { Heart, HeartOff } from "lucide-react";
import axios from 'axios';

export default function PetFeed() {
  const [posts, setPosts] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const userId = localStorage.getItem('userId');

  const toggleLike = async (petId) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/pet/like?petId=${petId}&userId=${userId}`);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === petId ? { ...post, likes: res.data.likes } : post
        )
      );
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  const handleShowDetails = (id) => {
    setShowDetails((prev) => (prev === id ? null : id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchFeed = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/pet/feed/${userId}`);
      console.log('Response Data--->', res);
      setPosts(res.data.pets);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white py-6 px-4 transition-colors">
      <h1 className="text-3xl font-bold text-center mb-8">Pet Adoption Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <div
            key={post._id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 flex flex-col transition-transform transform hover:scale-105"
          >
            <img
              src={post.image.url || "https://via.placeholder.com/300x200?text=Pet+Image"}
              alt={post.name}
              className="rounded-xl h-60 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold">{post.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{post.city}</p>

            {/* Like Button with Counter */}
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => toggleLike(post._id)}
                className="flex items-center gap-2 text-red-500 hover:scale-105 transition"
              >
                {post.likes?.includes(userId) ? (
                  <>
                    <Heart className="w-5 h-5 fill-red-500" />
                    <span>Liked</span>
                  </>
                ) : (
                  <>
                    <HeartOff className="w-5 h-5" />
                    <span>Like</span>
                  </>
                )}
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {post.likes?.length || 0} Likes
              </span>
            </div>

            {/* Show More Button */}
            <button
              onClick={() => handleShowDetails(post._id)}
              className="text-blue-500 dark:text-blue-400 hover:underline mb-2"
            >
              {showDetails === post._id ? "Show Less" : "Show More"}
            </button>           

            {/* Additional Pet Details */}
            {showDetails === post._id && (
              <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Age:</strong> {post.age} years
                </p>
                <p>
                  <strong>Breed:</strong> {post.breed}
                </p>
                <p>
                  <strong>Description:</strong> {post.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}