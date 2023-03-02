import { ArrowUpTrayIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { useCookies } from "react-cookie";
import ButtonComponent from "../../../components/ButtonComponent";

import Header from "../../../components/Header";
import { postEmployee } from "../../../services/EmployeeServices";
import { handleUpload } from "../../../services/UtilsServices";

const defaultValue = {
  profileImageUrl: "",
  firstname: "",
  lastname: "",
  email: "",
  tel: "",
  birthday: "",
  gender: "",
  detail: "",
};

function FillEmployeeDetailPage() {
  const [cookies] = useCookies(["token"]);
  const router = useRouter();

  const [employeeDetailsObject, setEmployeeDetailsObject] =
    useState<EmployeeEditable>(defaultValue);
  const [file, setFile] = useState<File>();
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setEmployeeDetailsObject((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function handleChangeFile(event: any) {
    setFile(event.target.files[0]);
  }

  const handleSubmitAddEmployee = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    let submitedData = employeeDetailsObject;
    if (!submitedData) return;
    if (file) {
      try {
        const profileImageUrl = await handleUpload(file);
        submitedData.profileImageUrl = profileImageUrl;
      } catch (error) {
        console.error(error);
      }
    }
    console.log("submitedData", submitedData);
    await postEmployee(submitedData, cookies.token);
    router.push("/employee");
  };

  return (
    <>
      <Header title="Fill Employee Details" />
      <form onSubmit={handleSubmitAddEmployee}>
        <div className="flex flex-col lg:flex lg:flex-row bg-white py-5 rounded-md shadow">
          <div className="flex flex-col items-center lg:w-1/3">
            <div
              className={`h-60 w-60 bg-gray-100 rounded-full bg-no-repeat bg-cover bg-center flex justify-center items-center`}
              style={{
                backgroundImage: `url(${
                  file ? URL.createObjectURL(file) : null
                })`,
              }}
            >
              {file || employeeDetailsObject.profileImageUrl ? null : (
                <div>
                  <PhotoIcon className="w-auto" />
                  <p>No Image</p>
                </div>
              )}
            </div>
            <div className="px-5 my-3">
              <input
                type="file"
                id="edit-avatar"
                onChange={handleChangeFile}
                accept="image/*"
                className="w-full m-auto bg-gray-100"
              />
            </div>
          </div>
          <div className="mx-5 lg:w-2/3">
            <div>
              <div>
                <div className="mb-3 lg:flex">
                  <div className="lg:flex-1 lg:mr-3">
                    <label className="block font-medium text-gray-700 my-1">
                      First name
                    </label>
                    <input
                      className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                      type="text"
                      placeholder=""
                      name="firstname"
                      onChange={handleChange}
                      value={employeeDetailsObject.firstname}
                      required
                    />
                  </div>
                  <div className="lg:flex-1">
                    <label className="block font-medium text-gray-700 my-1">
                      Surname
                    </label>
                    <input
                      className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                      type="text"
                      placeholder=""
                      name="lastname"
                      onChange={handleChange}
                      value={employeeDetailsObject.lastname}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block font-medium text-gray-700 my-1">
                    Email address
                  </label>
                  <input
                    className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    type="email"
                    placeholder="Your email"
                    name="email"
                    onChange={handleChange}
                    value={employeeDetailsObject.email}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block font-medium text-gray-700 my-1">
                    Tel.
                  </label>
                  <input
                    className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    type="text"
                    placeholder=""
                    name="tel"
                    onChange={handleChange}
                    value={employeeDetailsObject.tel}
                    required
                  />
                </div>
                <div className="mb-3 lg:flex">
                  <div className="lg:flex-1 lg:mr-3">
                    <label className="block font-medium text-gray-700 my-1">
                      Birthday
                    </label>
                    <input
                      className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                      type="date"
                      placeholder=""
                      name="birthday"
                      onChange={handleChange}
                      value={employeeDetailsObject.birthday}
                      required
                    />
                  </div>
                  <div className="lg:flex-1">
                    <label className="block font-medium text-gray-700 my-1">
                      Gender
                    </label>
                    <select
                      className="border-2 border-gray-200 w-full h-10 rounded-md px-3 cursor-pointer cursor-pointer focus:outline-none focus:border-blue-500"
                      required
                      name="gender"
                      onChange={handleChange}
                      value={employeeDetailsObject.gender}
                    >
                      <option value="">โปรดเลือก</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block font-medium text-gray-700 my-1">
                    Details
                  </label>
                  <textarea
                    className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    rows={10}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <ButtonComponent
            type="submit"
            className="p-2 bg-sky-500 rounded-md text-white"
            isLoading={isLoading}
          >
            Add
          </ButtonComponent>
        </div>
      </form>
    </>
  );
}

export default FillEmployeeDetailPage;
