import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User, Zap } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-inner">
        {/* LEFT — LOGO */}
        <div
          className="header-brand"
          onClick={() => navigate('/dashboard')}
        >
          <div className="brand-icon">
            <Zap size={18} />
          </div>
          <span className="brand-text">GD Battle Arena</span>
        </div>

        {/* RIGHT — AUTH ACTIONS */}
        <div className="header-actions">
          {!isAuthenticated ? (
            <>
              <button
                className="btn btn-outline"
                onClick={() => navigate('/login')}
              >
                Login
              </button>

              <button
                className="btn btn-primary"
                onClick={() => navigate('/register')}
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="user-box">
              <div className="user-info">
                <User size={16} />
                <span>{user?.name || 'Player'}</span>
              </div>

              <button
                className="btn btn-ghost"
                onClick={handleLogout}
              >
                <LogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
