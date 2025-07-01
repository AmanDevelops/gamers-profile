import { Activity, Check, Gamepad2, Trophy, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (location.state?.profileCreated) {
      setShowSuccessToast(true);
      setUsername(location.state.username);

      const timer = setTimeout(() => {
        setShowSuccessToast(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">

      {showSuccessToast && (
        <div className="fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg bg-green-600 text-white animate-slide-down">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Profile for @{username} created successfully!</span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="hero-content max-w-4xl mx-auto pt-24 pb-16 text-center">
          <div className="flex justify-center mb-8">
            <Gamepad2 className="w-30 h-30 text-purple-400" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent pb-6">
            Your Gaming Legacy
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Create your ultimate gaming profile, showcase your achievements, and
            connect with fellow gamers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/create-profile"
              className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-block text-center"
            >
              Create Your Profile
            </Link>
            <button className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Explore Profiles
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
          <div className="bg-gray-800 p-6 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-gray-750">
        <Trophy className="w-12 h-12 text-purple-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Track Achievements</h3>
        <p className="text-gray-400">
          Document your gaming milestones and showcase your accomplishments on your profile
        </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-gray-750">
        <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Share Your Profile</h3>
        <p className="text-gray-400">
          Create a personalized gaming profile and share it with the gaming community
        </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-gray-750">
        <Activity className="w-12 h-12 text-purple-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Build Your Legacy</h3>
        <p className="text-gray-400">
          Catalog your gaming history and create a lasting record of your gaming journey
        </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="max-w-3xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
              1
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">
              Create Your Profile
              </h3>
              <p className="text-gray-400">
              Sign up and set up your gamer identity with your gaming history, preferred genres, 
              and playing style
              </p>
            </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
              2
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">
              Track Completed Games
              </h3>
              <p className="text-gray-400">
              Add games you've finished to your collection, rate them, and share your completion
              achievements and milestones
              </p>
            </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
              3
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">Showcase Your Library</h3>
              <p className="text-gray-400">
              Display your gaming accomplishments, completion statistics, and favorite titles
              to build your gaming legacy
              </p>
            </div>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-center my-16">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Gaming Journey?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of gamers who are already tracking their progress and
            sharing their achievements
          </p>
          <Link
            to="/create-profile"
            className="cursor-pointer bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Get Started Now
          </Link>
        </div>
      </div>

      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-bold">
              <Gamepad2 className="w-6 h-6 text-purple-400" />
              <span>Gamify</span>
            </div>

            <p className="text-gray-400 text-sm">
              <a href="https://github.com/amandevelops">© 2025 Gamify | Powered by coffee ☕ — Built by AmanDevelops</a>
            
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
