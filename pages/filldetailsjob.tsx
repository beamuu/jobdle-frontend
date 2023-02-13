import axios from "axios";
import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getAllCategories } from "../services/CategoryServices";
import { dateFormat, postJob } from "../services/jobServices";

const FillDescriptionJobPage: NextPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const [jobData, setJobData] = useState({
    title: "",
    detail: "",
    category: {},
    wage: "",
    note: "",
    location: "",
    deadline: "",
  });

  const fetchAllCategories = async () => {
    const res = await getAllCategories(cookies.token);
    setCategories(res.data);
  };

  const handleChange = (e: any) => {
    setJobData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePost = async (e: FormEvent) => {
    e.preventDefault();
    const jobRequestObject = {
      ...jobData,
      category: JSON.parse(jobData.category),
    };
    try {
      const res = await postJob(jobRequestObject, cookies.token);
      router.push(`jobdetails/${res.data._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <div>
      <div className="text-sky-700 font-bold text-2xl pb-3">Job details</div>
      <span className="rounded-md px-2 py-1 bg-green-200">
        {dateFormat(new Date())}
      </span>
      <hr className="my-3" />

      <form onSubmit={handlePost}>
        <div className="bg-white p-4 rounded-md space-y-2">
          <div className="sm:grid sm:grid-cols-5">
            <p className="font-bold col-span-1">Title </p>
            <input
              type="text"
              className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 col-span-4"
              value={jobData.title}
              name="title"
              onChange={handleChange}
              // required
            />
          </div>
          <div className="sm:grid sm:grid-cols-5">
            <p className="font-bold col-span-1">Detail </p>
            <textarea
              className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 col-span-4"
              rows={10}
              value={jobData.detail}
              name="detail"
              onChange={handleChange}
              // required
            />
          </div>
          <div className="sm:grid sm:grid-cols-5">
            <p className="font-bold col-span-1">Category </p>
            <select
              className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 cursor-pointer col-span-4"
              name="category"
              onChange={handleChange}
              // required
            >
              <option value="">โปรดเลือก</option>
              {categories.map((category) => {
                return (
                  <option value={JSON.stringify(category)}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="sm:grid sm:grid-cols-5">
            <p className="font-bold col-span-1">Wage </p>
            <input
              type="number"
              className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 col-span-4"
              value={jobData.wage}
              name="wage"
              onChange={handleChange}
              // required
            />
          </div>
          <div className="sm:grid sm:grid-cols-5">
            <p className="font-bold col-span-1">Note </p>
            <input
              type="text"
              className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 col-span-4"
              value={jobData.note}
              name="note"
              onChange={handleChange}
            />
          </div>
          <div className="sm:grid sm:grid-cols-5">
            <p className="font-bold col-span-1">Location </p>
            <input
              type="text"
              className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 col-span-4"
              value={jobData.location}
              name="location"
              onChange={handleChange}
              // required
            />
          </div>
          <div className="sm:grid sm:grid-cols-5">
            <p className="font-bold col-span-1">Deadline </p>
            <input
              type="date"
              className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 col-span-4"
              value={jobData.deadline}
              name="deadline"
              onChange={handleChange}
              // required
            />
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <button
            className="bg-sky-500 rounded-md p-2 text-white"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default FillDescriptionJobPage;
