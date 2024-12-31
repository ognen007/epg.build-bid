import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FormSection } from './FormSection';
import { FormInput } from './FormInput';

export function ClientRegistration() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    phone: '',
    address: '',
    termsAccepted: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.termsAccepted) {
      setError('Please accept the terms of service');
      return;
    }

    // const { user, error: registrationError } = await registerUser({
    //   email: formData.email,
    //   password: formData.password,
    //   userType: 'client',
    //   fullName: formData.fullName,
    //   companyName: formData.companyName || undefined,
    //   phone: formData.phone,
    //   address: formData.address,
    // });

  //   if (registrationError) {
  //     setError(registrationError.message);
  //     return;
  //   }

  //   if (user) {
  //     navigate('/client');
  //   }
  // };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <button
          onClick={() => navigate('/register')}
          className="mr-4 p-2 -ml-2 text-gray-400 hover:text-gray-500"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h3 className="text-lg font-medium text-gray-900">
          Register as a Client
        </h3>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormSection title="Basic Details">
          <div className="space-y-4">
            <FormInput
              label="Full Name"
              type="text"
              required
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />

            <FormInput
              label="Email Address"
              type="email"
              required
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormInput
                label="Password"
                type="password"
                required
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <FormInput
                label="Confirm Password"
                type="password"
                required
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>
          </div>
        </FormSection>

        <FormSection title="Company Information">
          <div className="space-y-4">
            <FormInput
              label="Company Name"
              type="text"
              placeholder="Enter your company name (optional)"
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
            />

            <FormInput
              label="Phone Number"
              type="tel"
              required
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <FormInput
              label="Address"
              type="text"
              required
              placeholder="Enter your address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>
        </FormSection>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            required
            className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
            checked={formData.termsAccepted}
            onChange={(e) =>
              setFormData({ ...formData, termsAccepted: e.target.checked })
            }
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
            I agree to the{' '}
            <a href="/terms" className="text-orange-600 hover:text-orange-500">
              Terms of Service
            </a>
          </label>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
