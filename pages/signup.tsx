import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  ReactNode,
  useState,
} from "react";
import { NextPage } from "next";
import axios from "axios";

type SignUpPageWithNoLayout = NextPage & {
  noLayout: boolean;
};

const SignUpPage: SignUpPageWithNoLayout = () => {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [cfmPw, setCfmPw] = useState(""); // Comfirm Password

  const handleChange = (e: any) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignUp = async (e: FormEvent) => {
    try {
      setIsLoading(true);
      console.log("userData ", userData);
      e.preventDefault();
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      console.log("res.data", res.data);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-blue-200 h-screen w-screen grid justify-items-center">
      <div className="bg-white w-9/12 my-20 p-10 rounded-xl border border-transparent">
        <p className="font-bold text-3xl text-center my-5">Sign Up</p>
        <form onSubmit={handleSignUp}>
          <div className="mb-3 lg:flex">
            <div className="lg:flex-1 lg:mr-3">
              <label className="block font-medium text-gray-700 my-1">
                First Name
              </label>
              <input
                className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                type="text"
                value={userData.firstname}
                placeholder=""
                name="firstname"
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
                value={userData.lastname}
                placeholder=""
                name="lastname"
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
              type="email"
              value={userData.email}
              placeholder="Your email"
              name="email"
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
              value={userData.username}
              placeholder="Your username"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium text-gray-700 my-1">
              Password
            </label>
            <input
              className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              type="password"
              value={userData.password}
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium text-gray-700 my-1">
              Confirm Password
            </label>
            <input
              className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              type="password"
              value={cfmPw}
              placeholder="Confirm Password"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCfmPw(e.target.value)
              }
            />
          </div>
          <div className="grid mt-5">
            <button
              type="submit"
              className="transition rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-lg shadow-blue-500/50 hover:bg-blue-400"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  {/* <svg className="animate-spin h-5 w-5 mr-3"></svg> */}
                  <span>SIGNING UP...</span>
                </>
              ) : (
                <span>SIGN UP</span>
              )}
            </button>
          </div>
        </form>
        <div className="flex justify-center my-5">
          <a href="/signin" className="text-blue-600 visited:text-purple-600">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

SignUpPage.noLayout = true;

export default SignUpPage;
