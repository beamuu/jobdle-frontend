import axios from "axios";
import { FormEvent, useState } from "react";
import { NextPage } from "next";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { postAccountUser } from "../services/AccountServices";

type SignInPageWithNoLayout = NextPage & {
  noLayout: boolean;
};

const SignInPage: SignInPageWithNoLayout = () => {
  const [, setCookie] = useCookies(["token"]);
  const router = useRouter();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    userData.username = userData.username.trim();
    try {
      const { data } = await postAccountUser(userData);

      if (!data.accessToken) {
        // กรณีไม่มี acessToken
        alert("Sign in fail!");
      } else {
        setCookie("token", data.accessToken, { path: "/" });
        router.push("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert("Sign in fail!");
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
        <div className="bg-white sm:w-8/12 md:w-8/12 lg:w-4/12 my-20 p-10 rounded-xl border border-transparent">
          <p className="font-bold text-3xl text-center my-5">Login</p>
          <form onSubmit={handleSignIn}>
            <div className="mb-3">
              <label className="block font-medium text-gray-700 my-1">
                Username
              </label>
              <input
                className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                type="text"
                value={userData.username}
                placeholder="Type your username"
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
                placeholder="Type your password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end mb-3">
              <p
                className="text-blue-500 hover:underline hover:cursor-pointer"
                onClick={() => router.push("/identify")}
              >
                Forgot Password?
              </p>
            </div>
            <div className="flex justify-center mb-3 items-center">
              <button
                type="submit"
                className="transition rounded-md border border-transparent bg-blue-600 w-full py-2 px-4 text-sm font-medium text-white hover:bg-blue-500"
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
                className="text-blue-600 visited:text-purple-600"
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
