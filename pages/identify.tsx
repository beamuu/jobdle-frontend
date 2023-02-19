import { useRouter } from "next/router";
import React, { useState } from "react";

const IdentifyPage = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
    } catch {}
    console.log(userEmail);
    setIsLoading(false);
  };

  return (
    <>
      <div className="bg-sky-400 flex justify-center min-h-screen min-w-screen">
        <div className="bg-white w-4/12 my-20 p-10 rounded-xl border border-transparent">
          <div>
            <p className="text-warp">
              Please enter your username or email address. You will recieve an
              email message with link to reset your password.
            </p>
          </div>
          <div className="my-5">
            <form onSubmit={handleSubmit}>
              <label>
                Email / Username
                <input
                  type="text"
                  className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </label>
              <div className="flex justify-end my-3">
                <button
                  type="submit"
                  className="bg-blue-100 hover:bg-blue-200 p-2 rounded text-blue-900 w-40"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex justify-center">
                      <span className="h-5 w-5 block rounded-full border-4 border-blue-400 border-t-white animate-spin"></span>
                    </div>
                  ) : (
                    <span>Continue</span>
                  )}
                </button>
              </div>
            </form>
          </div>
          <p className="text-blue-500 cursor-pointer" onClick={() => router.push("/signin")}>
            Back to sign in
          </p>
        </div>
      </div>
    </>
  );
};

IdentifyPage.noLayout = true;

export default IdentifyPage;
