import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import { supabase } from '../lib/supabase';

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, authError, setAuthError } = useHotel();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (authError) {
      setError(authError);
      setAuthError(null);
    }
  }, [authError]);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/dashboard";

  const [showResend, setShowResend] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShowResend(false);
    setLoading(true);
    const { data, error } = await signIn(formData.email, formData.password);
    setLoading(false);
    if (error) {
      setError(error.message);
      if (error.message.toLowerCase().includes('confirm') || error.message.toLowerCase().includes('verified')) {
        setShowResend(true);
      }
    } else {
      navigate(from, { replace: true });
    }
  };

  const handleResendEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: formData.email,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setError('Confirmation email resent! Please check your inbox.');
      setShowResend(false);
    }
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
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg text-center font-medium">
              {error}
              {showResend && (
                <button
                  type="button"
                  onClick={handleResendEmail}
                  className="block w-full mt-2 text-secondary underline hover:text-amber-700"
                >
                  Resend confirmation email
                </button>
              )}
            </div>
          )}
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
            disabled={loading}
            className="w-full bg-primary text-on-primary py-4 rounded-lg font-medium hover:bg-primary-container transition-colors shadow-lg shadow-primary/10 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>


        <div className="mt-8 pt-8 border-t border-outline-variant/30 text-center">
          <p className="text-on-surface-variant text-sm mb-6">
            Don't have an account? <Link to="/signup" className="text-secondary font-semibold hover:underline">Join Membership</Link>
          </p>

          <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/20">
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-3 font-semibold">Internal Testing Access</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: 'Admin', email: 'admin@gloria.com' },
                { label: 'Manager', email: 'manager@gloria.com' },
                { label: 'Receptionist', email: 'reception@gloria.com' },
                { label: 'Staff', email: 'staff@gloria.com' },
                { label: 'Guest', email: 'guest@gloria.com' }
              ].map(role => (
                <button
                  key={role.label}
                  type="button"
                  onClick={async () => {
                    setFormData({ email: role.email, password: 'password123' });
                    setError('');
                    setLoading(true);
                    const { error } = await signIn(role.email, 'password123');
                    setLoading(false);
                    if (error) setError(error.message);
                    else navigate(from, { replace: true });
                  }}
                  className="px-3 py-1.5 bg-white border border-outline-variant/30 rounded-md text-[11px] font-medium hover:border-secondary transition-colors"
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
