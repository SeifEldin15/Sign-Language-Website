import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-green-400 mb-2">Login</h1>
          <p className="text-gray-400">Welcome back! Please enter your details</p>
        </div>

        <form className="space-y-6">
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

          <div className="flex justify-between items-center">
            <label className="flex items-center text-sm text-gray-300">
              <input type="checkbox" className="mr-2 rounded border-gray-600 text-green-400 focus:ring-green-400" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-sm text-green-400 hover:text-green-300">
              Forgot password?
            </Link>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-emerald-400 text-black font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition duration-300"
            >
              Sign In
            </button>

            <p className="text-gray-400 text-center">
              Don't have an account?{' '}
              <Link to="/signup" className="text-green-400 hover:text-green-300 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 