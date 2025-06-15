import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { 
  BookmarkIcon, 
  UserIcon, 
  InformationCircleIcon, 
  ChatBubbleLeftRightIcon,
  SunIcon,
  ArrowRightOnRectangleIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    email: '',
    newPassword: '',
    name: ''
  });
  
  // Contact form state
  const [contactData, setContactData] = useState({
    subject: '',
    message: ''
  });

  // Load user data on component mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        setProfileData(prev => ({
          ...prev,
          email: user.email || '',
          name: user.name || ''
        }));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
    // Clear messages when user starts typing
    setError('');
    setMessage('');
  };

  const handleContactChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      
      if (!user || !token) {
        setError('Authentication required. Please login again.');
        navigate('/login');
        return;
      }

      // Prepare update data - only include fields that have values
      const updateData = {};
      if (profileData.email && profileData.email !== user.email) {
        updateData.email = profileData.email;
      }
      if (profileData.newPassword && profileData.newPassword.trim()) {
        updateData.password = profileData.newPassword;
      }
      if (profileData.name && profileData.name !== user.name) {
        updateData.name = profileData.name;
      }

      if (Object.keys(updateData).length === 0) {
        setMessage('No changes to update');
        return;
      }

      const response = await axios.put(
        `http://localhost:3002/api/user/${user._id || user.id}`,
        updateData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Update localStorage with new user data
      const updatedUser = { ...user, ...updateData };
      if (updateData.password) {
        delete updatedUser.password; // Don't store password in localStorage
      }
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setMessage('Profile updated successfully!');
      setProfileData(prev => ({ ...prev, newPassword: '' })); // Clear password field
      
    } catch (error) {
      console.error('Profile update error:', error);
      setError(
        error.response?.data?.message || 
        'Failed to update profile. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // This could be extended to call a backend API for contact messages
      // For now, we'll just show a success message
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setMessage('Message sent successfully! We\'ll get back to you soon.');
      setContactData({ subject: '', message: '' });
      
    } catch (error) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    try {
      // Clear all user data from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Show success message briefly before redirect
      setMessage('Logged out successfully!');
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 1000);
      
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, still redirect to login
      navigate('/login');
    }
  };

  const menuItems = [
    { icon: BookmarkIcon, label: "Saved words", href: "/bookmarks" },
    { icon: InformationCircleIcon, label: "About us", href: "/about" },
  ];

  return (
    <>
      <div className="fixed md:top-0 bottom-0 md:left-0 md:h-screen w-full md:w-auto z-50">
        <Sidebar />
      </div>
      <div className="min-h-screen bg-[#141F23] p-4 md:p-8 lg:p-12 md:ml-64 relative overflow-hidden pb-24 md:pb-12">
        <div className="max-w-2xl mx-auto relative z-10">
          
          {/* Success/Error Messages */}
          {message && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {message}
            </div>
          )}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Profile Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#365148] rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                {profileData.name ? profileData.name.substring(0, 2).toUpperCase() : 'US'}
              </div>
              <div>
                <h2 className="text-white text-xl font-semibold">Edit Profile</h2>
                <p className="text-gray-400">Update your account details</p>
              </div>
            </div>

            {/* Edit Profile Form */}
            <form className="space-y-4 mb-8" onSubmit={handleProfileUpdate}>
              <div>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3.5 bg-[#293D46] rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
                  placeholder="Full Name"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3.5 bg-[#293D46] rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
                  placeholder="Email"
                />
              </div>
              
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={profileData.newPassword}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3.5 bg-[#293D46] rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
                  placeholder="New Password (leave blank to keep current)"
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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-lg text-black bg-[#4ADE80] hover:bg-[#3FCF76] transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Contract Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#365148] rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                <ChatBubbleLeftRightIcon className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-white text-xl font-semibold">Contact</h2>
                <p className="text-gray-400">Get in touch with us</p>
              </div>
            </div>

            <form className="space-y-4 mb-8" onSubmit={handleContactSubmit}>
              <div>
                <input
                  type="text"
                  name="subject"
                  value={contactData.subject}
                  onChange={handleContactChange}
                  required
                  className="w-full px-4 py-3.5 bg-[#293D46] rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
                  placeholder="Subject"
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  value={contactData.message}
                  onChange={handleContactChange}
                  required
                  className="w-full px-4 py-3.5 bg-[#293D46] rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-400 min-h-[120px] resize-none"
                  placeholder="Your message"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-lg text-black bg-[#4ADE80] hover:bg-[#3FCF76] transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Menu Items */}
          <div className="space-y-3">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="w-full flex items-center justify-between p-4 bg-[#293D46] rounded-xl hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-6 h-6 text-gray-400" />
                  <span className="text-white">{item.label}</span>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              </Link>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-full flex items-center justify-between p-4 bg-[#293D46] rounded-xl hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <SunIcon className="w-6 h-6 text-gray-400" />
                <span className="text-white">
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </span>
              </div>
            </button>

            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-4 bg-[#293D46] rounded-xl hover:bg-red-600/20 hover:border-red-500 transition-colors border border-transparent"
            >
              <div className="flex items-center gap-3">
                <ArrowRightOnRectangleIcon className="w-6 h-6 text-gray-400" />
                <span className="text-white">Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
