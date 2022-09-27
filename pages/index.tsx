import type { NextPage } from "next";
import Navbar from "../components/navbar";

const Home: NextPage = () => {
  return (
    <div className="flex flex-wrap bg-gray-100 w-full h-screen">
      <Navbar />
      <div className="w-9/12">
        <div className="p-4 text-gray-500">Content here...</div>
      </div>
    </div>
  );
};

export default Home;
