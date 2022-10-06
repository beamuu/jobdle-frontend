import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <div className="flex flex-wrap bg-gray-100 w-full h-screen">
      <Sidebar />
      <div className="w-10/12 flex-col">
        <Navbar />
        <div className="p-5">
          <div className="text-sky-700 font-bold text-2xl pb-3">Dashboard</div>
          <span className="bg-white rounded-md px-2 py-1 bg-green-200">2 ตุลาคม</span>
          <hr className="my-3" />
          <div className="my-3">
            <div className="mb-3">
              <button className="text-sky-700 font-semibold p-2 bg-white rounded-md">
                Current
              </button>
              <button className="text-sky-700 font-semibold p-2 bg-white rounded-md ml-3">
                New
              </button>
            </div>
            <div className="bg-white shadow-md rounded overflow-hidden">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-sky-200">
                    <th className="text-start text-sky-800 py-3 px-6">Employer's Name</th>
                    <th className="text-start text-sky-800 py-3 px-6">Title</th>
                    <th className="text-start text-sky-800 py-3 px-6">Category</th>
                    <th className="text-start text-sky-800 py-3 px-6">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-gray-200 cursor-pointer">
                    <td className="py-3 px-6">NAPASIN SAENGTHONG</td>
                    <td className="py-3 px-6">ซ่อมท่อ</td>
                    <td className="py-3 px-6">
                      <span className="bg-red-200 rounded-md p-1">ซ่อม</span>
                    </td>
                    <td className="py-3 px-6">
                      2 ตุลาคม 2565
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-200 cursor-pointer">
                    <td className="py-3 px-6">NARUKABET SAENGTHONG</td>
                    <td className="py-3 px-6">ซ่อมท่อ</td>
                    <td className="py-3 px-6">
                      <span className="bg-red-200 rounded-md p-1">ซ่อม</span>
                    </td>
                    <td className="py-3 px-6">
                      2 ตุลาคม 2565
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-200 cursor-pointer">
                    <td className="py-3 px-6">NUTCHANON CHANWANDIDI</td>
                    <td className="py-3 px-6">ซ่อมท่อ</td>
                    <td className="py-3 px-6">
                      <span className="bg-red-200 rounded-md p-1">ซ่อม</span>
                    </td>
                    <td className="py-3 px-6">
                      2 ตุลาคม 2565
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
