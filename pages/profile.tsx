import { ArrowUpTrayIcon, PhotoIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import FirebaseUpload from "../components/FirebaseUpload";
import Header from "../components/Header";
import { useUser } from "../contexts/User";

const defaultUser = {
  profileImageUrl: "",
  firstname: "",
  lastname: "",
  username: "",
  password: "",
  email: "",
  role: "",
};

const ProfilePage = () => {
  const { userData } = useUser();
  const [profileData, setProfileData] = useState(defaultUser);
  const [cookies] = useCookies(["token"]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isHover, setIsHover] = useState(false);
  const [file, setFile] = useState<File>();

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const handlePostAvatar = async () => {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
      { profileImageUrl: avatarUrl },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    );
    console.log(response);
  };

  const handleEditUserData = async () => {
    console.log("profileData", profileData);
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
      profileData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    );
  };

  function handleChangeFile(event: any) {
    setFile(event.target.files[0]);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setProfileData(userData || defaultUser);
    console.log(userData);

    if (avatarUrl) {
      handlePostAvatar();
    }
    console.log("avatarUrl", avatarUrl);
    console.log(profileData.profileImageUrl);
  }, [userData, avatarUrl]);

  if (!userData) return null;

  return (
    <>
      <Header title="Profile" />
      <div className="flex flex-col lg:flex lg:flex-row bg-white py-5 rounded-md shadow">
        <div className="flex flex-col items-center px-5 lg:w-1/3">
          <div
            className={`h-60 w-60 bg-gray-200 rounded-full bg-no-repeat bg-cover bg-center mb-3 flex justify-center items-center`}
            style={{
              backgroundImage: `url(${
                file ? URL.createObjectURL(file) : profileData.profileImageUrl
              })`,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {avatarUrl || profileData.profileImageUrl ? null : (
              <div className="text-6xl">AA</div>
            )}
            {isHover ? (
              <label
                className="h-60 w-60 bg-[rgb(226,232,240,0.7)] rounded-full cursor-pointer flex justify-center items-center"
                htmlFor="edit-avatar"
              >
                <div className="flex flex-col items-center">
                  <ArrowUpTrayIcon className="w-20 h-20 text-gray-400" />
                  <span className="text-gray-400">Click to edit</span>
                </div>
                <input
                  type="file"
                  id="edit-avatar"
                  className="hidden"
                  onChange={handleChangeFile}
                  accept="image/*"
                />
              </label>
            ) : null}
          </div>
          {/* <FirebaseUpload setUrl={setAvatarUrl} /> */}
        </div>
        <div className="px-5 lg:w-2/3">
          <div>
            <div>
              <div className="mb-3 lg:flex">
                <div className="lg:flex-1 lg:mr-3">
                  <label className="block font-medium text-gray-700 my-1">
                    First name
                  </label>
                  <input
                    className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    type="text"
                    placeholder=""
                    name="firstname"
                    value={profileData.firstname}
                    onChange={handleChange}
                  />
                </div>
                <div className="lg:flex-1">
                  <label className="block font-medium text-gray-700 my-1">
                    Surname
                  </label>
                  <input
                    className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    type="text"
                    placeholder=""
                    name="lastname"
                    value={profileData.lastname}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="block font-medium text-gray-700 my-1">
                  Email address
                </label>
                <input
                  className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  type="text"
                  placeholder="Your email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="block font-medium text-gray-700 my-1">
                  Username
                </label>
                <input
                  className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  type="text"
                  placeholder="Your username"
                  name="username"
                  value={profileData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="block font-medium text-gray-700 my-1">
                  Contacts Number
                </label>
                <input
                  className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  type="text"
                  placeholder="phone number"
                  onChange={handleChange}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="rounded-md border border-transparent bg-yellow-500 py-2 px-4 text-sm font-medium text-white hover:bg-yellow-400"
                  onClick={handleEditUserData}
                >
                  Save Change
                </button>
              </div>
              <div className="mb-3">
                <label className="block font-medium text-gray-700 my-1">
                  Password
                </label>
                <input
                  className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  type="password"
                  placeholder="Password"
                  name="password"
                />
              </div>
              <div className="mb-3">
                <label className="block font-medium text-gray-700 my-1">
                  Confirm Password
                </label>
                <input
                  className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-md hover:bg-red-400"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
