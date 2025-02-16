import { useState, useEffect } from "react";
import { ProfileSettings } from "../../components/settings/ProfileSettings";
import { LogoutButton } from "../../components/settings/LogoutButton";
import { fetchContractorProfile, updateContractorProfile } from "../../services/contractor/contractorData/contractorSettings";

export function ContractorSettings() {
  const [contractorProfile, setContractorProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
  });
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    async function loadContractorProfile() {
      try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          console.error("No user stored")
          return;
        }

        const parsedUser = JSON.parse(storedUser);

        if (!parsedUser.email) {
          console.error("Email not found in stored user data");
          return;
        }

        const profile = await fetchContractorProfile(parsedUser.email);

        if (profile) {
          setContractorProfile(profile);
        } else {
          console.error("Failed to load profile.")
        }
      } finally {
        setLoading(false);
      }
    }

    loadContractorProfile();
  }, []);

  const handleProfileUpdate = async (updatedProfile: typeof contractorProfile) => {
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

      const updatedProfileFromServer = await updateContractorProfile(parsedUser.email, updatedProfile);

      if (updatedProfileFromServer) {
        setContractorProfile(updatedProfileFromServer); // Update with data from server
        console.log("Profile updated successfully");
      } else {
        console.error("Failed to update profile.")
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      console.error(error.message || "Error updating profile"); // Set error state
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