import React, { useState } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import epgLogo from "../../../asset/epgLogo.png";
import { registerContractor } from '../../../services/contractor/contractorData/contractorRegister';
import { Task } from '../../../components/admin/tasks/AdminTasks';

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

export function ContractorRegistration({ onBack }: { onBack: () => void }) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    licenseNumber: '',
    specialty: '',
    yearsExperience: 0,
    portfolioUrl: '',
    phone: '',
    address: '',
    businessLicenseFile: null as File | null,
    insuranceCertificateFile: null as File | null,
    termsAccepted: false
  });
  
  const addTask1 = async () => {
    const task: Task = {
      id: Date.now().toString(), // Temporary ID
      header: `Assign new Project to ${formData.fullName}`,
      status: 'todo',
      assignee: "James Patnongon",
      description: `Assign a Task to ${formData.fullName} in under 24h`,
      timeSpent: 0
    };
    const response = await fetch('https://epg-backend.onrender.com/api/admin/adminTasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
  }

  const addTask2 = async () => {
    const task: Task = {
      id: Date.now().toString(), // Temporary ID
      header: `Assign new Project to ${formData.fullName}`,
      status: 'todo',
      assignee: "James Patnongon",
      description: `Assign a Task to ${formData.fullName} in under 14 days`,
      timeSpent: 0
    };
    const response = await fetch('https://epg-backend.onrender.com/api/admin/adminTasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
  }

  const addTask3 = async () => {
    const task: Task = {
      id: Date.now().toString(), // Temporary ID
      header: `Assign new Project to ${formData.fullName}`,
      status: 'todo',
      assignee: "James Patnongon",
      description: `Assign a Task to ${formData.fullName} in under 14 days`,
      timeSpent: 0
    };
    const response = await fetch('https://epg-backend.onrender.com/api/admin/adminTasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    // Password match check
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
  
    // Terms acceptance check
    if (!formData.termsAccepted) {
      setError('You must accept the terms and conditions');
      setLoading(false);
      return;
    }
  
    // Validate file types (only if files are provided)
    const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
    if (
      formData.businessLicenseFile &&
      !allowedExtensions.includes(formData.businessLicenseFile.name.split('.').pop()?.toLowerCase() || '')
    ) {
      setError('Invalid file type for business license. Accepted formats: PDF, JPG, PNG.');
      setLoading(false);
      return;
    }
    if (
      formData.insuranceCertificateFile &&
      !allowedExtensions.includes(formData.insuranceCertificateFile.name.split('.').pop()?.toLowerCase() || '')
    ) {
      setError('Invalid file type for insurance certificate. Accepted formats: PDF, JPG, PNG.');
      setLoading(false);
      return;
    }
  
    // Prepare form payload
    const formPayload = new FormData();
    formPayload.append('fullName', formData.fullName);
    formPayload.append('email', formData.email);
    formPayload.append('password', formData.password);
    formPayload.append('companyName', formData.companyName);
    formPayload.append('licenseNumber', formData.licenseNumber || ''); // Optional field
    formPayload.append('specialty', formData.specialty);
    formPayload.append('yearsOfExperience', String(formData.yearsExperience));
    formPayload.append('portfolioLink', formData.portfolioUrl || ''); // Optional field
    formPayload.append('phoneNumber', formData.phone);
    formPayload.append('officeAddress', formData.address);
    formPayload.append('termsAccepted', String(formData.termsAccepted));
  
    // Append files only if they exist
    if (formData.businessLicenseFile) {
      formPayload.append('businessLicense', formData.businessLicenseFile);
    }
    if (formData.insuranceCertificateFile) {
      formPayload.append('insuranceCertificate', formData.insuranceCertificateFile);
    }
  
    try {
      const response = await registerContractor(formPayload);
      console.log(response);
      if (response.status !== 400 && response.status !== 404) {
        addTask1();
        addTask2();
        addTask3();
        navigate('/login');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <img src={epgLogo} className="h-14" alt="EPG Logo" />
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
                    onChange={(e) => handleChange('fullName', e.target.value)}
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
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
                    onChange={(e) => handleChange('companyName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">License Number</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    value={formData.licenseNumber}
                    onChange={(e) => handleChange('licenseNumber', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Specialty/Trade</label>
                  <select
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    value={formData.specialty}
                    onChange={(e) => handleChange('specialty', e.target.value)}
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
                    onChange={(e) => handleChange('yearsExperience', Number(e.target.value))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Portfolio URL</label>
                  <input
                    type="url"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    value={formData.portfolioUrl}
                    onChange={(e) => handleChange('portfolioUrl', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Office Address</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Documents */}
            <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">Business License</label>
  <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-orange-500">
    <div className="space-y-1 text-center">
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <div className="flex text-sm text-gray-600">
        <label className="relative cursor-pointer rounded-md font-medium text-orange-600 hover:text-orange-500">
          <span>Upload business license</span>
          <input
            type="file" 
            className="sr-only"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleChange('businessLicenseFile', e.target.files ? e.target.files[0] : null)}
          />
        </label>
      </div>
      <p className="text-xs text-gray-500">PDF, JPG, PNG</p>
      {formData.businessLicenseFile && (
        <p className="text-sm text-gray-700 mt-2">
          Selected file: {formData.businessLicenseFile.name}
        </p>
      )}
    </div>
  </div>
</div>

<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Certificate</label>
  <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-orange-500">
    <div className="space-y-1 text-center">
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <div className="flex text-sm text-gray-600">
        <label className="relative cursor-pointer rounded-md font-medium text-orange-600 hover:text-orange-500">
          <span>Upload insurance certificate</span>
          <input
            type="file"
            className="sr-only"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleChange('insuranceCertificateFile', e.target.files ? e.target.files[0] : null)}
          />
        </label>
      </div>
      <p className="text-xs text-gray-500">PDF, JPG, PNG</p>
      {formData.insuranceCertificateFile && (
        <p className="text-sm text-gray-700 mt-2">
          Selected file: {formData.insuranceCertificateFile.name}
        </p>
      )}
    </div>
  </div>
</div>


            {/* Terms Acceptance */}
            <div className="mt-4">
              <label className="inline-flex items-center text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  required
                  className="h-4 w-4 text-orange-500 border-gray-300 rounded"
                  checked={formData.termsAccepted}
                  onChange={(e) => handleChange('termsAccepted', e.target.checked)}
                />
                <span className="ml-2">I accept the <a href="#" className="text-orange-600">Terms and Conditions</a></span>
              </label>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-lg py-3 px-4 border border-transparent text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register Contractor'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
