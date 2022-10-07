import { ChangeEvent, useState } from "react";

function SignUp() {
  const [email, setEmail] = useState("");

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
                value=""
                placeholder=""
              />
            </div>
            <div className="lg:flex-1">
              <label className="block font-medium text-gray-700 my-1">
                Surname
              </label>
              <input
                className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                type="text"
                value=""
                placeholder=""
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
              value={email}
              onChange={(e :ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder="Your email"
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium text-gray-700 my-1">
              Username
            </label>
            <input
              className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              type="text"
              value=""
              placeholder="Your username"
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium text-gray-700 my-1">
              Password
            </label>
            <input
              className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              type="text"
              value=""
              placeholder="Password"
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium text-gray-700 my-1">
              Confirm Password
            </label>
            <input
              className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              type="text"
              value=""
              placeholder="Confirm Password"
            />
          </div>
          <div className="grid">
            <button
              type="submit"
              className="transition rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-lg shadow-blue-500/50 hover:bg-blue-400"
            >
              SIGN UP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
