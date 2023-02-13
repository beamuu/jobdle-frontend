import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import Header from "../components/Header";
import { getAllEmployees } from "../services/EmployeeServices";

function EmployeePage() {
  const [cookies] = useCookies(["token"]);
  const router = useRouter();

  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data } = await getAllEmployees(cookies.token);
      setAllEmployees(data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
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
