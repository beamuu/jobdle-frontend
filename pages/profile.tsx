import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useUser } from "../contexts/User";

const defaultUser = {
  firstname: '',
  lastname: '',
  username: '',
  password: '',
  email: '',
  role: '',
}

const ProfilePage = () => {
  const { userData } = useUser();
  const [profileData, setProfileData] = useState<User>(defaultUser);
  const [cookies, setCookie] = useCookies(["token"]);


  const handleEditUserData = async () => {
    console.log('profileData', profileData)
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`, profileData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setProfileData(userData || defaultUser)
  }, [userData]);

  if (!userData) return null;

  return (
    <div>
      <div className="block font-bold text-2xl text-sky-700 pb-5">
        Your Profile
      </div>
      <div className="flex flex-col lg:flex lg:flex-row bg-white py-5 rounded-md shadow">
        <div className="flex justify-center px-5">
          <div className="h-60 w-60 bg-gray-200 rounded-full flex justify-center items-center">
            Picture
          </div>
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
                  className="rounded-md border border-transparent bg-yellow-500 py-2 px-4 text-sm font-medium text-white shadow-md shadow-yellow-500/50 hover:bg-yellow-400"
                  onClick={handleEditUserData}
                >
                  Edit Profile
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
                  className="rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-md shadow-red-500/50 hover:bg-red-400"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
