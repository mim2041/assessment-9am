import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { navigateToShop } from '../../utils/subdomain';
import Profile from './Profile';
import ConfirmDialog from '../common/ConfirmDialog';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/signin';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome, {user?.username}!</h2>
            <p className="text-gray-600 mb-6">
              Select one of your shops to access its dashboard:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {user?.shopNames?.map((shopName) => (
                <button
                  key={shopName}
                  onClick={() => navigateToShop(shopName)}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-800">{shopName}</h3>
                  <p className="text-sm text-gray-600 mt-1">Click to open shop dashboard</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {showProfile && (
        <Profile
          user={user}
          onClose={() => setShowProfile(false)}
          onLogout={() => {
            setShowProfile(false);
            setShowLogoutConfirm(true);
          }}
        />
      )}

      <ConfirmDialog
        isOpen={showLogoutConfirm}
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
        title="Logout Confirmation"
        message="Are you sure you want to logout?"
      />
    </div>
  );
};

export default Dashboard;
