import { useState, useEffect } from "react";
import axios from "axios";
import { ProfileSettings } from "../../components/settings/ProfileSettings";
import { LogoutButton } from "../../components/settings/LogoutButton";
import { fetchAdminProfile, updateAdminProfile } from "../../services/admin/adminInfo/adminSettings";

export function AdminSettings() {
  const [adminProfile, setAdminProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadAdminProfile() {
      try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          setError("No user found in localStorage");
          return;
        }

        const parsedUser = JSON.parse(storedUser);

        if (!parsedUser.email) {
          setError("Email not found in stored user data");
          return;
        }

        const profile = await fetchAdminProfile(parsedUser.email);
        if (profile) {
          setAdminProfile(profile);
        } else {
          setError("Failed to load profile.")
        }

      } finally {
        setLoading(false);
      }
    }

    loadAdminProfile();
  }, []);

  const handleProfileUpdate = async (updatedProfile: typeof adminProfile) => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setError("No user found in localStorage");
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      if (!parsedUser.email) {
        setError("Email not found in stored user data");
        return;
      }

      const updatedProfileFromServer = await updateAdminProfile(parsedUser.email, updatedProfile);
      if (updatedProfileFromServer) {
        setAdminProfile(updatedProfileFromServer);
        console.log("Profile updated successfully");
      } else {
        setError("Failed to update profile.")
      }

    } catch (error: any) {
      console.error("Error updating profile:", error);
      setError(error.message || "Error updating profile");
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
        <h1 className="text-2xl font-semibold text-gray-900">Admin Settings</h1>
        <LogoutButton />
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <ProfileSettings
          fullName={adminProfile.fullName}
          email={adminProfile.email}
          phoneNumber={adminProfile.phoneNumber}
          companyName={adminProfile.companyName}
          onSubmit={handleProfileUpdate} // Pass callback as prop
        />
      </div>
    </div>
  );
}