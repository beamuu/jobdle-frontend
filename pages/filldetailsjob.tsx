import { NextPage } from "next";
import { useState } from "react";

const FillDescriptionJobPage: NextPage = () => {
  const [jobData, setJobData] = useState({
    title: "",
    detail: "",
    category: "",
    wage: "",
    note: "",
    location: "",
  });

  const handleChange = (e: any) => {
    setJobData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleJobData = () => {
    console.log(jobData);
  };
  return (
    <div>
      <div className="text-sky-700 font-bold text-2xl pb-3">Job details</div>
      <span className="rounded-md px-2 py-1 bg-green-200">2 ตุลาคม</span>
      <hr className="my-3" />
      <div className="bg-white p-5 rounded-md space-y-2">
        <div className="sm:grid sm:grid-cols-5">
          <p className="font-bold col-span-1">Title </p>
          <input
            type="text"
            className="w-full bg-gray-200 rounded-md p-1 sm:col-span-4"
            value={jobData.title}
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <p className="font-bold col-span-1">Detail </p>
          <textarea
            className="w-full bg-gray-200 rounded-md p-1 col-span-4"
            rows={10}
            value={jobData.detail}
            name="detail"
            onChange={handleChange}
          />
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <p className="font-bold col-span-1">Category </p>
          <input
            type="text"
            className="w-full bg-gray-200 rounded-md p-1 col-span-4"
            value={jobData.category}
            name="category"
            onChange={handleChange}
          />
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <p className="font-bold col-span-1">Wage </p>
          <input
            type="number"
            className="w-full bg-gray-200 rounded-md p-1 col-span-4"
            value={jobData.wage}
            name="wage"
            onChange={handleChange}
          />
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <p className="font-bold col-span-1">Note </p>
          <input
            type="text"
            className="w-full bg-gray-200 rounded-md p-1 col-span-4"
            value={jobData.note}
            name="note"
            onChange={handleChange}
          />
        </div>
        <div className="sm:grid sm:grid-cols-5">
          <p className="font-bold col-span-1">Location </p>
          <input
            type="text"
            className="w-full bg-gray-200 rounded-md p-1 col-span-4"
            value={jobData.location}
            name="location"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-sky-500 rounded-md p-2 text-white"
            onClick={handleJobData}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default FillDescriptionJobPage;
