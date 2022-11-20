import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { UserProvider } from "../contexts/User";

type Job = {
  category: string;
  detail: string;
  fullname: string;
  location: string;
  note: string;
  title: string;
  userId: string;
  wage: string;
  _id: string;
  date: string;
};

const Dashboard = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const router = useRouter();
  const query = router.query;
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

  const getAllJobs = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/work${
        query.status ? `?status=${query.status}` : ""
      }`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    );
    setAllJobs(res.data);
  };

  if (!allJobs) return null;

  useEffect(() => {
    try {
      getAllJobs();
    } catch (err) {
      console.error(err);
    }
  }, [query.status]);

  return (
    <UserProvider>
      <div>
        <div className="text-sky-700 font-bold text-2xl pb-3">Dashboard</div>
        <span className="bg-white rounded-md px-2 py-1 bg-green-200">
          2 ตุลาคม
        </span>
        <hr className="my-3" />
        <div className="my-3">
          <div className="mb-3">
            <button
              className="text-sky-700 font-semibold p-2 bg-white rounded-md"
              onClick={() => router.push("/dashboard")}
            >
              Current
            </button>
            <button
              className="text-sky-700 font-semibold p-2 bg-white rounded-md ml-3"
              onClick={() => router.push("?status=new")}
            >
              New
            </button>
          </div>
          <div className="bg-white shadow rounded-md overflow-hidden">
            <div className="overflow-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="border-b-2 border-sky-300">
                    <th className="text-start text-sky-700 py-3 pl-2 md:pl-4 min-w-[300px]">
                      Employer's Name
                    </th>
                    <th className="text-start text-sky-700 py-3 min-w-[200px]">
                      Title
                    </th>
                    <th className="text-start text-sky-700 py-3 min-w-[100px]">
                      Category
                    </th>
                    <th className="text-start text-sky-700 py-3 min-w-[100px]">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {allJobs.map((job) => (
                    <tr
                      className="hover:bg-gray-200 cursor-pointer"
                      key={job._id}
                      onClick={() => {
                        router.push({
                          pathname: "/jobdetails",
                          query: { id: job._id, status: "new" },
                        });
                      }}
                    >
                      <td className="py-3 pl-2 md:pl-4">{job.fullname}</td>
                      <td className="py-3">{job.title}</td>
                      <td className="py-3">
                        <span className="bg-red-200 rounded-md px-2">
                          {job.category}
                        </span>
                      </td>
                      <td className="py-3">{job.date}</td>
                    </tr>
                  ))}
                  {/* For test  */}
                  {/* {JobDescription.map((job) => (
                    <tr className="hover:bg-gray-200 cursor-pointer">
                      <td className="py-3 pl-2 md:pl-4">{job.emp_name}</td>
                      <td className="py-3">{job.title}</td>
                      <td className="py-3">
                        <span className="bg-red-200 rounded-md px-2">
                          {job.category}
                        </span>
                      </td>
                      <td className="py-3">{job.date}</td>
                    </tr>
                  ))} */}
                </tbody>
              </table>
            </div>
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
    </UserProvider>
  );
};

export default Dashboard;
