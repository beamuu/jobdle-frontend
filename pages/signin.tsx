import { FormEvent, useState } from "react";
import axios from "axios";
import { NextPage } from "next";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

type SignInPageWithNoLayout = NextPage & {
  noLayout: boolean;
};

const SignInPage: SignInPageWithNoLayout = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const router = useRouter();

  const handleChange = (e: any) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const getUserData = async () => {
  //   const res =  await axios.get(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${cookies.token}`,
  //       },
  //     }
  //   );
  //   return res.data
  // };

  const handleSignIn = async (e: FormEvent) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.data.accessToken) { // กรณีไม่มี acessToken
        alert("Sign in fail!");
      } else {
        setCookie("token", res.data.accessToken, { path: "/" });
        setIsLoading(false);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Error bewteen client and server!");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-sky-200 h-screen w-screen grid justify-items-center">
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
            <p className="text-blue-500 hover:underline hover:cursor-pointer">
              Forgot Password?
            </p>
          </div>
          <div className="grid mb-3">
            <button
              type="submit"
              className="transition rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-lg shadow-blue-500/50 active:bg-blue-400"
              disabled={isLoading}
            >
              LOG IN
            </button>
          </div>
        </form>
        <hr />
        <div className="flex justify-center my-5">
          <p>
            Need An Account?{" "}
            <a href="/signup" className="text-blue-600 visited:text-purple-600">
              Create Now!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

SignInPage.noLayout = true;

export default SignInPage;
