import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <header className="bg-indigo-950 shadow-[0_12px_30px_rgba(255,255,255,0.4)] py-6 px-6 relative z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between md:justify-center space-y-4 md:space-y-0 md:space-x-8">
        
        <Link to="/" className="text-2xl font-bold text-white">
          MySite
        </Link>

        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/roadmaps" className="text-white hover:text-indigo-600 transition font-medium">
            Roadmaps
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-white font-medium">Olá, {user.name}</span>
              <Link
                to="/criar-mark"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition font-medium"
              >
                Criar Mark
              </Link>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition font-medium text-center"
            >
              Login
            </Link>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-white text-2xl absolute top-6 right-6"
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 bg-indigo-950 text-white flex flex-col items-center justify-center space-y-6 z-50">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-4xl font-bold hover:text-indigo-400"
          >
            ×
          </button>
          <Link
            to="/roadmaps"
            className="text-lg hover:text-indigo-600 transition font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Roadmaps
          </Link>
          {user ? (
            <>
              <span className="text-lg font-medium">Olá, {user.name}</span>
              <Link
                to="/criar-mark"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-500 transition font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Criar Mark
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-500 transition font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-500 transition font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
