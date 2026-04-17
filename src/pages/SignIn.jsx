import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    if (formData.email.includes('admin')) {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-8 flex flex-col items-center justify-center bg-background">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-10 editorial-shadow">
        <div className="text-center mb-10">
          <h1 className="font-headline text-3xl text-primary mb-2">Welcome Back</h1>
          <p className="text-on-surface-variant font-body">Sign in to manage your reservations</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="font-label text-xs tracking-wider text-on-surface-variant uppercase">Email Address</label>
            <input
              type="email"
              required
              className="w-full bg-surface-container-high border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 transition-all font-body"
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
              className="w-full bg-surface-container-high border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 transition-all font-body"
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
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Staff Access</p>
          <button
            onClick={() => navigate('/admin')}
            className="text-xs text-amber-700 font-semibold hover:text-amber-800 underline"
          >
            Enter Management Dashboard Directly
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-outline-variant/30 text-center">
          <p className="text-on-surface-variant text-sm">
            Don't have an account? <a href="#" className="text-secondary font-semibold hover:underline">Join Membership</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
