import { useState } from "react";

const defaultValue = {
  NewPassword: "",
  ComformNewPassword: "",
};

const RecoverPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputFields, setInputFleids] = useState(defaultValue);

  const handleChange = (e: any) => {
    setInputFleids((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handleSubmit = () => {};

  return (
    <>
      <div className="bg-sky-400 flex justify-center min-h-screen min-w-screen">
        <div className="bg-white w-4/12 my-20 p-10 rounded-xl border border-transparent">
          <div>
            <p className="text-3xl">Recover</p>
          </div>
          <div className="my-5">
            <form onSubmit={handleSubmit}>
              <label>
                New Password
                <input
                  type="text"
                  className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  onChange={handleChange}
                />
              </label>
              <label>
                Comfirm new password
                <input
                  type="text"
                  className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  onChange={handleChange}
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
                    <span>Reset password</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

RecoverPasswordPage.noLayout = true;

export default RecoverPasswordPage;
