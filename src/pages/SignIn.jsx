import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useHotel();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.email, formData.password);
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-10 editorial-shadow">
        <div className="text-center mb-10">
          <Link to="/" className="font-serif text-2xl text-primary block mb-6">Gloria Hotel</Link>
          <h1 className="font-headline text-3xl text-primary mb-2">Welcome Back</h1>
          <p className="text-on-surface-variant font-body">Sign in to manage your reservations</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="font-label text-xs tracking-wider text-on-surface-variant uppercase">Email Address</label>
            <input
              type="email"
              required
              className="w-full bg-surface-container-high border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 transition-all font-body text-sm"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="font-label text-xs tracking-wider text-on-surface-variant uppercase">Password</label>
            <input
              type="password"
              required
              className="w-full bg-surface-container-high border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 transition-all font-body text-sm"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-outline-variant text-secondary focus:ring-secondary" />
              <span className="text-on-surface-variant">Remember me</span>
            </label>
            <a href="#" className="text-secondary hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-on-primary py-4 rounded-lg font-medium hover:bg-primary-container transition-colors shadow-lg shadow-primary/10"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-dashed border-slate-300 text-center">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Internal Portal Access</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => { login('admin@gloria.com', 'pass'); navigate('/admin'); }}
              className="text-[9px] bg-white border border-outline-variant/30 text-amber-700 font-bold px-2 py-1 rounded hover:bg-amber-50 uppercase"
            >
              Admin
            </button>
            <button
              onClick={() => { login('manager@gloria.com', 'pass'); navigate('/dashboard/manager'); }}
              className="text-[9px] bg-white border border-outline-variant/30 text-amber-700 font-bold px-2 py-1 rounded hover:bg-amber-50 uppercase"
            >
              Manager
            </button>
            <button
              onClick={() => { login('receptionist@gloria.com', 'pass'); navigate('/dashboard/receptionist'); }}
              className="text-[9px] bg-white border border-outline-variant/30 text-amber-700 font-bold px-2 py-1 rounded hover:bg-amber-50 uppercase"
            >
              Receptionist
            </button>
            <button
              onClick={() => { login('staff@gloria.com', 'pass'); navigate('/dashboard/staff'); }}
              className="text-[9px] bg-white border border-outline-variant/30 text-amber-700 font-bold px-2 py-1 rounded hover:bg-amber-50 uppercase"
            >
              Staff
            </button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-outline-variant/30 text-center">
          <p className="text-on-surface-variant text-sm">
            Don't have an account? <Link to="/signup" className="text-secondary font-semibold hover:underline">Join Membership</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
