import { Gamepad2 } from "lucide-react";
import { useState } from "react";
import UsernameInput, {
  type onStatusChangeProps,
} from "../components/UsernameInput";
import React from "react";

function Profile() {
  const [username, setUsername] = useState<string>("");

  const [usernameStatus, setusernameStatus] =
    useState<onStatusChangeProps>("idle");

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };

  const handleStatusChange = (status: onStatusChangeProps) => {
    setusernameStatus(status);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (usernameStatus === "available") {
      alert(username);
    }
    return;
  };

  return (
    <div className="min-h-screen transition-all duration-500 bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 max-w-2xl  py-16">
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

        {/* Create Profile Section */}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 transition-all duration-300">
            <label className="block text-sm font-semibold mb-3 text-gray-200">
              Choose Your Username
            </label>
            <UsernameInput
              onUsernameChange={handleUsernameChange}
              onStatusChange={handleStatusChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
