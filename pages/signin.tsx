import axios from "axios";
import { useState } from "react";
import { NextPage } from "next";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { postAccountUser } from "../services/AccountServices";

type SignInPageWithNoLayout = NextPage & {
  noLayout: boolean;
};

const defaultValue = {
  username: "",
  password: "",
};

const SignInPage: SignInPageWithNoLayout = () => {
  const [, setCookie] = useCookies(["token"]);
  const router = useRouter();

  const [userAuthData, setUserAuthData] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    setUserAuthData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignIn = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    let errorArray = [];
    let inputs = Object.entries(userAuthData);

    for (let i = 0; i < Object.keys(userAuthData).length; i++) {
      if (inputs[i][1].trim() === "") {
        errorArray.push(inputs[i][0]);
      }
    }
    if (errorArray.length > 0) {
      setIsLoading(false);
      alert(`Please enter ${errorArray}`);
      return;
    }

    userAuthData.username = userAuthData.username.trim();
    try {
      const { data } = await postAccountUser(userAuthData);

      if (!data.accessToken) {
        // กรณีไม่มี acessToken
        alert("No token!");
        setUserAuthData({ ...userAuthData, password: "" });
      } else {
        setCookie("token", data.accessToken, { path: "/" });
        router.push("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert("Your password is wrong");
          setUserAuthData({ ...userAuthData, password: "" });
        } else {
          alert("Error bewteen client and server!");
        }
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-sky-400 min-h-screen min-w-screen grid justify-items-center">
        <div
          id="logo"
          className="font-bold m-4 absolute inset-0 text-gray-100 h-5"
        >
          Jobdle
        </div>
        <div className="bg-white sm:w-8/12 md:w-8/12 lg:w-4/12 my-20 p-10 rounded-xl border border-transparent">
          <p className="font-bold text-3xl text-center my-5">Sign in</p>
          <form onSubmit={handleSignIn}>
            <div className="mb-3">
              <label className="block text-gray-700 my-1">Username</label>
              <input
                className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                type="text"
                value={userAuthData.username}
                placeholder="Type your username"
                name="username"
                onChange={handleChange}
                id="username"
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 my-1">Password</label>
              <input
                className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                type="password"
                value={userAuthData.password}
                placeholder="Type your password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end mb-3">
              <p
                className="text-blue-600 hover:underline hover:cursor-pointer visited:text-purple-600"
                onClick={() => router.push("/users/password/new")}
              >
                Forgot Password?
              </p>
            </div>
            <div className="flex justify-center mb-3 items-center">
              <button
                type="submit"
                className="border border-transparent rounded-full bg-blue-600 hover:bg-blue-500 w-full py-2 px-4 text-sm font-medium text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex justify-center">
                    <span className="h-5 w-5 block rounded-full border-4 border-blue-400 border-t-white animate-spin"></span>
                  </div>
                ) : (
                  <span className="justify-center">Log in</span>
                )}
              </button>
            </div>
          </form>
          <hr />
          <div className="flex justify-center my-5">
            <p>
              Need An Account?{" "}
              <a
                href="/signup"
                className="text-blue-600 visited:text-purple-600 hover:underline hover:cursor-pointer"
              >
                Create Now!
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

SignInPage.noLayout = true;

export default SignInPage;
