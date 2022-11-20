import axios from "axios";
import { NextPage } from "next";
import { useState } from "react";
import { useCookies } from "react-cookie";

const FillDescriptionJobPage: NextPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [jobData, setJobData] = useState({
    title: "",
    detail: "",
    category: "",
    wage: "",
    note: "",
    location: "",
    date: new Date(),
  });

  const currentDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    let currentDate = `${dd}/${mm}/${yyyy}`;
    return currentDate;
  };

  const handleChange = (e: any) => {
    setJobData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleJobData = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/work`,
        { ...jobData, date: new Date() },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="text-sky-700 font-bold text-2xl pb-3">Job details</div>
      <span className="rounded-md px-2 py-1 bg-green-200">{currentDate()}</span>
      <hr className="my-3" />

      <form onSubmit={handleJobData}>
        <div className="bg-white p-4 rounded-md space-y-2">
          <div className="sm:grid sm:grid-cols-5">
            <p className="font-bold col-span-1">Title </p>
            <input
              type="text"
              className="w-full bg-gray-200 rounded-md p-1 sm:col-span-4 required:border-red-500"
              value={jobData.title}
              name="title"
              onChange={handleChange}
              required
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
              required
            />
          </div>
          <div className="sm:grid sm:grid-cols-5">
            <p className="font-bold col-span-1">Category </p>
            <select
              className="w-full bg-gray-200 rounded-md p-1 col-span-4 cursor-pointer"
              required
              name="category"
              onChange={handleChange}
            >
              <option value="">โปรดเลือก</option>
              <option value="ซ่อม">ซ่อม</option>
              <option value="บำรุง">บำรุง</option>
            </select>
          </div>
          <div className="sm:grid sm:grid-cols-5">
            <p className="font-bold col-span-1">Wage </p>
            <input
              type="number"
              className="w-full bg-gray-200 rounded-md p-1 col-span-4"
              value={jobData.wage}
              name="wage"
              onChange={handleChange}
              required
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
              required
            />
          </div>
        </div>
        <div className="flex justify-center mt-2">
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
