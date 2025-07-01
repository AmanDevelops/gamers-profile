import {
  Check,
  Copy,
  ExternalLink,
  Share2,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface Game {
  id: string;
  name: string;
  genre: string;
}

interface LocationState {
  username: string;
  games: Game[];
}

function ProfileSuccess() {
  const location = useLocation();
  const state = location.state as LocationState;
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const profileLink = `${import.meta.env.VITE_SHARE_URL}${
    state?.username || "user"
  }`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileLink);
      setCopied(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${state?.username || "Gamer"}'s Gaming Profile`,
          text: "Check out my gaming profile!",
          url: profileLink,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      handleCopyLink();
    }
  };

  if (!state) {
    return (
      <div className="min-h-screen transition-all duration-500 bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
          <Link
            to="/new-profile"
            className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Create Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-all duration-500 bg-gradient-to-b from-gray-900 to-black text-white py-16">

      <div className="container mx-auto px-4 max-w-2xl">

        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative p-6 rounded-full bg-green-500/20 animate-bounce">
              <Check className="w-16 h-16 text-green-400" />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent">
            Profile Created!
          </h1>
          <p className="text-lg text-gray-300">
            Welcome to the gaming community,{" "}
            <span className="font-semibold text-purple-400">
              {state?.username || "Gamer"}
            </span>
            !
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 mb-8 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                @{state?.username || "user"}
              </h2>
              <p className="text-gray-400">Gaming Profile</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-200">
              Favorite Games ({state?.games?.length || 0})
            </h3>
            <div className="flex flex-wrap gap-2">
              {state?.games?.length > 0 ? (
                state.games.map((game) => (
                  <div
                    key={game.id}
                    className="px-3 py-2 rounded-lg bg-purple-500/20 text-purple-300"
                  >
                    <span className="text-sm font-medium">{game.name}</span>
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 rounded-lg bg-gray-700 text-gray-400">
                  <span className="text-sm font-medium">No games selected</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 mb-8 animate-fade-in">
          <h3 className="text-lg font-semibold mb-4 text-gray-200">
            Your Profile Link
          </h3>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-700 mb-4">
            <ExternalLink className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <code className="flex-1 text-sm text-gray-300 break-all">
              {profileLink}
            </code>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCopyLink}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                copied
                  ? "bg-green-600 text-white"
                  : "bg-purple-500 hover:bg-purple-600 text-white"
              } transform hover:scale-105`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Link
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 bg-gray-700 hover:bg-gray-600 text-white cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 animate-fade-in">
          <h3 className="text-lg font-semibold mb-4 text-white">
            What's Next?
          </h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              <span>Share your profile with friends to show off your game collection</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              <span>Add more games to your profile as your collection grows</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              <span>Use your profile link to flex your gaming taste on social media</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 mb-12">
          <Link
            to="/create-profile"
            className="flex-1 py-3 px-6 rounded-xl font-semibold text-center transition-all duration-300 transform hover:scale-105 bg-gray-700 hover:bg-gray-600 text-white"
          >
            Create Another Profile
          </Link>
          <Link
            to="/"
            className="flex-1 py-3 px-6 rounded-xl font-semibold text-center transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            Explore More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileSuccess;
