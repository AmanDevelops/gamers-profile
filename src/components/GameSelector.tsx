import { ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ApiGame {
  id: number;
  name: string;
  genre: string;
  image: string;
}

export interface SelectedGame {
  id: number;
  title: string;
  image: string;
  genres: string;
  playTime: string;
  favorite: boolean;
}

interface GameSelectorProps {
  onGamesSelected?: (games: SelectedGame[]) => void;
}

function GameSelector({ onGamesSelected }: GameSelectorProps) {
  const [gameSearch, setGameSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredGames, setFilteredGames] = useState<ApiGame[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGames, setSelectedGames] = useState<SelectedGame[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (gameSearch.trim().length > 2) {
      setIsLoading(true);
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const response = await fetch(
            `https://api.rawg.io/api/games?search=${gameSearch}&key=${import.meta.env.VITE_RAWG_API_KEY}&page_size=5`
          );
          const data = await response.json();
          setFilteredGames(
            data.results.map((game: any) => ({
              id: game.id,
              name: game.name,
              genre: game.genres?.length > 0 ? game.genres[0].name : "Unknown",
              image:
                game.background_image ||
                "https://via.placeholder.com/300x150?text=No+Image",
            }))
          );
        } catch (error) {
          console.error("Error fetching games:", error);
          setFilteredGames([]);
        } finally {
          setIsLoading(false);
        }
      }, 1000);
    } else {
      setFilteredGames([]);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [gameSearch]);

  useEffect(() => {
    if (onGamesSelected) {
      onGamesSelected(selectedGames);
    }
  }, [selectedGames]);

  const handleGameSelect = (game: ApiGame) => {
    const newGame: SelectedGame = {
      id: game.id,
      title: game.name,
      image: game.image,
      genres: game.genre,
      playTime: "Finished",
      favorite: false,
    };

    setSelectedGames((prev) => [...prev, newGame]);
    setGameSearch("");
    setIsDropdownOpen(false);
  };

  return (
    <div className="pt-6">
      <label className="block text-sm font-semibold mb-3 text-gray-200">
        Select Your Favorite Games
      </label>
      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={gameSearch}
            onChange={(e) => setGameSearch(e.target.value)}
            onFocus={() => setIsDropdownOpen(true)}
            placeholder="Search for games..."
            className="w-full pl-12 pr-12 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none 
             bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500
            "
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <ChevronDown className="w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}" />
          </div>
        </div>

        {isDropdownOpen && (
          <div
            className="absolute z-50 w-full mt-2 rounded-xl border bg-gray-700 border-gray-600
                 shadow-xl max-h-60 overflow-y-auto animate-slide-down"
          >
            {isLoading ? (
              <div className="px-4 py-3 text-center text-gray-400">
                Loading...
              </div>
            ) : filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <button
                  key={game.id}
                  type="button"
                  onClick={() => handleGameSelect(game)}
                  className="w-full px-4 py-3 text-left hover:bg-purple-500/10 transition-colors border-b last:border-b-0 border-gray-600 hover:text-purple-300"
                >
                  <div className="font-medium">{game.name}</div>
                  <div className="text-sm text-gray-400">{game.genre}</div>
                </button>
              ))
            ) : gameSearch.trim().length > 2 ? (
              <div className="px-4 py-3 text-center text-gray-400">
                No games found
              </div>
            ) : (
              <div className="px-4 py-3 text-center text-gray-400">
                Type at least 3 characters to search
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

export default GameSelector;
