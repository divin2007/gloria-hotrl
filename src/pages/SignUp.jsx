import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import { supabase } from '../lib/supabase';

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, signIn } = useHotel();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data, error: signUpError } = await signUp(formData.email, formData.password, formData.fullName);

      if (signUpError) {
        // If the trigger failed, it's often due to missing database setup (trigger/function issues)
        if (signUpError.message.includes('Database error saving new user') || signUpError.status === 500) {
          setError('Database configuration error. Please ensure you have run the supabase_setup.sql script in your Supabase SQL Editor.');
        } else {
          setError(signUpError.message);
        }
      } else if (data?.user && !data?.session) {
        setError('Account created! Please check your email to confirm your account.');
      } else if (data?.user) {
        navigate('/dashboard/guest');
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('An unexpected error occurred. Please try again.');
    }
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
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg text-center font-medium">
              {error}
            </div>
          )}
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
            disabled={loading}
            className="w-full bg-primary text-on-primary py-4 rounded-lg font-medium hover:bg-primary-container transition-colors shadow-lg shadow-primary/10 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>


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
