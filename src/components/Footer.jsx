import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin') || location.pathname.startsWith('/staff');

  if (isAdmin) return null;

  return (
    <footer className="bg-slate-950 dark:bg-black w-full py-12 px-8 border-t border-slate-800">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-screen-2xl mx-auto">
        <div className="mb-8 md:mb-0 text-center md:text-left">
          <div className="text-amber-500 font-serif text-lg mb-2">Gloria Hotel</div>
          <p className="font-serif text-stone-300 text-sm">Elevating the Kigali hospitality landscape.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mb-8 md:mb-0">
          <a className="text-stone-500 hover:text-white transition-colors font-serif text-sm" href="#">Privacy Policy</a>
          <a className="text-stone-500 hover:text-white transition-colors font-serif text-sm" href="#">Terms of Service</a>
          <a className="text-stone-500 hover:text-white transition-colors font-serif text-sm" href="#">Contact Us</a>
          <a className="text-stone-500 hover:text-white transition-colors font-serif text-sm" href="#">Press Kit</a>
        </div>
        <div className="text-stone-500 font-serif text-xs">
          © 2024 Hotel Gloria Kigali. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
