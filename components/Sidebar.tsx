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
  const menus = [
    {
      title: "Dashboard",
      link: "/",
      icon: <ComputerDesktopIcon className="w-5 d-5" />,
    },
    {
      title: "History",
      link: "/history",
      icon: <ClockIcon className="w-5 d-5" />,
    },
    {
      title: "Chat",
      link: "/chat",
      icon: <ChatBubbleBottomCenterTextIcon className="w-5 d-5" />,
    },
    {
      title: "Profile",
      link: "/profile",
      icon: <UserIcon className="w-5 d-5" />,
    },
    {
      title: "Settings",
      link: "/settings",
      icon: <AdjustmentsVerticalIcon className="w-5 d-5" />,
    },
    {
      title: "Log out",
      link: "/",
      icon: <ArrowRightOnRectangleIcon className="w-5 h-5" />,
    },
  ];

  const [open, setOpen] = useState({
    Sidebar: true,
    Navbar: false,
  });

  return (
    <>
      {/* <!-- mobile menu bar --> */}
      <div className="relative inset-x-0 bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-between md:hidden text-white z-10">
        {/* <!-- logo --> */}
        <a href="#" className="p-4 font-bold">
          Napasin Saengthong
        </a>
        {/* <!-- mobile menu button --> */}
        <button
          className="p-4 focus:outline-none"
          onClick={() => setOpen({ Navbar: !open.Navbar })}
        >
          <Bars3Icon className="w-5 h-5" />
        </button>
      </div>
      {/* mobile list menu */}
      <div
        className={`absolute bg-white shadow-lg min-w-screen ${
          !open.Navbar && "-translate-y-full"
        } duration-200 md:hidden inset-x-0 top-14`}
      >
        {menus.map((menu) => (
          <a
            href={menu.link}
            className="block px-4 py-2 flex justify-center"
            key={menu.title}
          >
            <span className="flex">{menu.title}</span>
          </a>
        ))}
      </div>

      {/* Sidebar menu*/}
      <div
        className={`${
          open.Sidebar ? "w-60" : "w-16"
        } relative duration-200 min-h-screen md:flex hidden bg-gradient-to-t from-cyan-500 to-blue-500 md:translate-x-0 p-2 justify-center`}
      >
        <div>
          {/* Sidebar-header */}
          <div
            className={`${
              open.Sidebar
                ? "grid grid-cols-9 p-2 items-center"
                : "flex flex-col-reverse space-y-2 pb-2 px-1"
            } bg-gray-100 rounded-md`}
          >
            <div className="col-span-2 flex justify-center">
              <div className="h-10 w-10 bg-gray-200 rounded-full flex justify-center items-center">
                <p>hi</p>
              </div>
            </div>
            <div className="col-span-6">
              <p
                className={`${
                  !open.Sidebar && "hidden"
                } font-semibold text-sm text-ellipsis overflow-hidden pl-2 hover:text-clip`}
              >
                Napasin Saengthongfasdkjnfsalkdfknfldk
              </p>
            </div>
            <div className="col-span-1 flex justify-center">
              <Bars3Icon
                onClick={() => setOpen({ Sidebar: !open.Sidebar })}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </div>

          <ul className="space-y-2 text-sm text-white py-2">
            {menus.map((menu, i) => (
              <li title={menu.title} key={menu.title}>
                <a
                  href={menu.link}
                  key={menu.title}
                  className={`${
                    open.Sidebar
                      ? "flex items-center space-x-3"
                      : "flex justify-center"
                  } hover:border p-2 rounded-md font-medium hover:bg-blue-500 focus:shadow-outline`}
                >
                  {menu.icon}
                  <span className={`${open.Sidebar ? "" : "hidden"}`}>
                    {menu.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
