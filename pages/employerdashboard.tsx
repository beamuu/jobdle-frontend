import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const EmployerDashBoard: NextPage = () => {
  const jobData = [
    {
      title: "",
      detail: "",
      category: "",
      wage: "",
      note: "",
      location: "",
    },
    {
      title: "",
      detail: "",
      category: "",
      wage: "",
      note: "",
      location: "",
    },
    {
      title: "",
      detail: "",
      category: "",
      wage: "",
      note: "",
      location: "",
    },
  ];

  const [count, setCount] = useState(0);
  const router = useRouter();

  const handleCreateJob = () => {
    router.push("/filldetailsjob");
  };

  return count === 0 ? (
    <div>
      <div className="text-sky-700 font-bold text-2xl pb-3">งานที่จ้าง</div>
      <span className="rounded-md px-2 py-1 bg-green-200">2 ตุลาคม</span>
      <hr className="my-3" />
      <div className="w-full h-full flex justify-center">
        <div>
          <span>You do not have any employment </span>
          <button
            className="bg-green-500 p-2 rounded-md text-white"
            onClick={handleCreateJob}
          >
            Create One !
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="text-sky-700 font-bold text-2xl pb-3">งานที่จ้าง</div>
      <span className="rounded-md px-2 py-1 bg-green-200">2 ตุลาคม</span>
      <hr className="my-3" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {jobData.map((detail) => (
          <></>
        ))}
        <div className="bg-white rounded-md px-3 py-2 shadow cursor-pointer space-y-1">
          <p className="font-bold">Title</p>
          <div className="block">
            Category: <span className="rounded-md px-2 bg-green-200">ซ่อม</span>
          </div>
          <div className="">
            Date <span className="rounded-md px-2 bg-gray-200">27/11/2011</span>
          </div>
          <div className="">
            Wage <span className="rounded-md px-2 bg-gray-200">500</span>
          </div>
          <div className="">
            Status{" "}
            <span className="rounded-md px-2 bg-orange-200">Planing...</span>
          </div>
          <span className="flex justify-end text-gray-300">
            Click for details
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashBoard;
