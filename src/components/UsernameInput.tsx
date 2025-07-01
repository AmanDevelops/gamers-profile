import { Check, Loader2, User, X } from "lucide-react";
import { useEffect, useState } from "react";


export type onStatusChangeProps = "available" | "taken" | "checking" | "idle"

interface UsernameInputProps {
  onUsernameChange: (username: string) => void;
  onStatusChange: (status: onStatusChangeProps) => void;
}

function UsernameInput({ onUsernameChange, onStatusChange }: UsernameInputProps) {
  const [username, setUsername] = useState<string>("");

  const [usernameStatus, setusernameStatus] = useState<
    onStatusChangeProps
  >("idle");

  useEffect(() => {
    onUsernameChange(username);

    if (username.length < 3) {
      setusernameStatus("idle");
      return;
    }

    setusernameStatus("checking");
    onStatusChange('checking');

    const timer = setTimeout(() => {
      const checkUsername = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_ENDPOINT}${username}.json`
          );
          const data = await response.json();

          setusernameStatus(data === null ? "available" : "taken");
          onStatusChange(data === null ? "available" : "taken");
        } catch (error) {
          console.log(error);
        }
      };

      checkUsername();
    }, 800);

    return () => clearTimeout(timer);
  }, [username]);

  return (
    <>
      {" "}
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <User className={`w-5 h-5 text-gray-400`} />
        </div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className={`w-full pl-12 pr-12 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 ${
            usernameStatus === "available"
              ? "border-green-500"
              : usernameStatus === "taken"
              ? "border-red-500"
              : ""
          }`}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {usernameStatus === "checking" && (
            <Loader2 className="w-5 h-5 text-purple-500 animate-spin" />
          )}
          {usernameStatus === "available" && (
            <Check className="w-5 h-5 text-green-500" />
          )}
          {usernameStatus === "taken" && <X className="w-5 h-5 text-red-500" />}
        </div>
      </div>
      {username.length > 0 && username.length < 3 && (
        <p className="text-sm text-yellow-500 mt-2">
          Username must be at least 3 characters
        </p>
      )}
      {usernameStatus === "available" && (
        <p className="text-sm text-green-500 mt-2 animate-fade-in">
          ✓ Username is available!
        </p>
      )}
      {usernameStatus === "taken" && (
        <p className="text-sm text-red-500 mt-2 animate-fade-in">
          ✗ Username is already taken
        </p>
      )}
    </>
  );
}

export default UsernameInput;
