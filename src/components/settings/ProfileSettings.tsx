import React, { useState, useEffect } from "react";
import { Camera } from "lucide-react";

interface ProfileSettingsProps {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  avatar_url: string;
  onSubmit: (updatedProfile: {
    fullName: string;
    email: string;
    phone: string;
    company: string;
    avatar_url: string;
  }) => void; // New prop for submitting profile changes
}

export function ProfileSettings({
  fullName,
  email,
  phone,
  company,
  avatar_url,
  onSubmit,
}: ProfileSettingsProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [profile, setProfile] = useState({
    fullName: fullName || "",
    email: email || "",
    phone: phone || "",
    company: company || "",
    avatar_url: avatar_url || "",
  });

  // Update profile when props change
  useEffect(() => {
    setProfile({
      fullName: fullName || "",
      email: email || "",
      phone: phone || "",
      company: company || "",
      avatar_url: avatar_url || "",
    });
  }, [fullName, email, phone, company, avatar_url]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await onSubmit(profile); // Call the onSubmit prop with the updated profile
      setSuccess(true);
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Mock file upload
    setLoading(true);

    // Simulate a file upload
    setTimeout(() => {
      setProfile((prevProfile) => ({
        ...prevProfile,
        avatar_url: URL.createObjectURL(file), // Temporarily set the local object URL
      }));
      setLoading(false);
    }, 1000);

    // Clear the input field to allow re-upload of the same file
    e.target.value = "";
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>

      <div className="flex items-center space-x-6 mb-6">
        <div className="relative">
          <img
            src={
              profile.avatar_url ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                profile.fullName
              )}&background=random`
            }
            alt="Profile"
            className="h-24 w-24 rounded-full object-cover bg-gray-100"
          />
          <label className="absolute bottom-0 right-0 p-1.5 bg-orange-500 rounded-full text-white hover:bg-orange-600 cursor-pointer">
            <Camera className="h-4 w-4" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
              disabled={loading}
            />
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) =>
                setProfile((prevProfile) => ({
                  ...prevProfile,
                  fullName: e.target.value,
                }))
              }
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) =>
                setProfile((prevProfile) => ({
                  ...prevProfile,
                  phone: e.target.value,
                }))
              }
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Company</label>
            <input
              type="text"
              value={profile.company}
              onChange={(e) =>
                setProfile((prevProfile) => ({
                  ...prevProfile,
                  company: e.target.value,
                }))
              }
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        <div className="flex justify-end">
          {success && (
            <span className="mr-4 text-sm text-green-600">Changes saved successfully!</span>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
