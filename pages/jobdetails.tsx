import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

type JobDetail = {
  category: string;
  detail: string;
  fullname: string;
  location: string;
  note: string;
  title: string;
  userId: string;
  wage: string;
  _id: string;
};

const JobDetailsPage: NextPage = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const router = useRouter();
  const [job, setJob] = useState<JobDetail>();
  const { id } = router.query;

  const getJob = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/work/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    );

    setJob(res.data);
  };

  const deleteJob = () => {};
  const editJob = () => {};

  useEffect(() => {
    try {
      getJob();
    } catch (err) {
      console.error(err);
    }
  }, []);

  if (job === undefined) return null;

  const jobDetails = [
    {
      title: "Employer",
      description: job.fullname,
    },
    {
      title: "Title",
      description: job.title,
    },
    {
      title: "Detail",
      description: job.detail,
    },
    {
      title: "Category",
      description: job.category,
    },
    {
      title: "Wage",
      description: job.wage,
    },
    {
      title: "Note",
      description: job.note,
    },
    {
      title: "Location",
      description: job.location,
    },
    {
      title: "Date",
      description: "27/11/2022",
    },
    {
      title: "Status",
      description: "Planing",
    },
  ];

  return (
    <div>
      <div className="text-sky-700 font-bold text-2xl pb-3">Job details</div>
      <span className="rounded-md px-2 py-1 bg-green-200">2 ตุลาคม</span>
      <hr className="my-3" />
      <div className="bg-white px-5 py-2 rounded-md divide-y">
        {jobDetails.map((detail) => (
          <div className="items-center sm:grid sm:grid-cols-5">
            <p className="font-bold col-span-1">{detail.title} </p>
            <p className="w-full p-1 sm:col-span-4">{detail.description}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          className="bg-yellow-500 rounded-md p-2 text-white w-20 mt-2"
          onClick={editJob}
        >
          Edit
        </button>
        <button
          className="bg-red-500 rounded-md p-2 text-white w-20 mt-2"
          onClick={deleteJob}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobDetailsPage;
