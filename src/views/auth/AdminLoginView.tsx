import React, { useState } from 'react';
import { Shield, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';
import { Link, useNavigate } from 'react-router-dom';
import epgLogo from "../../asset/epgLogo.png";
import { adminLogin } from '../../services/admin/adminInfo/adminSettings';

export function AdminLoginView() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await adminLogin(formData.email, formData.password); 

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        login(user.email, user.role);
        navigate('/admin');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


    return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex flex-col items-center">
          <div className="p-4">
          <Link
            to="/login"
            className="font-medium text-orange-600 hover:text-orange-500"
          >
                      <img src={epgLogo} className="h-14" alt="EPG Logo" />
          </Link>
          </div>
          <div className="mt-6 flex items-center justify-center space-x-2">
            <Shield className="h-5 w-5 text-orange-600" />
            <h2 className="text-center text-2xl font-bold text-gray-900">
              Admin Portal
            </h2>
          </div>
          <p className="mt-2 text-center text-sm text-gray-600">
            Secure access for administrative users only
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-4 flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Admin Email
              </label>
              <input
                type="email"
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in to Admin Portal'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
