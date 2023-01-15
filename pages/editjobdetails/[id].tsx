import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { dateFormat, editJob, getJob } from "../../services/jobServices";

const EditDescriptionJobPage: NextPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const router = useRouter();
  const { id } = router.query;

  const [jobData, setJobData] = useState<EditableJob>({
    title: "",
    detail: "",
    category: "",
    wage: "",
    note: "",
    location: "",
    deadline: "",
  });

  const handleChange = (e: any) => {
    setJobData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;
    await editJob(id as string, jobData, cookies.token);
    router.push(`/jobdetails/${id}`);
  };

  useEffect(() => {
    if (id) {
      getJob(id, cookies.token).then((res) => {
        setJobData(res.data);
      });
    }
  }, [router]);

  return (
    <div>
      <div className="text-sky-700 font-bold text-2xl pb-3">Job details</div>
      <span className="rounded-md px-2 py-1 bg-green-200">
        {dateFormat(new Date())}
      </span>
      <hr className="my-3" />

      <form onSubmit={handleEdit}>
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
              name="category"
              onChange={handleChange}
              value={jobData.category}
              required
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
          <div className="sm:grid sm:grid-cols-5">
            <p className="font-bold col-span-1">Deadline </p>
            <input
              type="date"
              className="w-full bg-gray-200 rounded-md p-1 col-span-4"
              value={jobData.deadline}
              name="deadline"
              onChange={handleChange}
              //   required
            />
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <button
            className="bg-red-500 rounded-md p-2 text-white"
            onClick={() => router.push(`/jobdetails/${id}`)} // Can't work
          >
            Cancel
          </button>
          <button
            className="bg-yellow-500 rounded-md py-2 px-3 text-white"
            type="submit"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDescriptionJobPage;
