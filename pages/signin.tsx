import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async (e: FormEvent) => {
    e.preventDefault();
    const res = await axios.post(
      "https://www.melivecode.com/api/login",
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data);
  };
  return (
    <div className="bg-blue-200 h-screen w-screen grid justify-items-center">
      <div className="bg-white sm:w-8/12 md:w-8/12 lg:w-4/12 my-20 p-10 rounded-xl border border-transparent">
        <p className="font-bold text-3xl text-center my-5">Login</p>
        <form onSubmit={handleSignin}>
          <div className="mb-3">
            <label className="block font-medium text-gray-700 my-1">
              Email
            </label>
            <input
              className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              type="text"
              value={username}
              placeholder="Type your email"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium text-gray-700 my-1">
              Password
            </label>
            <input
              className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              type="text"
              value={password}
              placeholder="Type your password"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
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
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
