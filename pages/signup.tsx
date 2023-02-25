import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  ReactNode,
  useState,
} from "react";
import { NextPage } from "next";
import axios from "axios";
import { useRouter } from "next/router";

type SignUpPageWithNoLayout = NextPage & {
  noLayout: boolean;
};

const defaultValue = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
};

const SignUpPage: SignUpPageWithNoLayout = () => {
  const router = useRouter();

  const [userData, setUserData] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [comfirmPassword, setComfirmPassword] = useState("");

  const handleChange = (e: any) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (comfirmPassword !== userData.password) {
      alert("Those passwords didn’t match. Try again");
      return;
    }
    try {
      e.preventDefault();
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      router.push("/signin");
    } catch (error) {
      console.error(error);
    }
    alert("Please go to your email for verify.");
    setIsLoading(false);
  };

  return (
    <>
      <div className="bg-sky-400 flex justify-center items-center min-h-screen min-w-screen">
        <div className="bg-white w-9/12 h-5/6 p-10 rounded-xl border border-transparent">
          <p className="font-bold text-3xl text-center my-5">Sign Up</p>
          <form onSubmit={handleSignUp}>
            <div className="mb-3 lg:flex">
              <div className="lg:flex-1 lg:mr-3">
                <label className="block font-medium text-gray-700 my-1">
                  First Name
                  <input
                    className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={userData.firstname}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="lg:flex-1">
                <label className="block font-medium text-gray-700 my-1">
                  Surname
                  <input
                    className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    type="text"
                    name="lastname"
                    placeholder="Surname"
                    value={userData.lastname}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
            </div>
            <div className="mb-3">
              <label className="block font-medium text-gray-700 my-1">
                Email address
                <input
                  className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="mb-3">
              <label className="block font-medium text-gray-700 my-1">
                Username
                <input
                  className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  type="text"
                  name="username"
                  placeholder="Your username"
                  value={userData.username}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="mb-3">
              <label className="block font-medium text-gray-700 my-1">
                Password
                <input
                  className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="mb-3">
              <label className="block font-medium text-gray-700 my-1">
                Confirm Password
                <input
                  className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setComfirmPassword(e.target.value)
                  }
                  value={comfirmPassword}
                />
              </label>
            </div>
            <div className="grid mt-5">
              <button
                type="submit"
                className="transition rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-lg shadow-blue-500/50 hover:bg-blue-400"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex justify-center">
                    <svg className="h-5 w-5 block rounded-full border-4 border-blue-400 border-t-white animate-spin"></svg>
                  </div>
                ) : (
                  <span>SIGN UP</span>
                )}
              </button>
            </div>
          </form>

          <div className="flex justify-center my-5">
            <p className="mr-2">You have an account ? </p>
            <a href="/signin" className="text-blue-600 visited:text-purple-600">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

SignUpPage.noLayout = true;

export default SignUpPage;
