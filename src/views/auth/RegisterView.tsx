import React, { useState } from 'react';
import { Building2, Briefcase, UserCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ClientRegistration } from './register/ClientRegistration';
import { ContractorRegistration } from './register/ContractorRegistration';
import epgLogo from "../../asset/epgLogo.png"

export function RegisterView() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'client' | 'contractor' | null>(null);

  const handleUserTypeSelect = (type: 'client' | 'contractor') => {
    setUserType(type);
    setStep(2);
  };

  if (step === 2) {
    return userType === 'client' ? (
      <ClientRegistration onBack={() => setStep(1)} />
    ) : (
      <ContractorRegistration onBack={() => setStep(1)} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
        <img src={epgLogo} className="h-16" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already registered?{' '}
          <Link to="/login" className="font-medium text-orange-600 hover:text-orange-500">
            Sign in to your account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10">
          <div className="space-y-4">
            <button
              onClick={() => handleUserTypeSelect('client')}
              className="w-full flex items-center p-4 border border-gray-300 rounded-lg hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
            >
              <UserCircle className="h-6 w-6 text-orange-500" />
              <div className="ml-4 text-left">
                <p className="text-base font-medium text-gray-900">Register as Client</p>
                <p className="text-sm text-gray-500">Looking to hire contractors for projects</p>
              </div>
            </button>

            <button
              onClick={() => handleUserTypeSelect('contractor')}
              className="w-full flex items-center p-4 border border-gray-300 rounded-lg hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
            >
              <Briefcase className="h-6 w-6 text-orange-500" />
              <div className="ml-4 text-left">
                <p className="text-base font-medium text-gray-900">Register as Contractor</p>
                <p className="text-sm text-gray-500">Looking for work opportunities</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}