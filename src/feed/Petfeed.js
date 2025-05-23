import { useState } from "react";
import { Heart, HeartOff } from "lucide-react";

const dummyPosts = [
  {
    id: 1,
    name: "Bella",
    city: "Mumbai",
    image:
      "https://images.unsplash.com/photo-1601758123927-196d5f1a1a1e?auto=format&fit=crop&w=500&q=60",
    age: 2,
    breed: "Golden Retriever",
    description: "Bella is a playful and friendly dog who loves the outdoors.",
  },
  {
    id: 2,
    name: "Max",
    city: "Delhi",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1c123d6?auto=format&fit=crop&w=500&q=60",
    age: 3,
    breed: "Beagle",
    description: "Max is energetic and loves to run in the park.",
  },
  {
    id: 3,
    name: "Luna",
    city: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=500&q=60",
    age: 1,
    breed: "Poodle",
    description: "Luna is friendly and loves cuddling.",
  },
];

export default function PetFeed() {
  const [likedPosts, setLikedPosts] = useState([]);
  const [showDetails, setShowDetails] = useState(null);

  const toggleLike = (id) => {
    setLikedPosts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleShowDetails = (id) => {
    setShowDetails((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white py-6 px-4 transition-colors">
      <h1 className="text-3xl font-bold text-center mb-8">Pet Adoption Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 flex flex-col transition-transform transform hover:scale-105"
          >
            <img
              src={post.image}
              alt={post.name}
              className="rounded-xl h-60 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold">{post.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{post.city}</p>

            {/* Like Button with Counter */}
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => toggleLike(post.id)}
                className="flex items-center gap-2 text-red-500 hover:scale-105 transition"
              >
                {likedPosts.includes(post.id) ? (
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
                {likedPosts.filter((id) => id === post.id).length} Likes
              </span>
            </div>

            {/* Button to Show More Details */}
            <button
              onClick={() => handleShowDetails(post.id)}
              className="text-blue-500 dark:text-blue-400 hover:underline"
            >
              {showDetails === post.id ? "Show Less" : "Show More"}
            </button>

            {/* Additional Pet Details */}
            {showDetails === post.id && (
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
