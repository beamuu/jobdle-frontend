import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Example from "../components/SignOutModal";
import { getAllEmployees } from "../services/EmployeeServices";

function EmployeePage() {
  const [cookies, setCookie] = useCookies(["token"]);
  const router = useRouter();
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getAllEmployees(cookies.token).then((res) => {
      setAllEmployees(res.data);
    });
  }, []);

  return (
    <div>
      <Header title="Employee" />
      <div className="block my-3">
        <button
          className="p-2 rounded-md bg-green-500 text-white"
          onClick={() => router.push("/fillemployeedetail")}
        >
          Add Employee
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {allEmployees.map((employee) => (
          <div
            className="bg-white flex flex-col items-center rounded-md hover:shadow-lg cursor-pointer p-2"
            onClick={() => router.push(`/employeedetails/${employee._id}`)}
            key={employee._id}
          >
            {/* <div className="bg-red-500 w-24 rounded-md w-32">Picture</div>
          <div className="pl-2">
            <p>นภสินธ์ แสงทอง</p>
            <p>ความถนัด</p>
          </div> */}
            <div id="image" className="flex justify-center py-2">
              <div className="bg-sky-500 rounded-full w-32 h-32"></div>
            </div>
            <div id="details" className="flex flex-col items-center">
              <span>
                {employee.firstname} {employee.lastname}
              </span>
              <span className="text-gray-400">Front Developer</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeePage;
