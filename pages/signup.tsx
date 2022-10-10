import { ChangeEvent, FormEvent, useState } from "react";
import { NextPage } from "next";

const SignUp: NextPage = () => {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    username: "",
    password: "",
  });

  const [cfmPw, setCfmPw] = useState(""); // Comfirm Password

  const handleChange = (e: any) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignUp = (e: FormEvent) => {
    e.preventDefault();
  };

  console.log(user);
  return (
    <div className="bg-blue-200 h-screen w-screen grid justify-items-center">
      <div className="bg-white w-9/12 my-20 p-10 rounded-xl border border-transparent">
        <p className="font-bold text-3xl text-center my-5">Sign Up</p>
        <form>
          <div className="mb-3 lg:flex">
            <div className="lg:flex-1 lg:mr-3">
              <label className="block font-medium text-gray-700 my-1">
                First Name
              </label>
              <input
                className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                type="text"
                value={user.fname}
                placeholder=""
                name="fname"
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
                value={user.lname}
                placeholder=""
                name="lname"
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
              value={user.email}
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
              value={user.username}
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
              value={user.password}
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
          <div className="grid">
            <button
              type="submit"
              className="transition rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-lg shadow-blue-500/50 hover:bg-blue-400"
              onSubmit={handleSignUp}
            >
              SIGN UP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
