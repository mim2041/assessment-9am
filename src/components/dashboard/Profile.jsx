import React from 'react';
import { navigateToShop } from '../../utils/subdomain';

const Profile = ({ user, onClose, onLogout }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end pt-16 z-50">
      <div className="bg-white rounded-l-lg shadow-xl w-80 h-full flex flex-col">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{user?.username}</h3>
              <p className="text-sm text-gray-600">Shop Owner</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h4 className="font-semibold mb-3">Your Shops</h4>
          <div className="space-y-2">
            {user?.shopNames?.map((shopName) => (
              <button
                key={shopName}
                onClick={() => navigateToShop(shopName)}
                className="w-full text-left p-3 rounded hover:bg-gray-100 transition-colors"
              >
                <span className="text-blue-600">{shopName}</span>
                <span className="text-gray-500 text-sm block">Click to visit</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 border-t mt-auto">
          <button
            onClick={onLogout}
            className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
