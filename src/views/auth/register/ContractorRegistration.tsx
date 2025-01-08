import React, { useState } from 'react';
import { ArrowLeft, Building2, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import epgLogo from "../../../asset/epgLogo.png"

interface ContractorRegistrationProps {
  onBack: () => void;
}

const specialties = [
  'Plumbing',
  'Electrical',
  'HVAC',
  'Carpentry',
  'Painting',
  'Roofing',
  'General Construction',
  'Landscaping',
  'Masonry',
  'Interior Design'
];

export function ContractorRegistration({ onBack }: ContractorRegistrationProps) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Details
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Professional Information
    companyName: '',
    licenseNumber: '',
    specialty: '',
    yearsExperience: 0,
    portfolioUrl: '',
    
    // Contact Information
    phone: '',
    address: '',
    
    // Documents
    businessLicense: '',
    insuranceCertificate: '',
    
    // Terms
    termsAccepted: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
  
    const contractorData = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      companyName: formData.companyName,
      licenseNumber: formData.licenseNumber,
      specialty: formData.specialty,
      yearsOfExperience: formData.yearsExperience,
      portfolioLink: formData.portfolioUrl,
      phoneNumber: formData.phone,
      officeAddress: formData.address,
      businessLicenseUrl: formData.businessLicense,
      insuranceCertUrl: formData.insuranceCertificate,
      termsAccepted: formData.termsAccepted, // Ensure this is `true` or `false`
    };
  
    console.log('Request payload:', contractorData);
  
    try {
      const response = await axios.post(
        'https://epg-backend.onrender.com/api/contractors/register',
        JSON.stringify(contractorData), // Convert to JSON string
        {
          headers: {
            'Content-Type': 'application/json', // Ensure proper content type
          },
        }
      );
  
      if (response.status === 200) {
        // Assuming registration is successful, redirect to the login page
        navigate('/login');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
        <img src={epgLogo} className="h-14" />
          <div className="mt-6 flex items-center justify-center">
            <button onClick={onBack} className="mr-4 text-gray-500 hover:text-gray-700">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-3xl font-bold text-gray-900">Contractor Registration</h2>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Already registered?{' '}
            <Link to="/login" className="font-medium text-orange-600 hover:text-orange-500">
              Sign in to your account
            </Link>
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10">
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900">Basic Details</h3>
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900">Professional Information</h3>
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">License Number</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Specialty/Trade</label>
                  <select
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  >
                    <option value="">Select a specialty</option>
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                  <input
  type="number"
  required
  min="0"
  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
  value={formData.yearsExperience}
  onChange={(e) => setFormData({ ...formData, yearsExperience: Number(e.target.value) })}
/>

                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Portfolio/Website Link</label>
                  <input
                    type="url"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    placeholder="https://"
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Office Address</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Verification Documents */}
            <div>
              <h3 className="text-lg font-medium text-gray-900">Verification Documents</h3>
              <div className="mt-4 space-y-6">
                <div>
              <label className="block text-sm font-medium text-gray-700">Business License</label>
              <input
                type="url"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="https://"
                value={formData.businessLicense}
                onChange={(e) => setFormData({ ...formData, businessLicense: e.target.value })}
              />
            </div>
              <label className="block text-sm font-medium text-gray-700">Insurance Certificate</label>
              <input
                type="url"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="https://"
                value={formData.insuranceCertificate}
                onChange={(e) => setFormData({ ...formData, insuranceCertificate: e.target.value })}
              />
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-center">
              <input
                type="checkbox"
                required
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
              />
              <label className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <Link to="/terms" className="text-orange-600 hover:text-orange-500">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-orange-600 hover:text-orange-500">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}