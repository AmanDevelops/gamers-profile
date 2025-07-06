import { CircleCheck, Gamepad2, Heart, Plus, Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Game {
  id: number;
  title: string;
  image: string;
  released: string;
  playTime: string;
  favorite: boolean;
}
function ViewProfile() {
  const [games, setGames] = useState<Game[]>([]);
  const { username } = useParams<{ username: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        if (!username) {
          throw new Error("Username is required");
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_ENDPOINT}/users/${username.toLowerCase()}.json`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        if (data) {
          let gamesArray;
          if (Array.isArray(data)) {
            gamesArray = data;
          } else if (data.games && Array.isArray(data.games)) {
            gamesArray = data.games;
          } else if (typeof data === "object") {
            gamesArray = Object.keys(data)
              .map((key) => {
                if (key === "games" && Array.isArray(data[key])) {
                  return data[key];
                }
                return { id: key, ...data[key] };
              })
              .flat();
          } else {
            gamesArray = [];
          }
          setGames(gamesArray);
        } else {
          setGames([]);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching games:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [username]);

  if (loading)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col text-wrap">
      <header className="bg-black border-b border-purple-900/30 py-6">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <Gamepad2 className="w-8 h-8 text-purple-500 animate-float" />
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent animate-glow text-center sm:text-left">
              {username}'s Gaming Journey
            </h1>
          </div>
          <Link
            to="/create-profile"
            className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 
                 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 
                 text-white text-sm sm:text-base font-semibold 
                 rounded-2xl shadow-lg transition-transform duration-200 
                 cursor-pointer
                 hover:scale-105 hover:shadow-xl 
                 focus:outline-none focus:ring-2 focus:ring-pink-300
                 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Create Your Profile Now</span>
            <span className="sm:hidden">Create Profile</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <div
              key={game.id}
              className="group bg-gray-800/30 border border-purple-900/30 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 shadow-lg hover:shadow-purple-500/20 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                {game.favorite && (
                  <Heart className="absolute top-2 right-2 w-6 h-6 text-red-500 fill-current animate-pulse-slow" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 space-y-4">
                <h2 className="text-xl font-bold group-hover:text-purple-400 transition-colors duration-300">
                  {game.title}
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 group-hover:translate-x-2 transition-transform duration-300">
                    <CircleCheck className="w-4 h-4 text-green-400" />

                    <span className="text-gray-300">{game.playTime}</span>
                  </div>
                  <div className="flex items-center space-x-2 group-hover:translate-x-2 transition-transform duration-300">
                    <Rocket className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300">{game.released.slice(0,4)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-black border-t border-purple-900/30 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p className="hover:text-purple-400 transition-colors duration-300">
            <a href="https://github.com/amandevelops">
              © 2025 Gamify | Powered by coffee ☕ — Crafted by AmanDevelops 🛠️
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default ViewProfile;
