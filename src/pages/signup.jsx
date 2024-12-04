import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-green-400 mb-2">Sign Up</h1>
          <p className="text-gray-400">Enter Your Details To Create Your Account</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="text-gray-300 text-sm font-medium mb-1 block">Full Name</label>
            <input 
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-green-400 transition"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm font-medium mb-1 block">Email</label>
            <input 
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-green-400 transition"
              placeholder="your@email.com"
            />
          </div>

          <div className="relative">
            <label className="text-gray-300 text-sm font-medium mb-1 block">Password</label>
            <input 
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-green-400 transition"
              placeholder="••••••••"
            />
            <button 
              type="button"
              className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-200"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="relative">
            <label className="text-gray-300 text-sm font-medium mb-1 block">Confirm Password</label>
            <input 
              type={showConfirmPassword ? "text" : "password"}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-green-400 transition"
              placeholder="••••••••"
            />
            <button 
              type="button"
              className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-200"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-emerald-400 text-black font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition duration-300"
            >
              Create Account
            </button>

            <label className="text-sm text-gray-300 ">
              I agree to the{' '}
              <Link to="/terms" className="text-green-400 hover:text-green-300">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-green-400 hover:text-green-300">Privacy Policy</Link>
            </label>

            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-green-400 hover:text-green-300 font-medium">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup; 