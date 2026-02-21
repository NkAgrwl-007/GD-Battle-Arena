import React from "react";
import { Users, Globe, Lock, ArrowRight } from "lucide-react";

const RoomList = () => {
  const rooms = [
    {
      id: 1,
      name: "Beginner Arena",
      players: 4,
      maxPlayers: 6,
      type: "public",
      level: "Beginner",
    },
    {
      id: 2,
      name: "Pro GD Room",
      players: 6,
      maxPlayers: 8,
      type: "public",
      level: "Expert",
    },
    {
      id: 3,
      name: "Friends Practice",
      players: 2,
      maxPlayers: 5,
      type: "private",
      level: "Intermediate",
    },
  ];

  return (
    <div className="page">
      <div className="container">
        <div className="section">
          <h1 className="heading-section mb-8">Available Rooms</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div key={room.id} className="card hover:scale-105 transition">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="heading-card">{room.name}</h3>

                  {room.type === "public" ? (
                    <Globe className="w-5 h-5 text-cyan-400" />
                  ) : (
                    <Lock className="w-5 h-5 text-pink-400" />
                  )}
                </div>

                <div className="text-tertiary mb-4">
                  Level: <span className="text-cyan">{room.level}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-secondary mb-6">
                  <Users className="w-4 h-4" />
                  {room.players}/{room.maxPlayers} players
                </div>

                <button className="btn btn-primary w-full flex items-center justify-center gap-2">
                  Join Room
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomList;
