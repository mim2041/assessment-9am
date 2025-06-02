import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SignupForm = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    shopNames: ['', '', '', ''],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleShopNameChange = (index, value) => {
    const newShopNames = [...formData.shopNames];
    newShopNames[index] = value;
    setFormData((prev) => ({ ...prev, shopNames: newShopNames }));
    setErrors((prev) => ({ ...prev, shopNames: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    } else if (!/(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one special character';
    }

    const filledShopNames = formData.shopNames.filter((name) => name.trim());
    if (filledShopNames.length < 3) {
      newErrors.shopNames = 'You must provide at least 3 shop names';
    } else {
      filledShopNames.forEach((name, index) => {
        if (!/^[a-z0-9-]+$/.test(name.toLowerCase())) {
          newErrors[`shopName${index}`] = 'Shop name can only contain lowercase letters, numbers, and hyphens';
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const filledShopNames = formData.shopNames
        .filter((name) => name.trim())
        .map((name) => name.toLowerCase().trim());

      const result = await signup({
        username: formData.username,
        password: formData.password,
        shopNames: filledShopNames,
      });

      if (result.success) {
        navigate('/signin', {
          state: { message: 'Account created successfully! Please sign in.' },
        });
      } else if (result.details?.takenNames) {
        setErrors({ shopNames: `These shop names are already taken: ${result.details.takenNames.join(', ')}` });
      } else if (result.details?.errors) {
        const fieldErrors = {};
        result.details.errors.forEach((err) => {
          if (err.path) fieldErrors[err.path] = err.msg;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ general: result.error });
      }
    } catch (error) {
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{errors.general}</p>
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
              {errors.username && <p className="text-sm text-red-600">{errors.username}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
              {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
            </div>

            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Shop Name {index + 1}
                </label>
                <input
                  type="text"
                  value={formData.shopNames[index]}
                  onChange={(e) => handleShopNameChange(index, e.target.value)}
                  className="w-full border px-3 py-2 rounded-md"
                />
                {errors[`shopName${index}`] && (
                  <p className="text-sm text-red-600">{errors[`shopName${index}`]}</p>
                )}
              </div>
            ))}

            {errors.shopNames && <p className="text-sm text-red-600">{errors.shopNames}</p>}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </div>

          <div className="text-sm text-center">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
