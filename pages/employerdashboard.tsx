import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Header from "../components/Header";
import { getUserJobs } from "../services/jobServices";
import { dateFormat } from "../services/jobServices";

const EmployerDashBoardPage: NextPage = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const [userJobs, setUserJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // const getUserJobs = async () => {
  //   setLoading(true);
  //   const res = await axios.get(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/work`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${cookies.token}`,
  //       },
  //     }
  //   );
  //   setUserJobs(res.data.docs);
  //   console.log('userjobs', res)
  //   setLoading(false);
  // };

  useEffect(() => {
    getUserJobs(cookies.token).then((res) => {
      setLoading(true);
      setUserJobs(res.data.docs);
      setLoading(false);
    });
  }, []);

  const router = useRouter();

  const handleCreateJob = () => {
    router.push("/filldetailsjob");
  };

  if (!userJobs) return null;

  if (loading) return null;

  return userJobs.length === 0 ? (
    <>
      <Header title="Employment" />
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
      <Header title="Employment" />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {userJobs.map((jobDetail) => (
          <div
            className="bg-white rounded-md px-3 py-2 cursor-pointer hover:shadow-lg"
            onClick={() => router.push(`jobdetails/${jobDetail?._id}`)}
          >
            <div id="job-header" className="">
              <span>{jobDetail.title}</span>
            </div>
            <hr />
            <div id="p-5" className="px-5 py-3">
              <div>
                <span className="text-gray-400">Category: </span>
                <span>{jobDetail.category.name}</span>
              </div>
              <div>
                <span className="text-gray-400">Wage: </span>
                <span>{jobDetail?.wage}</span>
              </div>
            </div>
            <div
              id="job-footer"
              className="flex justify-between items-center pt-2"
            >
              <div className="text-sm">
                <span className="text-gray-400">Deadline: </span>
                <span>{jobDetail.deadline}</span>
              </div>
              <span
                className={`${
                  jobDetail.status === "new" ? "bg-green-500" : "bg-yellow-500"
                } px-5 rounded-full text-white`}
              >
                <span className="uppercase">{jobDetail.status}</span>
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
