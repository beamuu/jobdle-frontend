import {
  AdjustmentsVerticalIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
  ComputerDesktopIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Content } from "./Content";

const Sidebar: NextPage = () => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const btn = document.querySelector(".mobile-menu-button");
    const sidebar = document.querySelector(".sidebar");
  
    btn?.addEventListener("click", () => {
      sidebar?.classList.toggle("-translate-x-full")
      console.log("click");;
    });
  }, []);

  return (
    <div className="relative min-h-screen md:flex">
      {/* <!-- mobile menu bar --> */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-between md:hidden min-w-screen text-white">
        {/* <!-- logo --> */}
        <a href="#" className="block p-4 font-bold">
          Napasin Saengthong
        </a>
        {/* <!-- mobile menu button --> */}
        <button className="mobile-menu-button p-4 focus:outline-none ">
          <Bars3Icon className="w-5 h-5" />
        </button>
      </div>

      <div
        className={`${
          open ? "w-60" : "w-16"
        } sidebar bg-white p-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 duration-200`}
      >
        <div
          className={`${
            open
              ? "grid grid-cols-9 p-2 items-center"
              : "flex flex-col-reverse space-y-2 mb-2"
          }`}
        >
          <div className="col-span-2 flex justify-center">
            <div className="h-10 w-10 bg-gray-200 rounded-full flex justify-center items-center">
              <p>hi</p>
            </div>
          </div>
          <div className="col-span-6">
            <p
              className={`${
                !open && "hidden"
              } font-semibold text-sm text-ellipsis overflow-hidden pl-2 hover:text-clip"`}
            >
              Napasin Saengthongfasdkjnfsalkdfknfldk
            </p>
          </div>
          <div className="col-span-1 flex justify-center">
            <Bars3Icon
              onClick={() => setOpen(!open)}
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        </div>

        <hr className="mb-2" />
        <ul className="space-y-2 text-sm">
          <li title="Dashboard">
            <a
              href="#"
              className={`${
                open
                  ? "flex items-center space-x-3"
                  : "flex justify-center duration-300"
              }  text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 bg-gray-200 focus:shadow-outline`}
            >
              <ComputerDesktopIcon className="w-5 d-5" />
              <span className={`${open ? "" : "hidden"}`}>Dashboard</span>
            </a>
          </li>
          <li title="History">
            <a
              href="history"
              className={`${
                open
                  ? "flex items-center space-x-3"
                  : "flex justify-center duration-300"
              }  text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:shadow-outline`}
            >
              <ClockIcon className="w-5 d-5" />
              <span className={`${open ? "" : "hidden"} `}>History</span>
            </a>
          </li>
          <li title="Chat">
            <a
              href="#"
              className={`${
                open
                  ? "flex items-center space-x-3"
                  : "flex justify-center duration-300"
              }  text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:shadow-outline`}
            >
              <ChatBubbleBottomCenterTextIcon className="w-5 d-5" />
              <span className={`${open ? "" : "hidden"}`}>Chat</span>
            </a>
          </li>
          <li title="My profile">
            <a
              href="#"
              className={`${
                open
                  ? "flex items-center space-x-3"
                  : "flex justify-center duration-300"
              }  text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:shadow-outline`}
            >
              <UserIcon className="w-5 d-5" />
              <span className={`${open ? "" : "hidden"}`}>My profile</span>
            </a>
          </li>
          <hr />
          <li title="Settings">
            <a
              href="#"
              className={`${
                open
                  ? "flex items-center space-x-3"
                  : "flex justify-center duration-300"
              }  text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:shadow-outline`}
            >
              <AdjustmentsVerticalIcon className="w-5 d-5" />
              <span className={`${open ? "" : "hidden"}`}>Settings</span>
            </a>
          </li>
          <li title="Chagne password">
            <a
              href="#"
              className={`${
                open
                  ? "flex items-center space-x-3"
                  : "flex justify-center duration-300"
              }  text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:shadow-outline`}
            >
              <LockClosedIcon className="w-5 h-5" />
              <span className={`${open ? "" : "hidden"}`}>Change password</span>
            </a>
          </li>
          <li title="Logout">
            <a
              href="#"
              className={`${
                open
                  ? "flex items-center space-x-3"
                  : "flex justify-center duration-300"
              }  text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:shadow-outline`}
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span className={`${open ? "" : "hidden"}`}>Logout</span>
            </a>
          </li>
        </ul>
      </div>
      <Content />
    </div>
  );
};

export default Sidebar;
