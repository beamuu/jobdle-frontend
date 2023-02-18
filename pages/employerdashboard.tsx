import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { getUserJobs } from "../services/JobServices";
import { dateFormat } from "../services/UtilsServies";

const EmployerDashBoardPage: NextPage = () => {
  const [cookies] = useCookies(["token"]);
  const [userJobs, setUserJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await getUserJobs(cookies.token);
      setUserJobs(data.docs);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const router = useRouter();

  const handleCreateJob = () => {
    router.push("/filldetailsjob");
  };

  if (!userJobs) return null;

  if (loading) return null;

  return userJobs.length === 0 ? (
    <>
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
    </>
  ) : (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {userJobs.map((jobDetailsObject) => (
          <div
            className="bg-white rounded-md px-3 py-2 cursor-pointer hover:shadow-lg"
            onClick={() => router.push(`jobdetails/${jobDetailsObject?._id}`)}
          >
            <div id="job-header" className="text-lg">
              <span>{jobDetailsObject.title}</span>
            </div>
            <hr />
            <div id="p-5" className="px-5 py-3">
              <div>
                <span className="text-gray-400">Category: </span>
                <span>{jobDetailsObject.category.name}</span>
              </div>
              <div>
                <span className="text-gray-400">min-Wage: </span>
                <span>{jobDetailsObject?.category.minWage}</span>
              </div>
            </div>
            <div
              id="job-footer"
              className="flex justify-between items-center pt-2"
            >
              <div className="text-sm">
                <span className="text-gray-400">Deadline: </span>
                <span>{dateFormat(new Date(jobDetailsObject.deadline))}</span>
              </div>
              <span
                className={`${
                  jobDetailsObject.status === "new"
                    ? "bg-green-500"
                    : "bg-yellow-500"
                } px-5 rounded-full text-white`}
              >
                <span className="uppercase">{jobDetailsObject.status}</span>
              </span>
            </div>
          </div>
        ))}
        <div
          className="bg-gray-100 rounded-md px-3 py-2 shadow cursor-pointer space-y-1 flex justify-center items-center"
          onClick={handleCreateJob}
        >
          <span className="text-gray-600 text-4xl">+</span>
        </div>
      </div>
    </>
  );
};

export default EmployerDashBoardPage;
