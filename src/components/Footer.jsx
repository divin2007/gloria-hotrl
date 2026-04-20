import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-950 dark:bg-black w-full py-12 px-8 border-t border-slate-800">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-screen-2xl mx-auto">
        <div className="mb-8 md:mb-0 text-center md:text-left">
          <div className="text-amber-500 font-serif text-lg mb-2">Gloria Hotel</div>
          <p className="font-serif text-stone-300 text-sm">Elevating the Kigali hospitality landscape.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mb-8 md:mb-0">
          <Link className="text-stone-500 hover:text-white transition-colors font-serif text-sm" to="/privacy">Privacy Policy</Link>
          <Link className="text-stone-500 hover:text-white transition-colors font-serif text-sm" to="/terms">Terms of Service</Link>
          <Link className="text-stone-500 hover:text-white transition-colors font-serif text-sm" to="/contact">Contact Us</Link>
          <Link className="text-stone-500 hover:text-white transition-colors font-serif text-sm" to="/press">Press Kit</Link>
          <Link className="text-amber-600/50 hover:text-amber-600 transition-colors font-serif text-sm border border-amber-600/20 px-2 rounded" to="/signin">Staff Login</Link>
        </div>
        <div className="text-stone-500 font-serif text-xs flex flex-col items-center md:items-end gap-1">
          <span>© 2024 Hotel Gloria Kigali. All rights reserved.</span>
          <span className="text-[8px] opacity-30 uppercase tracking-widest">Build v1.1.2 • Dynamic Auth Ready</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
