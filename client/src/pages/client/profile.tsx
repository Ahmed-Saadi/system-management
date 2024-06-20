import React, { useEffect, useState } from "react";
import { Account } from "../../models/model";
import api from "../../api/api";

interface Props {
  account?: Account;
}

export const Profile: React.FC<Props> = ({ account }) => {
  const [userAccount, setUserAccount] = useState<Account | undefined>(account);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePath, setProfilePicturePath] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!userAccount) {
      api.post("/v1/auth/checkprivilege").then((response) => {
        const account = response.data;
        setUserAccount(account);
        if (account.profilePicture) {
          setProfilePicturePath(account.profilePicture);
        }
      });
    } else if (userAccount.profilePicture) {
      setProfilePicturePath(userAccount.profilePicture);
    }
  }, [userAccount]);

  useEffect(() => {
    if (profilePicture) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(profilePicture);
    } else {
      setPreview(null);
    }
  }, [profilePicture]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfilePicture(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (profilePicture && userAccount) {
      const formData = new FormData();
      formData.append("file", profilePicture);

      try {
        const response = await api.post(`/user/${userAccount.u_id}/ProfilePicture`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const newProfilePicturePath = response.data.path; // Assuming the path is returned as response.data.path
        setProfilePicturePath(newProfilePicturePath);
        setUserAccount({ ...userAccount, profilePicture: newProfilePicturePath });

        alert("Profile picture uploaded successfully");
        setIsProfileModalOpen(false);
      } catch (error) {
        console.error("Failed to upload profile picture", error);
        alert("Failed to upload profile picture");
      }
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirmation do not match");
      return;
    }

    try {
      await api.post("/api/changePassword", {
        oldPassword,
        newPassword,
      });
      alert("Password changed successfully");
      setIsPasswordModalOpen(false);
    } catch (error) {
      console.error("Failed to change password", error);
      alert("Failed to change password");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto mt-10">
      <div className="relative w-32 h-32 rounded-full overflow-hidden">
        {profilePicturePath ? (
          <img
            src={`${api.defaults.baseURL}/${profilePicturePath}`} // Assuming api.defaults.baseURL is set
            alt="Profile"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            No profile picture
          </div>
        )}
        <button
          onClick={() => setIsProfileModalOpen(true)}
          className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 shadow-md hover:bg-blue-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12H9m4 4H9m3-14h4l2 2h4v12a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h4l2 2zm2 6h2m0 4h2M7 16H5m0-4H3"
            />
          </svg>
        </button>
      </div>

      <div className="mt-6 text-center">
        <h1 className="text-2xl font-bold text-gray-700">
          {userAccount ? userAccount.firstname : "John Doe"}
        </h1>
        <p className="text-gray-500">
          {userAccount ? userAccount.email : "johndoe@example.com"}
        </p>
      </div>

      <div className="flex flex-col w-full mt-6 space-y-4">
        <button
          onClick={() => setIsPasswordModalOpen(true)}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
        >
          Change Password
        </button>
      </div>

      {isProfileModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Change Profile Picture</h2>
            <div className="flex items-center space-x-4 mb-4">
              {preview ? (
                <img src={preview} alt="Preview" className="w-20 h-20 object-cover rounded-full" />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-full">
                  No preview
                </div>
              )}
              <label className="flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12H9m4 4H9m3-14h4l2 2h4v12a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h4l2 2zm2 6h2m0 4h2M7 16H5m0-4H3"
                  />
                </svg>
                Choose File
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            <button
              onClick={handleUpload}
              className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
            >
              Upload Picture
            </button>
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {isPasswordModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Old Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <button
              onClick={handleChangePassword}
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
            >
              Change Password
            </button>
            <button
              onClick={() => setIsPasswordModalOpen(false)}
              className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
