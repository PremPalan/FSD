import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, BookOpen, ClipboardList, User, LogOut } from 'lucide-react';
import AuthContext from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-700 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold flex items-center">
            <BookOpen className="mr-2" size={24} />
            <span>IPD Portal</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-indigo-200 transition">
                  Dashboard
                </Link>

                {user.role === 'student' && (
                  <Link to="/teams" className="hover:text-indigo-200 transition">
                    Teams
                  </Link>
                )}

                {['faculty', 'reviewer'].includes(user.role) && (
                  <Link to="/evaluations" className="hover:text-indigo-200 transition">
                    Evaluations
                  </Link>
                )}

                <div className="relative group">
                  <button className="flex items-center hover:text-indigo-200 transition">
                    <User className="mr-1" size={18} />
                    <span>{user.name.split(' ')[0]}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-100 transition"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-indigo-100 transition"
                    >
                      <div className="flex items-center">
                        <LogOut className="mr-2" size={16} />
                        <span>Logout</span>
                      </div>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-indigo-200 transition">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-100 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;