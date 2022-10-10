import { NextPage } from "next";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const JobDescriptionPage: NextPage = () => {
  return (
    <div className="flex flex-wrap bg-gray-100 w-full">
      <Sidebar />
      <div className="flex-1 flex-col">
        <Navbar />
        <div className="p-5">
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionPage;
