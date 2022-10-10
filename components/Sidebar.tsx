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
import { useState } from "react";

const Sidebar: NextPage = () => {
  const [open, setOpen] = useState(true);
  return (
    <div
      className={`${
        open ? "w-60" : "w-16"
      } duration-300 bg-white p-3 shadow-lg min-h-screen`}
    >
      <div
        className={`${
          open
            ? "flex items-center p-2 mb-3 max-w space-x-3"
            : "flex flex-col-reverse items-center mb-3"
        }`}
      >
        <div className={`h-10 w-10 bg-gray-200 rounded-full`}>
          <p className="flex justify-center">hi</p>
        </div>
        <div className={`${open ? "w-2/6" : "hidden"} ml-3`}>
          <p className="font-semibold text-sm text-ellipsis overflow-hidden hover:text-clip">
            Napasin Saengthongfasfadsfsdff
          </p>
        </div>
        <div className={`${open ? "w-1/6 flex justify-end" : "mb-1"}`}>
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
            href=""
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
  );
};

export default Sidebar;
