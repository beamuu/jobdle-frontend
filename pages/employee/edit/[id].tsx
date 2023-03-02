import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { useUser } from "../../../contexts/User";
import { editEmployee, getEmployee } from "../../../services/EmployeeServices";
import Header from "../../../components/Header";
import { splitTFromISO } from "../../../services/UtilsServices";

const defaultValue = {
  firstname: "",
  lastname: "",
  email: "",
  tel: "",
  birthday: "",
  gender: "",
  detail: "",
};

const EmployeedetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { userData } = useUser();

  const [cookies] = useCookies(["token"]);
  const [employeeDetail, setEmployeeDetail] =
    useState<EmployeeEditable>(defaultValue);

  const handleChange = (e: any) => {
    setEmployeeDetail((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    // console.log("handleEditEmployee");
    e.preventDefault();
    if (!id) return;
    await editEmployee(id, employeeDetail, cookies.token);
    router.push(`/employee/details/${id}`);
  };

  useEffect(() => {
    if (id) {
      getEmployee(id, cookies.token)
        .then((res) => {
          setEmployeeDetail(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [router]);

  const handleDateChage = (date: any) => {
    setEmployeeDetail({ ...employeeDetail, birthday: date });
  };

  if (employeeDetail === undefined) return null;

  if (userData === undefined) return null;

  return (
    <>
      <Header title="Edit Employee" />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex lg:flex-row bg-white py-5 rounded-md shadow">
          <div className="flex justify-center px-5">
            <div className="h-60 w-60 bg-gray-200 rounded-full flex justify-center items-center">
              Picture
            </div>
          </div>
          <div className="px-5 lg:w-2/3">
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
                      value={employeeDetail.firstname}
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
                      value={employeeDetail.lastname}
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
                    type="text"
                    placeholder="Your email"
                    name="email"
                    onChange={handleChange}
                    value={employeeDetail.email}
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
                    value={employeeDetail.tel}
                    required
                  />
                </div>
                <div className="mb-3 lg:flex">
                  <div className="lg:flex-1 lg:mr-3">
                    <label className="block font-medium text-gray-700 my-1">
                      Birthday
                    </label>
                    <input
                      type="date"
                      className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                      value={splitTFromISO(employeeDetail.birthday)}
                      name="birthday"
                      onChange={(e) => handleDateChage(e.target.value)}
                      //   required
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
                      value={employeeDetail.gender}
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
          <button
            type="submit"
            className="p-2 bg-yellow-500 rounded-md text-white"
          >
            Edit
          </button>
        </div>
      </form>
    </>
  );
};

export default EmployeedetailsPage;
