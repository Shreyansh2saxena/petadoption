import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { PawPrint, Stethoscope, HeartHandshake, HelpingHand, School, MessageCircle, DogIcon } from "lucide-react";
import axios from 'axios';

function Home() {
  const [formData, setFormData] = useState({
    city: "",
    breed: "",
    pet: "",
    name: "", // Added for modal form
    email: "", // Added for modal form
    message: "", // Added for modal form
  });
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 🐾 I'm your Pet Adoption Assistant. I'm here to help you find the perfect furry companion! You can ask me about different pet breeds, adoption tips, pet care advice, or anything else related to pets.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredPets, setFilteredPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null); // Added for modal
  const messagesEndRef = useRef(null);
  // const [loggedin, setLoggedIn] = useState(true);
  const [confirmation, setConfirmation] = useState("");
  const userId = localStorage.getItem("userId");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Comprehensive pet care responses
  const petResponses = {
    'hello': "Hello there! 🐾 I'm excited to help you with all your pet-related questions. What would you like to know about?",
    'hi': "Hi! 👋 Welcome to your pet adoption assistant. How can I help you today?",
    'hey': "Hey! 🐕 Ready to talk about pets? What's on your mind?",
    'dog': "Dogs are amazing companions! 🐕 Popular family-friendly breeds include:\n• Golden Retrievers - gentle, loyal, great with kids\n• Labrador Retrievers - friendly, active, easy to train\n• Beagles - small, good-natured, great for families\n• French Bulldogs - calm, affectionate, apartment-friendly\n• Mixed breeds from shelters - unique and loving!\n\nWhat size dog are you considering?",
    'cat': "Cats make wonderful pets! 🐱 Here's what makes them special:\n• Independent but affectionate\n• Great for apartments\n• Lower maintenance than dogs\n• Excellent companions\n• Good for busy lifestyles\n\nIndoor cats live longer, healthier lives. Consider adopting from a shelter!",
    'puppy': "Puppies are adorable but require lots of work! 🐶\n• Need frequent potty breaks (every 2-3 hours)\n• Require puppy-proofing your home\n• Need socialization and training\n• Multiple vet visits for vaccinations\n• Lots of energy and attention needed\n\nConsider adopting an adult dog - they're often calmer and house-trained!",
    'kitten': "Kittens are so cute! 🐱 Important kitten care tips:\n• Keep them indoors until fully vaccinated\n• Feed kitten-specific food until 1 year old\n• Provide scratching posts\n• Schedule spay/neuter around 4-6 months\n• Lots of playtime for proper development\n\nAdult cats from shelters can be just as rewarding!",
    'food': "Pet nutrition is crucial! 🍽️\n\nFor Dogs:\n• High-quality protein as first ingredient\n• Age-appropriate (puppy, adult, senior)\n• Avoid chocolate, grapes, onions\n\nFor Cats:\n• Cats are obligate carnivores - need meat\n• Wet food helps with hydration\n• Avoid milk (most cats are lactose intolerant)\n\nAlways transition foods gradually over 7-10 days!",
    'feeding': "Feeding schedules matter! ⏰\n\nPuppies: 3-4 times daily\nAdult dogs: 2 times daily\nKittens: 3-4 times daily\nAdult cats: 2 times daily\n\nMeasure portions to prevent obesity. Fresh water should always be available!",
    'exercise': "Exercise keeps pets healthy and happy! 🏃‍♂️\n\nDogs:\n• Daily walks (30min-2hrs depending on breed)\n• Playtime and mental stimulation\n• Swimming is great low-impact exercise\n\nCats:\n• Interactive toys (laser pointers, feather wands)\n• Climbing trees and perches\n• 10-15 minutes of active play daily\n\nRegular exercise prevents behavioral problems!",
    'training': "Training is essential! 🎓\n\nBasic commands:\n• Sit, Stay, Come, Down\n• Start with short 5-10 minute sessions\n• Use positive reinforcement (treats, praise)\n• Be consistent and patient\n• Socialize early with people and other animals\n\nConsider puppy classes or professional trainers for best results!",
    'grooming': "Regular grooming keeps pets healthy! ✂️\n\nDogs:\n• Brush regularly (daily for long hair)\n• Bath monthly or when dirty\n• Trim nails every 2-3 weeks\n• Clean ears weekly\n\nCats:\n• Brush long-haired cats daily\n• Most cats groom themselves\n• Trim nails every 2 weeks\n• Brush teeth regularly\n\nStart grooming routines early!",
    'vet': "Regular vet care is crucial! 🏥\n\nSchedule:\n• Annual checkups for young adults\n• Bi-annual for seniors (7+ years)\n• Immediate care for emergencies\n• Keep vaccinations current\n• Discuss parasite prevention\n\nFind a vet before you need one!",
    'vaccinations': "Vaccinations protect your pet! 💉\n\nDogs need:\n• DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza)\n• Rabies (required by law)\n• Bordetella (kennel cough)\n\nCats need:\n• FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia)\n• Rabies\n\nYour vet will create the best schedule for your pet!",
    'sick': "Signs your pet might be sick: 🤒\n• Loss of appetite\n• Lethargy or unusual behavior\n• Vomiting or diarrhea\n• Difficulty breathing\n• Excessive drooling\n• Changes in bathroom habits\n\nWhen in doubt, call your vet! Early treatment is often more effective and less expensive.",
    'adopt': "Pet adoption is wonderful! 🏠 Here's how to prepare:\n\n1. Research different pets and breeds\n2. Pet-proof your home\n3. Buy essential supplies\n4. Find a local veterinarian\n5. Plan for adjustment period (2-3 weeks)\n6. Budget for ongoing costs\n\nShelter pets are often already spayed/neutered and vaccinated!",
    'shelter': "Animal shelters are amazing! 🏛️ Benefits:\n• Save a life\n• Often already spayed/neutered\n• Usually house-trained (adult pets)\n• Variety of ages and personalities\n• Lower cost than pet stores\n• Staff can help match you perfectly\n\nVisit local shelters to meet available pets!",
    'cost': "Pet ownership costs include: 💰\n\nInitial costs:\n• Adoption fee: $50-300\n• Supplies: $200-500\n• Initial vet visit: $100-200\n\nOngoing monthly costs:\n• Food: $20-50\n• Basic healthcare: $30-80\n• Toys/treats: $10-30\n\nEmergency fund: $500-1000\nBudget carefully - pets live 10-20 years!",
    'prepare': "Preparing for a new pet: 📋\n\n🏠 Pet-proof your home:\n• Remove toxic plants\n• Secure loose wires\n• Put away small objects\n• Install baby gates if needed\n\n🛍️ Essential supplies:\n• Food and water bowls\n• Quality pet food\n• Collar and ID tag\n• Leash (dogs) or carrier (cats)\n• Bed and blankets\n• Toys for mental stimulation\n\nPatience is key during the adjustment period!",
    'best pet': "The best pet depends on your lifestyle! 🤔\n\nFor apartments: Cats, small dogs (French Bulldogs, Cavaliers)\nFor families: Golden Retrievers, Labs, mixed breeds\nFor first-time owners: Cats or calm dog breeds\nFor active people: Border Collies, Australian Shepherds\nFor seniors: Calm, smaller pets\n\nConsider your time, space, and energy levels!",
    'beginner': "Great pets for beginners: 👶\n\n🐱 Cats (especially adults):\n• More independent\n• Easier daily care\n• Good for apartments\n\n🐕 Calm dog breeds:\n• Cavalier King Charles Spanial\n• French Bulldog\n• Pug\n• Older shelter dogs\n\nStart with one pet and gain experience first!",
    'family': "Family-friendly pets: 👨‍👩‍👧‍👦\n\n🐕 Great family dogs:\n• Golden Retrievers - gentle giants\n• Labrador Retrievers - loyal and active\n• Beagles - small and sturdy\n• Mixed breeds - often well-balanced\n\n🐱 Family cats:\n• Ragdolls - calm and cuddly\n• Maine Coons - gentle giants\n• American Shorthairs - easygoing\n\nAlways supervise young children with pets!",
    'apartment': "Perfect apartment pets: 🏢\n\n🐱 Cats are ideal:\n• No daily walks needed\n• Quiet (usually)\n• Use litter boxes\n\n🐕 Small dogs:\n• French Bulldogs\n• Cavalier King Charles Spaniels\n• Pugs\n• Boston Terriers\n\nConsider noise levels and exercise needs!",
    'behavior': "Common pet behavioral tips: 🧠\n\n🐕 Dogs:\n• Consistency is key in training\n• Exercise reduces destructive behavior\n• Positive reinforcement works best\n• Address issues early\n\n🐱 Cats:\n• Provide scratching posts\n• Multiple litter boxes\n• Vertical spaces to climb\n• Interactive play daily\n\nPatience and understanding go a long way!",
    'aggressive': "Addressing aggression: ⚠️\n\n• Never punish aggressive behavior\n• Identify triggers (fear, protection, pain)\n• Consult a professional trainer\n• Ensure pets feel safe and secure\n• Rule out medical issues first\n\nAggression often stems from fear or anxiety. Professional help is recommended!",
    'emergency': "Pet emergencies - know the signs: 🚨\n\n• Difficulty breathing\n• Unconsciousness\n• Severe bleeding\n• Suspected poisoning\n• Inability to urinate\n• Bloated stomach (dogs)\n• Seizures\n\nHave your emergency vet's number readily available. Don't wait - call immediately!",
    'poison': "Common pet toxins to avoid: ☠️\n\n• Chocolate (especially dark)\n• Grapes and raisins\n• Onions and garlic\n• Xylitol (sugar substitute)\n• Certain plants (lilies, azaleas)\n• Human medications\n\nIf poisoning is suspected, call poison control or your vet immediately!",
    'thanks': "You're so welcome! 😊 I'm here anytime you need pet advice. Your future furry friend is lucky to have such a caring owner!",
    'thank you': "You're very welcome! 🐾 Feel free to ask me anything else about pets. I love helping people become great pet parents!",
    'bye': "Goodbye! 👋 Best of luck with your pet journey. Remember, adopting a pet is one of life's most rewarding experiences! 🐾❤️"
  };

  const getResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    for (const [key, response] of Object.entries(petResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    return "That's a great question! 🤔 While I might not have specific information about that, here are some topics I can help you with:\n\n🐕 Dog breeds and care\n🐱 Cat breeds and care\n🏠 Pet adoption process\n💰 Pet costs and budgeting\n🏥 Basic health and vet care\n🎓 Training and behavior\n🍽️ Feeding and nutrition\n\nWhat would you like to know more about?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);
    setTimeout(() => {
      const botResponse = getResponse(currentMessage);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What's the best pet for beginners?",
    "How do I prepare for pet adoption?",
    "Tell me about dog breeds for families",
    "Cat vs dog - which is right for me?",
    "What are pet adoption costs?",
    "How often should I feed my pet?"
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePetSelection = (e) => {
    const selectedPet = e.target.value;
    setFormData((prev) => ({
      ...prev,
      pet: prev.pet === selectedPet ? "" : selectedPet,
    }));
  };

  const sendEmail = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }
    console.log('selected chat-->', selectedPet);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/donate/search-pet", {
        city: formData.city,
        breed: formData.breed,
        pet: formData.pet,
      });
      console.log("Filtered pets:", response.data.data);
      setFilteredPets(response.data.data);
    } catch (error) {
      console.error("Failed to fetch pets:", error);
    }
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
        <h1 className="text-2xl font-bold w-full">Find and Adopt:</h1>
        <div className="flex gap-4">
          {["cat", "dog"].map((pet) => (
            <label
              key={pet}
              className="relative cursor-pointer inline-block transition duration-300 hover:scale-105 hover:ring-2 hover:ring-indigo-500 dark:hover:ring-indigo-300"
            >
              <input
                type="radio"
                name="pet"
                value={pet}
                checked={formData.pet === pet}
                onChange={handlePetSelection}
                className="sr-only"
              />
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center ${formData.pet === pet
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
        <input
          type="text"
          id="city"
          onChange={handleChange}
          value={formData.city}
          className="p-2 border border-gray-700 dark:border-gray-400 rounded-full shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-800"
          placeholder="City..."
        />
        <input
          type="text"
          id="breed"
          onChange={handleChange}
          value={formData.breed}
          className="p-2 border border-gray-700 dark:border-gray-400 rounded-full shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-800"
          placeholder="Breed..."
        />
        <button
          type="submit"
          className="bg-indigo-300 px-6 py-2 rounded-full text-black dark:text-white hover:bg-indigo-500"
        >
          Find
        </button>
      </form>

      {/* Pet List Section */}
      <div className="w-[80%] m-auto mb-12">
        <h2 className="text-2xl font-bold mb-6">Available Pets</h2>
        {filteredPets.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300 text-center">
            No pets found. Try adjusting your search criteria!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.map((pet) => (
              <div
                key={pet.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl duration-300"
              >
                <img
                  src={pet?.image?.url || "https://via.placeholder.com/300x200?text=Pet+Image"}
                  alt={pet.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">{pet.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">Breed: {pet.breed}</p>
                  <p className="text-gray-600 dark:text-gray-300">City: {pet.user.city}</p>
                  <button
                    onClick={() => setSelectedPet(pet)}
                    className="mt-4 inline-block bg-green-300 px-4 py-2 rounded-full text-black dark:text-white hover:bg-green-500"
                  >
                    Adopt
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Adoption Modal */}
      {selectedPet && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Adopt {selectedPet.name}</h3>
            <input
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full mb-3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
            />
            <input
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full mb-3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
            />
            <textarea
              name="message"
              placeholder="Why do you want to adopt?"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
            />
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded text-black dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500"
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
        <img
          src="https://i.pinimg.com/736x/3c/67/62/3c67627aa25500da403b506a150fb782.jpg"
          alt="Featured Pet"
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
            <div className="flex justify-center">{service.icon}</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-pink-500">
              {service.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              {service.text}
            </p>
          </a>
        ))}
      </div>

      <DogIcon
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 h-16 w-16 bg-blue-400 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
      />

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-800">Pet Adoption Assistant</h1>
              </div>
              <p className="text-gray-600">Your friendly guide to pet adoption and care! Ask me anything about pets.</p>
            </div>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-6 h-6" />
                  <span className="font-semibold">Chat here</span>
                  <div className="ml-auto flex items-center gap-1">
                    <button className="hover:text-red-400" onClick={() => setIsOpen(false)}>close</button>
                  </div>
                </div>
              </div>
              <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >


                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-white text-gray-800 shadow-md border'
                        }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'
                        }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 shadow-md border rounded-lg px-4 py-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-4 bg-white border-t">
                <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs закончился bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-white border-t">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me about pet adoption, care, breeds, training, or anything pet-related..."
                      className="w-full px-2 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows={2}
                      disabled={isLoading}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="text-white p-2 rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-2"
                  >
                    <PawPrint className="w-8 h-8 text-purple-900" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Home