import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import Navbar from "./Navbar";

const Dashboard = () => {
  const JobDescription = [
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
    },
  ];
  return (
    <div className="flex-1 p-5">
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
        <div className="bg-white shadow-md rounded overflow-hidden text-[8px] sm:text-base">
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="border-b-2 border-sky-300 ">
                <th className="text-start text-sky-700 py-3 px-2 sm:px-6">
                  Employer's Name
                </th>
                <th className="text-start text-sky-700 py-3 px-2 sm:px-6">
                  Title
                </th>
                <th className="text-start text-sky-700 py-3 px-2 sm:px-6">
                  Category
                </th>
                <th className="text-start text-sky-700 py-3 px-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {JobDescription.map((job, i) => (
                <tr className="hover:bg-gray-200 cursor-pointer">
                  <td className="py-3 px-2 sm:px-6">{job.emp_name}</td>
                  <td className="py-3 px-2 sm:px-6">{job.title}</td>
                  <td className="py-3 px-2 sm:px-6">
                    <span className="bg-red-200 rounded-md px-2 sm:px-6">
                      {job.category}
                    </span>
                  </td>
                  <td className="py-3 px-2 sm:px-6">{job.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full border-sky-300 border-t-2">
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <a
                  href="#"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Next
                </a>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">10</span> of{" "}
                    <span className="font-medium">97</span> results
                  </p>
                </div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      aria-current="page"
                      className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                    >
                      2
                    </a>
                    <a
                      href="#"
                      className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
                    >
                      3
                    </a>
                    <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                      ...
                    </span>
                    <a
                      href="#"
                      className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
                    >
                      8
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                    >
                      9
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                    >
                      10
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon className="h-5 w-5" />
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
