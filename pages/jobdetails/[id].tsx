import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useUser } from "../../contexts/User";
import {
  dateFormat,
  deleteJob,
  getJob,
  manageJob,
} from "../../services/jobServices";

// type JobDetail = {
//   category: string;
//   detail: string;
//   fullname: string;
//   location: string;
//   note: string;
//   title: string;
//   userId: string;
//   wage: string;
//   _id: string;
// };

const JobDetailsPage: NextPage = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const router = useRouter();
  const [job, setJob] = useState<Job>();
  const { id } = router.query;

  const { userData } = useUser();

  // const getJob = async (id: any) => {
  //   try {
  //     const res = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/work/${id}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${cookies.token}`,
  //         },
  //       }
  //     );
  //     setJob(res.data);
  //   } catch (err) {
  //     console.log(err);
  //     router.push("/dashboard");
  //   }
  // };

  // const deleteJob = async () => {
  //   try {
  //     const res = await axios.delete(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/work/${id}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${cookies.token}`,
  //         },
  //       }
  //     );
  //     router.push("/dashboard");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const editJob = () => {
    router.push(`/editjobdetails/${id}`);
  };

  useEffect(() => {
    if (id) {
      getJob(id, cookies.token).then((res) => {
        setJob(res.data);
      });
    }
  }, [router]);

  const handleDelete = () => {
    try {
      deleteJob(id, cookies.token);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const handleManageJob = () => {
    try {
      manageJob(id, cookies.token);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  if (!job) return null;

  if (!userData) return null;

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
      description: job.deadline,
    },
    {
      title: "Status",
      description: job.status,
    },
  ];

  return (
    <div>
      <div className="text-sky-700 font-bold text-2xl pb-3">Job details</div>
      <span className="rounded-md px-2 py-1 bg-green-200">
        {dateFormat(new Date())}
      </span>
      <hr className="my-3" />
      <div className="bg-white px-5 py-2 rounded-md divide-y">
        {jobDetails.map((detail) => (
          <div className="items-center sm:grid sm:grid-cols-5 py-1">
            <p className="font-bold col-span-1">{detail.title} </p>
            <p className="w-full sm:col-span-4">{detail.description}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="space-x-2">
          <button
            className="bg-yellow-500 rounded-md p-2 text-white w-20 mt-2"
            onClick={editJob}
          >
            Edit
          </button>
          <button
            className="bg-red-500 rounded-md p-2 text-white w-20 mt-2"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
        {userData.role === "admin" ? (
          <div>
            <button
              className="bg-sky-500 rounded-md p-2 text-white w-20 mt-2"
              onClick={handleManageJob}
            >
              Manage
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default JobDetailsPage;
