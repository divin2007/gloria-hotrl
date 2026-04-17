import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Rooms', path: '/rooms' },
    { name: 'Dining', path: '/dining' },
    { name: 'Events', path: '/events' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="bg-stone-50/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm shadow-slate-900/5 sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto">
        <Link to="/" className="font-serif text-2xl font-semibold text-slate-900 dark:text-slate-50">Gloria Hotel</Link>
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`${
                location.pathname === link.path
                  ? 'text-amber-700 border-b-2 border-amber-700'
                  : 'text-slate-600 dark:text-slate-400'
              } pb-1 font-sans tracking-wide hover:text-amber-600 transition-colors duration-300`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/admin" className="hidden lg:block text-slate-500 font-sans text-xs uppercase tracking-widest border border-slate-200 px-3 py-1 rounded hover:bg-slate-50 transition-colors">Management</Link>
          <Link to="/signin" className="text-slate-600 dark:text-slate-400 font-sans text-sm tracking-wide hover:text-amber-600 transition-colors duration-300">Sign In</Link>
          <button
            onClick={() => navigate('/rooms')}
            className="bg-primary-container text-on-primary py-2.5 px-6 rounded-lg text-sm font-medium scale-95 duration-150 ease-in-out hover:bg-primary transition-all"
          >
            Book Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
