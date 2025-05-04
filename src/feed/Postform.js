import { useState } from "react";

export default function PostPetPage() {
  const [newPost, setNewPost] = useState({
    name: "",
    city: "",
    image: "",
    age: "",
    breed: "",
    description: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setNewPost((prevPost) => ({
        ...prevPost,
        image: file,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newPost.name &&
      newPost.city &&
      newPost.image &&
      newPost.age &&
      newPost.breed &&
      newPost.description
    ) {
      alert("Pet Posted!");
      setNewPost({
        name: "",
        city: "",
        image: "",
        age: "",
        breed: "",
        description: "",
      });
      setImagePreview(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4 flex justify-center items-center transition-colors">
      <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-lg p-8 w-full max-w-5xl">
        <h1 className="text-2xl font-semibold text-center mb-8">Post Your Pet</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Image Upload */}
            <div className="flex-1 flex justify-center items-start">
              <label htmlFor="image" className="cursor-pointer relative w-full max-w-xs">
                <div
                  className={`${
                    imagePreview ? "border-4 border-green-500" : "border-2"
                  } border-dashed rounded-xl w-full h-64 flex justify-center items-center bg-gray-100 dark:bg-gray-700`}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Pet Preview"
                      className="object-cover w-full h-full rounded-xl"
                    />
                  ) : (
                    <span className="text-gray-500 dark:text-gray-300 text-lg">Upload Image</span>
                  )}
                </div>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
            </div>

            {/* Pet Details */}
            <div className="flex-1 space-y-4">
              <input
                type="text"
                name="name"
                value={newPost.name}
                onChange={handleChange}
                placeholder="Pet Name"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="city"
                value={newPost.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="age"
                value={newPost.age}
                onChange={handleChange}
                placeholder="Age (in years)"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="breed"
                value={newPost.breed}
                onChange={handleChange}
                placeholder="Breed"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="description"
                value={newPost.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            >
              Post Pet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
