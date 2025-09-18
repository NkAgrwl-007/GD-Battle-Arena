import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Zap, User, Settings, LogOut, Bell } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="glass sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-cyber rounded-2xl flex items-center justify-center animate-glow-rotate shadow-lg">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold neon-text">GD Battle Arena</h1>
            <p className="text-xs text-gray-400 hidden sm:block">Future of Group Discussions</p>
          </div>
        </div>
        
        {/* User Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-white/10 rounded-xl transition-all duration-300 group">
            <Bell className="w-6 h-6 text-gray-400 group-hover:text-white group-hover:animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
          </button>
          
          {/* User Profile */}
          <div className="flex items-center space-x-3 glass px-4 py-2 rounded-xl hover:bg-white/15 transition-all duration-300 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-2 border-gray-900"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-semibold block">{user?.username}</span>
              <span className="text-gray-400 text-xs">Level {user?.level}</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <button className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300 group tooltip" data-tooltip="Settings">
            <Settings className="w-6 h-6 text-gray-400 group-hover:text-white group-hover:rotate-90 transition-all duration-300" />
          </button>
          
          <button 
            onClick={logout}
            className="p-2 hover:bg-red-500/20 hover:border-red-500/50 border border-transparent rounded-xl transition-all duration-300 group tooltip"
            data-tooltip="Logout"
          >
            <LogOut className="w-6 h-6 text-gray-400 group-hover:text-red-400 transition-colors duration-300" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;