import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { UserProvider } from "../contexts/User";
import { getAllJobs } from "../services/jobServices";
import { dateFormat } from "../services/jobServices";
import Header from "./Header";

const Dashboard = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [data, setData] = useState({
    page: 1,
    totalDocs: 0,
    limit: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { status = "new" } = router.query;

  const handlePreviousPage = (page: any) => {
    if (page <= 1) return;
    setData({ ...data, page: page - 1 });
  };

  const handleNextPage = (page: any) => {
    if (page >= data.totalPages) return;
    setData({ ...data, page: page + 1 });
  };

  const handleLastPage = () => {
    if (data.totalDocs < data.limit * data.page) return data.totalDocs;
    return data.limit * data.page;
  };

  const createArrayPage = () => {
    console.log(data);
    const res = [];
    for (let i = 1; i <= data.totalPages; i++) {
      res.push(i);
    }
    console.log("createArray", res);
    return res;
  };

  if (!allJobs) return null;

  useEffect(() => {
    if (!status) return;
    getAllJobs(status, data.page, cookies.token)
      .then((res) => {
        setIsLoading(true);
        setAllJobs(res.data.docs);
        setData({
          ...data,
          totalDocs: res.data.totalDocs,
          limit: res.data.limit,
          totalPages: res.data.totalPages,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data.page, status]);

  return (
    <div>
      <Header title="Dashboard" />
      <div className="my-3">
        <div className="mb-3 space-x-2">
          <button
            className={`${
              status === "new"
                ? "bg-sky-500 text-white"
                : "bg-white text-sky-700 hover:bg-sky-100"
            } duration-200 font-semibold p-2 rounded-md`}
            onClick={() => router.push("?status=new")}
          >
            New
          </button>
          <button
            className={`${
              status === "pending"
                ? "bg-sky-500 text-white"
                : "bg-white text-sky-700 hover:bg-sky-100"
            } duration-200 font-semibold p-2 rounded-md`}
            onClick={() => router.push("?status=pending")}
          >
            Pending
          </button>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-40 bg-white rounded-md">
            <span className="h-20 w-20 block rounded-full border-4 border-sky-400 border-t-white animate-spin"></span>
          </div>
        ) : (
          <div className="bg-white rounded-md overflow-hidden">
            <div className="overflow-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="border-b-2 border-sky-300">
                    <th className="text-start text-sky-700 py-3 pl-2 md:pl-4 min-w-[200px]">
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
                  {allJobs.map((job) => {
                    return (
                      <tr
                        className="hover:bg-gray-200 duration-100 cursor-pointer"
                        key={job._id}
                        onClick={() => {
                          router.push(`/jobdetails/${job._id}`);
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
                    );
                  })}
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
                      Showing{" "}
                      <span className="font-medium">
                        {data.totalDocs === 0
                          ? 0
                          : data.limit * (data.page - 1) + 1}
                      </span>{" "}
                      to <span className="font-medium">{handleLastPage()}</span>{" "}
                      of <span className="font-medium">{data.totalDocs}</span>{" "}
                      results
                    </p>
                  </div>
                  <div>
                    <nav
                      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                      aria-label="Pagination"
                    >
                      <div
                        className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 cursor-pointer"
                        onClick={() => handlePreviousPage(data.page)}
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon className="h-5 w-5" />
                      </div>

                      {createArrayPage().map((number) => {
                        console.log(data);
                        return (
                          <div
                            aria-current="page"
                            className={`relative inline-flex items-center border ${
                              data.page === number
                                ? "border-indigo-500 bg-indigo-50 z-10"
                                : "border-gray-300 bg-white cursor-pointer"
                            } px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20`}
                            onClick={() => setData({ ...data, page: number })}
                          >
                            {number}
                          </div>
                        );
                      })}
                      <div
                        className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 cursor-pointer"
                        onClick={() => handleNextPage(data.page)}
                      >
                        <p className="sr-only">Next</p>
                        <ChevronRightIcon className="h-5 w-5" />
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* <div className="bg-white shadow rounded-md overflow-hidden">
          <div className="overflow-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="border-b-2 border-sky-300">
                  <th className="text-start text-sky-700 py-3 pl-2 md:pl-4 min-w-[200px]">
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
                {allJobs.map((job) => {
                  return (
                    <tr
                      className="hover:bg-gray-200 cursor-pointer"
                      key={job._id}
                      onClick={() => {
                        router.push(`/jobdetails/${job._id}`);
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
                  );
                })}
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
                    Showing{" "}
                    <span className="font-medium">
                      {data.limit * (data.page - 1) + 1}
                    </span>{" "}
                    to <span className="font-medium">{handleLastPage()}</span>{" "}
                    of <span className="font-medium">{data.totalDocs}</span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <div
                      className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 cursor-pointer"
                      onClick={() => handlePreviousPage(data.page)}
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon className="h-5 w-5" />
                    </div>

                    {createArrayPage().map((number) => {
                      console.log(data);
                      return (
                        <div
                          aria-current="page"
                          className={`relative inline-flex items-center border ${
                            data.page === number
                              ? "border-indigo-500 bg-indigo-50 z-10"
                              : "border-gray-300 bg-white cursor-pointer"
                          } px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20`}
                          onClick={() => setData({ ...data, page: number })}
                        >
                          {number}
                        </div>
                      );
                    })}
                    <div
                      className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 cursor-pointer"
                      onClick={() => handleNextPage(data.page)}
                    >
                      <p className="sr-only">Next</p>
                      <ChevronRightIcon className="h-5 w-5" />
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
