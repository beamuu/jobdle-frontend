import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";

const VerifyPage = () => {
  const router = useRouter();
  const { token } = router.query;

  const handleClick = () => {
    router.push("/signin");
  };

  const handleVerify = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify`,
      { token: token },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const fetchData = async () => {
    try {
      await handleVerify();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token === undefined) {
      return;
    }
    fetchData();
    console.log(token);
  }, [token]);

  return (
    <>
      <div className="bg-sky-400 flex justify-center min-h-screen min-w-screen">
        <div className="bg-white w-4/12 my-20 p-10 rounded-xl border border-transparent">
          <div className="">
            <p className="font-bold text-3xl text-center my-5">
              Verify Success
            </p>
            <label className="block font-medium text-gray-700 my-1">
              Welcome to Jobdle App!
            </label>
            <label className="block font-medium text-gray-700 my-1">
              you can login and hire work now.
            </label>
            <button
              className="transition rounded-md border border-transparent bg-blue-600 w-full py-2 px-4 text-sm font-medium text-white hover:bg-blue-500 my-5"
              onClick={handleClick}
            >
              <span
                className="justify-center"
                onClick={() => {
                  router.push("/signin");
                }}
              >
                go to login page
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

VerifyPage.noLayout = true;

export default VerifyPage;
