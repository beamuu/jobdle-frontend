import {
  AdjustmentsVerticalIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
  ComputerDesktopIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useUser } from "../contexts/User";
import SignOutModal from "./SignOutModal";
import Modal from "./Modal";

type Data = {
  firstname: string;
  lastname: string;
  menuState: string;
};

const Sidebar: NextPage = () => {
  const [data, setData] = useState<Data>({
    firstname: "",
    lastname: "",
    menuState: "",
  });
  const [open, setOpen] = useState({
    Sidebar: true,
    Navbar: false,
  });
  const [signOutMoDal, setSignOutMoDal] = useState(false);
  const router = useRouter();

  const { userData } = useUser();
  if (!userData) return null;

  let menus = [
    {
      title: "Dashboard",
      link: userData.role === "admin" ? "/dashboard" : "/employerdashboard",
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
      title: "Employee",
      link: "/employee",
      icon: <UserIcon className="w-5 d-5" />,
    },
    {
      title: "Settings",
      link: "/settings",
      icon: <AdjustmentsVerticalIcon className="w-5 d-5" />,
    },
  ];

  const handleSelectMenu = (menu: any) => {
    setData({ ...data, menuState: menu.title });
    router.push(menu.link);
  };

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
          onClick={() => setOpen({ ...open, Navbar: !open.Navbar })}
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

      {/* Sidebar */}
      <div
        className={`${
          open.Sidebar ? "min-w-60 max-w-60 w-60" : "min-w-16 max-w-16 w-16"
        } duration-200 min-h-screen h-screen md:flex md:flex-col hidden bg-gradient-to-t from-cyan-500 to-blue-500 md:translate-x-0`}
      >
        <div className="flex justify-center items-center py-5">
          <div
            className={`${
              open.Sidebar ? "text-2xl" : "text-sm"
            } font-bold text-white`}
          >
            <span
              className="cursor-pointer"
              onClick={() => {
                router.push("/dashboard");
                setData({ ...data, menuState: "Dashboard" });
              }}
            >
              Jobdle
            </span>
          </div>
        </div>

        <div>
          {/* Sidebar-header */}
          <div
            className={`${
              open.Sidebar
                ? "flex p-2 items-center"
                : "flex flex-col-reverse space-y-2 pb-2"
            } bg-gray-100 rounded m-2`}
          >
            <div
              className="flex justify-center hover:cursor-pointer"
              onClick={() => {
                router.push("/profile");
              }}
            >
              <div className="h-10 w-10 bg-gray-200 rounded-full flex justify-center items-center">
                <p>hi</p>
              </div>
            </div>
            <div className="w-full px-2">
              <span
                className={`${
                  !open.Sidebar && "hidden"
                } font-semibold text-sm text-ellipsis hover:underline hover:cursor-pointer`}
                onClick={() => {
                  router.push("/profile");
                }}
              >
                {userData.firstname} {userData.lastname}
              </span>
            </div>
            <div className="flex justify-center">
              <Bars3Icon
                onClick={() => setOpen({ ...open, Sidebar: !open.Sidebar })}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </div>
          <div className="flex-1">
            <ul className="space-y-1 text-sm text-white py-2">
              {menus.map((menu, id) => {
                if (userData.role !== "admin" && menu.title === "Employee")
                  return null;
                if (userData.role !== "admin" && menu.title === "Settings")
                  return null;
                return (
                  <li title={menu.title} key={menu.title}>
                    <div
                      onClick={() => handleSelectMenu(menu)}
                      key={menu.title}
                      className={`${
                        open.Sidebar
                          ? "flex items-center space-x-3"
                          : "flex justify-center"
                      } ${
                        data.menuState === menu.title
                          ? "bg-gray-100 text-sky-600"
                          : ""
                      } p-2 ml-2 rounded-md rounded-r-none font-medium hover:bg-gray-100 hover:text-sky-600 focus:shadow-outline cursor-pointer duration-100`}
                    >
                      {menu.icon}
                      <span className={`${open.Sidebar ? "" : "hidden"}`}>
                        {menu.title}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            onClick={() => setSignOutMoDal(true)}
            className={`${
              open.Sidebar
                ? "flex items-center space-x-3"
                : "flex justify-center"
            } p-2 mx-2 mt-5 rounded-md font-medium bg-red-400 hover:bg-red-100 hover:text-red-500 cursor-pointer duration-100 text-white inset-x-0 bottom-0`}
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span className={`${open.Sidebar ? "" : "hidden"}`}>
              <p>Log out</p>
            </span>
          </div>
        </div>
      </div>

      <SignOutModal
        onClose={setSignOutMoDal}
        show={signOutMoDal}
        cancel={() => setSignOutMoDal(false)}
        confirm={() => router.push("/signout")}
      />
    </>
  );
};

export default Sidebar;
