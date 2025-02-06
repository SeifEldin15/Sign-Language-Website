import { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <div className="min-h-screen bg-[#141F23] flex items-center justify-center px-4 h-screen">
      <div className="max-w-md w-full space-y-6 p-6 bg-[#293D46] rounded-3xl">
        <div>
          <h2 className="text-[28px] font-bold text-white">
            Sign Up
          </h2>
          <p className="mt-2 text-gray-300 text-sm">
            Enter Your Details To Create Your Account
          </p>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                required
                className="w-full px-4 py-3.5 bg-[#141F23] rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
                placeholder="Email"
              />
            </div>
            
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-4 py-3.5 bg-[#141F23] rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  )}
                </svg>
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                className="w-full px-4 py-3.5 bg-[#141F23] rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
                placeholder="Confirm Password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showConfirmPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              required
              className="mt-1 w-4 h-4 rounded border-gray-300 text-[#4ADE80] focus:ring-[#4ADE80]"
            />
            <label className="block text-xs text-gray-300">
              I'm agree to The{' '}
              <Link to="/terms" className="text-[#4ADE80] hover:text-[#3FCF76]">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-[#4ADE80] hover:text-[#3FCF76]">
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 mt-2 rounded-lg text-black bg-[#4ADE80] hover:bg-[#3FCF76] transition-colors text-sm font-medium"
          >
            create account
          </button>
        </form>

        <p className="text-center text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-green-400 hover:text-green-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
