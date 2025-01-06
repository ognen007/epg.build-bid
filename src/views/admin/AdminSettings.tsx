import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProfileSettings } from "../../components/settings/ProfileSettings";
import { LogoutButton } from "../../components/settings/LogoutButton";

export function AdminSettings() {
  const [adminProfile, setAdminProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    avatar_url: "",
  });

  useEffect(() => {
    const fetchAdminProfile = async () => {
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
          `https://epg-backend.onrender.com/api/admin/settings/?email=${parsedUser.email}`
        );

        if (response.status === 200) {
          setAdminProfile(response.data);
        } else {
          console.error("Error fetching admin profile:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching admin profile:", error);
      }
    };

    fetchAdminProfile();
  }, []);

  const handleProfileUpdate = async (updatedProfile: typeof adminProfile) => {
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
        `https://epg-backend.onrender.com/api/admin/settings/change/?email=${parsedUser.email}`,
        payload
      );
  
      if (response.status === 200) {
        setAdminProfile(updatedProfile);
        console.log("Profile updated successfully");
      } else {
        console.error("Error updating profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  

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
          phone={adminProfile.phone}
          company={adminProfile.company}
          avatar_url={adminProfile.avatar_url}
          onSubmit={handleProfileUpdate} // Pass callback as prop
        />
      </div>
    </div>
  );
}
