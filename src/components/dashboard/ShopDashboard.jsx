import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/auth.service';
import { getSubdomain, navigateToMain } from '../../utils/subdomain';
import LoadingSpinner from '../common/LoadingSpinner';

const ShopDashboard = () => {
  const { user, checkAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [shopData, setShopData] = useState(null);
  const [error, setError] = useState(null);
  const subdomain = getSubdomain();

  useEffect(() => {
    validateAndLoadShop();
  }, [subdomain]);

  const validateAndLoadShop = async () => {
    try {
      setLoading(true);

      if (!subdomain) {
        navigateToMain();
        return;
      }

      if (!user) {
        await checkAuth();
      }

      const data = await authService.validateShopAccess(subdomain);
      setShopData(data);
    } catch (error) {
      console.error('Shop validation error:', error);
      if (error.response?.status === 401) {
        window.location.href = '/signin';
      } else if (error.response?.status === 403) {
        setError('You do not have access to this shop');
      } else {
        setError('Failed to load shop data');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Verifying shop access...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={navigateToMain}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Go to Main Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold capitalize">{subdomain} Shop</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Owner: {shopData?.owner}</span>
              <button
                onClick={navigateToMain}
                className="px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                Back to Main
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              This is {subdomain} shop
            </h2>
            <p className="text-gray-600 text-lg">
              {shopData?.message}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShopDashboard;
