import React, { useEffect, useState, useRef } from 'react'
import { BellIcon } from "@heroicons/react/24/outline";
import Image2 from '../assets/home2/Ellipse 11.png';

const Header = () => {
  const [userName, setUserName] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const bellRef = useRef(null);

  // Get user ID from localStorage (assuming it's stored there during login)
  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.id || user?._id;
  };

  // Fetch current user from database
  const fetchCurrentUser = async () => {
    try {
      const userId = getUserId();
      if (!userId) return;

      const response = await fetch(`http://44.246.135.176:3002/api/user/current?userId=${userId}`);
      const data = await response.json();
      
      if (data.user) {
        setUserName(data.user.name);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      // Fallback to localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        setUserName(user.name);
      }
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const userId = getUserId();
      if (!userId) return;

      const response = await fetch(`http://44.246.135.176:3002/api/notifications/user/${userId}`);
      const data = await response.json();
      
      if (data.notifications) {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Create some sample notifications for demo
      setNotifications([
        {
          _id: '1',
          title: 'Welcome!',
          message: 'Welcome to the Sign Language Learning Platform',
          type: 'info',
          isRead: false,
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          title: 'New Lesson Available',
          message: 'Check out the new advanced sign language lesson',
          type: 'success',
          isRead: false,
          createdAt: new Date(Date.now() - 86400000).toISOString()
        }
      ]);
      setUnreadCount(2);
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await fetch(`http://44.246.135.176:3002/api/notifications/${notificationId}/read`, {
        method: 'PUT'
      });
      
      setNotifications(prev => 
        prev.map(notif => 
          notif._id === notificationId 
            ? { ...notif, isRead: true }
            : notif
        )
      );
      
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      const userId = getUserId();
      if (!userId) return;

      await fetch(`http://44.246.135.176:3002/api/notifications/user/${userId}/read-all`, {
        method: 'PUT'
      });
      
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, isRead: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          bellRef.current && !bellRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    fetchCurrentUser();
    fetchNotifications();
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const notificationDate = new Date(dateString);
    const diffInHours = Math.floor((now - notificationDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="max-w-6xl mx-auto mb-8 bg-[#141F23]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={Image2} 
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-lg">Welcome back, {userName || 'Guest'}</span>
        </div>
        
        <div className="relative">
          <button
            ref={bellRef}
            onClick={toggleDropdown}
            className="relative p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <BellIcon className="w-8 h-8 text-gray-400 hover:text-white" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {showDropdown && (
            <div 
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="p-4 text-center text-gray-500">
                    Loading notifications...
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No notifications yet
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification._id}
                      className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                        !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                      onClick={() => !notification.isRead && markAsRead(notification._id)}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg">
                          {getNotificationIcon(notification.type)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {notification.title}
                            </h4>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {formatTimeAgo(notification.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {notifications.length > 0 && (
                <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                  <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400">
                    View all notifications
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
