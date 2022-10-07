import type { NextPage } from "next";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  const JobDescription = [
    { emp_name: "Napasin Saengthong", title: "ซ่อมท่อ", category: "ซ่อม", date: "2/10/2022" },
    { emp_name: "Napasin Saengthong", title: "ซ่อมท่อ", category: "ซ่อม", date: "2/10/2022" },
    { emp_name: "Napasin Saengthong", title: "ซ่อมท่อ", category: "ซ่อม", date: "2/10/2022" },
    { emp_name: "Napasin Saengthong", title: "ซ่อมท่อ", category: "ซ่อม", date: "2/10/2022" },
    { emp_name: "Napasin Saengthong", title: "ซ่อมท่อ", category: "ซ่อม", date: "2/10/2022" },
    { emp_name: "Napasin Saengthong", title: "ซ่อมท่อ", category: "ซ่อม", date: "2/10/2022" },
    { emp_name: "Napasin Saengthong", title: "ซ่อมท่อ", category: "ซ่อม", date: "2/10/2022" },
    { emp_name: "Napasin Saengthong", title: "ซ่อมท่อ", category: "ซ่อม", date: "2/10/2022" },
    { emp_name: "Napasin Saengthong", title: "ซ่อมท่อ", category: "ซ่อม", date: "2/10/2022" },
    { emp_name: "Napasin Saengthong", title: "ซ่อมท่อ", category: "ซ่อม", date: "2/10/2022" },
  ];
  return (
    <div className="flex flex-wrap bg-gray-100 w-full h-screen">
      <Sidebar />
      <div className="flex-1 flex-col">
        <Navbar />
        <div className="p-5">
          <div className="text-sky-700 font-bold text-2xl pb-3">Dashboard</div>
          <span className="bg-white rounded-md px-2 py-1 bg-green-200">
            2 ตุลาคม
          </span>
          <hr className="my-3" />
          <div className="my-3">
            <div className="mb-3">
              <button className="text-sky-700 font-semibold p-2 bg-white rounded-md">
                Current
              </button>
              <button className="text-sky-700 font-semibold p-2 bg-white rounded-md ml-3">
                New
              </button>
            </div>
            <div className="bg-white shadow-md rounded overflow-hidden">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-sky-200">
                    <th className="text-start text-sky-700 py-3 px-6">
                      Employer's Name
                    </th>
                    <th className="text-start text-sky-700 py-3 px-6">Title</th>
                    <th className="text-start text-sky-700 py-3 px-6">
                      Category
                    </th>
                    <th className="text-start text-sky-700 py-3 px-6">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {JobDescription.map((job,i)=>(
                    <tr className="hover:bg-gray-200 cursor-pointer">
                    <td className="py-3 px-6">{job.emp_name}</td>
                    <td className="py-3 px-6">{job.title}</td>
                    <td className="py-3 px-6">
                      <span className="bg-red-200 rounded-md p-1">{job.category}</span>
                    </td>
                    <td className="py-3 px-6">{job.date}</td>
                  </tr>
                  ))}
                </tbody>
              </table>
              <div className="w-full h-10 bg-sky-200 "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
