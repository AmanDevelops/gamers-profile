import { CircleCheck, Gamepad2, Heart, Trophy } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GameSelector, { type SelectedGame } from "../components/GameSelector";
import UsernameInput, {
  type onStatusChangeProps,
} from "../components/UsernameInput";

function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [usernameStatus, setusernameStatus] =
    useState<onStatusChangeProps>("idle");
  const [selectedGames, setSelectedGames] = useState<SelectedGame[]>([]);

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };

  const handleStatusChange = (status: onStatusChangeProps) => {
    setusernameStatus(status);
  };

const handleGamesSelected = (games: SelectedGame[]) => {
  setSelectedGames((prev) =>
    games.map((newGame) => {
      const existing = prev.find((g) => g.id === newGame.id);
      return {
        ...newGame,
        favorite: existing?.favorite ?? false,
      };
    })
  );
};

  const toggleFavourite = (id: number) => {
    setSelectedGames((prev) =>
      prev.map((game) =>
        game.id === id ? { ...game, favorite: !game.favorite } : game
      )
    );
  };

  const mapSelectedGames = (games: SelectedGame[]) =>
    games.map((game) => ({
      id: game.id,
      title: game.title,
      image: game.image,
      genres: game.genres,
      playTime: game.playTime,
      favorite: game.favorite,
    }));

  const mapGamesForNavigation = (games: SelectedGame[]) =>
    games.map((game) => ({
      id: game.id,
      name: game.title,
      genre: game.genres,
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameStatus === "available") {
      try {
        const gamesData = mapSelectedGames(selectedGames);

        const response = await fetch(
          `${import.meta.env.VITE_API_ENDPOINT}/users/${username.toLowerCase()}.json`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              games: gamesData,
            }),
          }
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to create profile");
        }
        navigate("/profile-success", {
          state: {
            profileCreated: true,
            username: username,
            games: mapGamesForNavigation(selectedGames),
          },
        });
      } catch (error) {
        console.error("Error creating profile:", error);
        alert("Failed to create profile. Please try again.");
      }
    }
    return;
  };

  return (
    <div className="min-h-screen transition-all duration-500 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 max-w-5xl py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-purple-500/20   animate-pulse">
              <Gamepad2 className="w-12 h-12 text-purple-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4   bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Create Your Profile
          </h1>
          <p className="text-lg text-gray-300">
            Choose your username and favorite games to get started
          </p>
        </div>

        <div className="relative z-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 transition-all duration-300">
              <label className="block text-sm font-semibold mb-3 text-gray-200">
                Choose Your Username
              </label>
              <UsernameInput
                onUsernameChange={handleUsernameChange}
                onStatusChange={handleStatusChange}
              />
              {usernameStatus == "available" && (
                <GameSelector onGamesSelected={handleGamesSelected} />
              )}
            </div>

            {selectedGames.length > 0 && (
              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-lg hover:shadow-purple-500/30 cursor-pointer"
                >
                  Create Profile
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="relative z-0 mt-8">
          {selectedGames.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-purple-400">
                Your Selected Games
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedGames.map((game, index) => (
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
                      {game.favorite ? (
                        <Heart
                          onClick={() => toggleFavourite(game.id)}
                          className="absolute top-2 right-2 w-6 h-6 text-red-500 fill-current animate-pulse-slow cursor-pointer"
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        <Heart
                          onClick={() => toggleFavourite(game.id)}
                          style={{ cursor: "pointer" }}
                          className="absolute top-2 right-2 w-6 h-6 text-gray-500 fill-current animate-pulse-slow cursor-pointer"
                        />
                      )}
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
                          <Trophy className="w-4 h-4 text-yellow-400" />
                          <span className="text-gray-300">{game.genres}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
