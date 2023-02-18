import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { getAllJobs } from "../services/JobServices";

const AdminTable = () => {
  const [cookies] = useCookies(["token"]);
  const router = useRouter();
  const { status = "new" } = router.query;

  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState({
    page: 1,
    totalDocs: 0,
    limit: 0,
    totalPages: 0,
  });
  const [sortList, setSortList] = useState([]);
  const [query, setQuery] = useState({});

  const ButtonStyles = (statusNow: string) =>
    `${
      status === statusNow
        ? "bg-sky-500 text-white"
        : "bg-white text-sky-700 hover:bg-sky-100"
    } duration-200 font-semibold p-2 rounded-md`;

  const handleFirstPage = (page: number) => {
    if (page <= 1) return;
    setState({ ...state, page: page - 1 });
  };

  const handleNextPage = (page: number) => {
    if (page >= state.totalPages) return;
    setState({ ...state, page: page + 1 });
  };

  const showLastDocOfPage = () => {
    if (state.totalDocs < state.limit * state.page) return state.totalDocs;
    return state.limit * state.page;
  };

  const showTotalDocs = state.totalDocs;

  const showFirstDocOfPage =
    state.totalDocs === 0 ? 0 : state.limit * (state.page - 1) + 1;

  const createPagination = () => {
    const paginationArray = [];
    for (let i = 1; i <= state.totalPages; i++) {
      paginationArray.push(i);
    }
    return paginationArray;
  };

  const pushStatusNew = () => {
    router.push("?status=new");
  };

  const pushStatusPending = () => {
    router.push("?status=pending");
  };

  const pushGoToEachJob = (id: string) => {
    router.push(`/jobdetails/${id}`);
  };

  if (!allJobs) return null;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data, request } = await getAllJobs(
        status,
        state.page,
        cookies.token,
        query
      );
      console.log("req", request);
      setAllJobs(data.docs);
      setState({
        ...state,
        totalDocs: data.totalDocs,
        limit: data.limit,
        totalPages: data.totalPages,
      });
      setSortList(Object.keys(data.docs[0]));
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!status) return;
    fetchData();
    console.log("query", query);
  }, [state.page, status, query]);

  const HeaderTableStyles = "text-start text-sky-700 py-3 min-w-[200px]";

  const LoadingComponent = (
    <div className="flex justify-center items-center w-full h-40 bg-white rounded-md">
      <span className="h-20 w-20 block rounded-full border-4 border-sky-400 border-t-white animate-spin"></span>
    </div>
  );

  const ShowingComponent = (
    // Header table area
    <div className="bg-white rounded-md overflow-hidden">
      <div className="overflow-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="border-b-2 border-sky-300">
              <th className={`${HeaderTableStyles} pl-2 md:pl-4`}>
                Employer's Name
              </th>
              <th className={HeaderTableStyles}>Title</th>
              <th className={HeaderTableStyles}>Category</th>
              <th className={HeaderTableStyles}>Date</th>
            </tr>
          </thead>
          {/* Showing jobs area */}
          <tbody className="divide-y">
            {allJobs.map((job) => {
              return (
                <tr
                  className="hover:bg-gray-200 duration-100 cursor-pointer"
                  key={job._id}
                  onClick={() => pushGoToEachJob(job._id)}
                >
                  <td className="py-3 pl-2 md:pl-4">{job.fullname}</td>
                  <td className="py-3">{job.title}</td>
                  <td className="py-3">{job.category.name}</td>
                  <td className="py-3">{job.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Footer area */}
      <div className="w-full border-sky-300 border-t-2">
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <div className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </div>
            <div className="ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </div>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{showFirstDocOfPage}</span> to{" "}
                <span className="font-medium">{showLastDocOfPage()}</span> of{" "}
                <span className="font-medium">{showTotalDocs}</span> results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <div
                  className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 cursor-pointer"
                  onClick={() => handleFirstPage(state.page)}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" />
                </div>

                {createPagination().map((number) => {
                  return (
                    <div
                      aria-current="page"
                      className={`relative inline-flex items-center border ${
                        state.page === number
                          ? "border-indigo-500 bg-indigo-50 z-10"
                          : "border-gray-300 bg-white cursor-pointer"
                      } px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20`}
                      onClick={() => setState({ ...state, page: number })}
                      key={number}
                    >
                      {number}
                    </div>
                  );
                })}
                <div
                  className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 cursor-pointer"
                  onClick={() => handleNextPage(state.page)}
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
  );

  return (
    <>
      <div className="my-3">
        <div className="flex mb-3 justify-between">
          <div className="space-x-2">
            <button className={ButtonStyles("new")} onClick={pushStatusNew}>
              New
            </button>
            <button
              className={ButtonStyles("pending")}
              onClick={pushStatusPending}
            >
              Pending
            </button>
          </div>
          <div className="flex">
            <div>
              <span>Sort: </span>
              <select
                name=""
                id=""
                onChange={(e) => setQuery({ ...query, sort: e.target.value })}
              >
                {sortList.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <span>Order</span>
              <select
                name=""
                id=""
                onChange={(e) => setQuery({ ...query, order: e.target.value })}
              >
                <option value="asc">asc</option>
                <option value="desc">desc</option>
              </select>
            </div>
          </div>
        </div>
        {isLoading ? LoadingComponent : ShowingComponent}
      </div>
    </>
  );
};

export default AdminTable;
