import { useState, useEffect } from "react";
import axios from "axios";
import { ProfileSettings } from "../../components/settings/ProfileSettings";
import { LogoutButton } from "../../components/settings/LogoutButton";

export function ContractorSettings() {
  const [contractorProfile, setContractorProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
  });
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchContractorProfile = async () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          console.error("No user found in localStorage");
          return;
        }

        const parsedUser = JSON.parse(storedUser);

        if (!parsedUser.email) {
          console.error("Email not found in stored user data");
          return;
        }

        const response = await axios.get(
          `https://epg-backend.onrender.com/api/contractor/settings/?email=${parsedUser.email}`
        );

        if (response.status === 200) {
          setContractorProfile(response.data);
        } else {
          console.error("Error fetching contractor profile:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching contractor profile:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchContractorProfile();
  }, []);

  const handleProfileUpdate = async (updatedProfile: typeof contractorProfile) => {
    const payload = Object.fromEntries(
      Object.entries(updatedProfile).filter(
        ([_, value]) => value !== null && value !== undefined && value !== ""
      )
    );
  
    const storedUser = localStorage.getItem("user");
  
    if (!storedUser) {
      console.error("No user found in localStorage");
      return;
    }
  
    const parsedUser = JSON.parse(storedUser);
  
    if (!parsedUser.email) {
      console.error("Email not found in stored user data");
      return;
    }
  
    console.log("Payload being sent:", payload);
  
    try {
      const response = await axios.put(
        `https://epg-backend.onrender.com/api/contractor/settings/?email=${parsedUser.email}`,
        payload
      );
  
      if (response.status === 200) {
        setContractorProfile(updatedProfile);
        console.log("Profile updated successfully");
      } else {
        console.error("Error updating profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };  

  // Skeleton loader for loading state
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded w-24"></div>
        </div>

        {/* Profile Settings Skeleton */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="space-y-6">
            {/* Avatar Skeleton */}
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>

            {/* Form Fields Skeleton */}
            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>

            {/* Save Button Skeleton */}
            <div className="h-10 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Contractor Settings</h1>
        <LogoutButton />
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <ProfileSettings
          fullName={contractorProfile.fullName}
          email={contractorProfile.email}
          phoneNumber={contractorProfile.phoneNumber}
          companyName={contractorProfile.companyName}
          onSubmit={handleProfileUpdate} // Pass callback as prop
        />
      </div>
    </div>
  );
}