import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useHotel();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.email, formData.password);
    navigate('/dashboard/guest');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-8 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-10 editorial-shadow">
        <div className="text-center mb-10">
          <Link to="/" className="font-serif text-2xl text-primary block mb-6">Gloria Hotel</Link>
          <h1 className="font-headline text-3xl text-primary mb-2">Join Membership</h1>
          <p className="text-on-surface-variant font-body">Experience the pinnacle of Kigali hospitality.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="font-label text-xs tracking-wider text-on-surface-variant uppercase">Full Name</label>
            <input
              type="text"
              required
              className="w-full bg-surface-container-high border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 transition-all font-body text-sm"
              placeholder="Michael Henderson"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>
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

          <button
            type="submit"
            className="w-full bg-primary text-on-primary py-4 rounded-lg font-medium hover:bg-primary-container transition-colors shadow-lg shadow-primary/10"
          >
            Create Account
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
            Already a member? <Link to="/signin" className="text-secondary font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
