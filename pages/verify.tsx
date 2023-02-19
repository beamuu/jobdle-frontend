import { useState } from "react";
import { useRouter } from 'next/router';


const VerifyPage = () => {
    
  const router = useRouter();

  const handleClick = () => {
    router.push('/signin');
  };

  return (
      <div className="bg-sky-400 h-screen w-screen">
      <div className="w-full grid justify-items-center">
        <div className="bg-white sm:w-8/12 md:w-8/12 lg:w-4/12 my-20 p-10 rounded-xl border border-transparent">
          <p className="font-bold text-3xl text-center my-5">Verify Success</p>
          <label className="block font-medium text-gray-700 my-1">
            Welcome to Jobdle App!
          </label>
          <label className="block font-medium text-gray-700 my-1">
            you can login and hire work now.
          </label>
          <button 
            className="transition rounded-md border border-transparent bg-blue-600 w-full py-2 px-4 text-sm font-medium text-white hover:bg-blue-500"
            onClick={handleClick}
            ><span className="justify-center">go to login page</span>
          </button>
        </div>
      </div>
      </div>
    );
};

VerifyPage.noLayout = true;

export default VerifyPage;
