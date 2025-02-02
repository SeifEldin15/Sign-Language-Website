import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E1E1E] via-[#232323] to-[#282828] flex items-center justify-center px-4 h-screen">
      <div className="max-w-md w-full space-y-6 p-6 bg-[#1E1E1E] rounded-3xl">
        <div>
          <h2 className="text-[28px] font-bold bg-gradient-to-r from-green-300 to-green-500 inline-block text-transparent bg-clip-text">
            Login
          </h2>
          <p className="mt-2 text-[#8F8F8F] text-sm">
            Enter Your Details To Create Your Account
          </p>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                required
                className="w-full px-4 py-3.5 bg-[#2C2C2C] rounded-lg text-white placeholder-[#8F8F8F] text-sm focus:outline-none"
                placeholder="Email"
              />
            </div>
            
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-4 py-3.5 bg-[#2C2C2C] rounded-lg text-white placeholder-[#8F8F8F] text-sm focus:outline-none"
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg className="w-5 h-5 text-[#8F8F8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-xs text-[#4ADE80] hover:text-[#3FCF76]">
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 mt-2 rounded-lg text-black bg-[#4ADE80] hover:bg-[#3FCF76] transition-colors text-sm font-medium"
          >
            create account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
