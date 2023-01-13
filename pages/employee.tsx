import { Router, useRouter } from "next/router";
import React from "react";

const dateFormat = (today: Date) => {
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  let currentDate = `${dd}/${mm}/${yyyy}`;
  return currentDate;
};

function EmployeePage() {
  const router = useRouter();
  return (
    <div>
      <div className="text-sky-700 font-bold text-2xl pb-3">Employee</div>
      <span className="bg-white rounded-md px-2 py-1 bg-green-200">
        {dateFormat(new Date())}
      </span>
      <hr className="my-3" />
      <div className="block my-3">
        <button
          className="p-2 rounded-md bg-green-500 text-white"
          onClick={() => router.push("/fillemployeedetail")}
        >
          Add Employee
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div
          className="bg-white flex flex-col items-center rounded-md hover:shadow-lg cursor-pointer p-2"
          onClick={() => router.push("/employeedetails")}
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
            <span className="">Napasin Saengthong</span>
            <span className="text-gray-400">Front-end Developer</span>
          </div>
        </div>
        <div
          className="bg-white flex rounded-md shadow cursor-pointer h-40 p-2"
          onClick={() => router.push("/employeedetails")}
        >
          <div className="bg-red-500 w-24 rounded-md w-32">Picture</div>
          <div className="pl-2">
            <p>นภสินธ์ แสงทอง</p>
            <p>ความถนัด</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeePage;
