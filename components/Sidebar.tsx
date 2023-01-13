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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useUser } from "../contexts/User";

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
  const [cookies, setCookie] = useCookies(["token"]);
  const [open, setOpen] = useState({
    Sidebar: true,
    Navbar: false,
  });
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
    // {
    //   title: "Profile",
    //   link: "/profile",
    //   icon: <UserIcon className="w-5 d-5" />,
    // },
    {
      title: "Settings",
      link: "/settings",
      icon: <AdjustmentsVerticalIcon className="w-5 d-5" />,
    },
    {
      title: "Log out",
      link: "/signout",
      icon: <ArrowRightOnRectangleIcon className="w-5 h-5" />,
    },
  ];

  // const getUserData = async () => {
  //   const res = await axios.get(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${cookies.token}`,
  //       },
  //     }
  //   );
  //   setData({ ...data, firstname: res.data.firstname, lastname: res.data.lastname });
  // };

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

      {/* Sidebar menu*/}
      <div
        className={`${
          open.Sidebar ? "min-w-60 max-w-60 w-60" : "min-w-16 max-w-16 w-16"
        } relative duration-200 min-h-screen md:flex md:flex-col hidden bg-gradient-to-t from-cyan-500 to-blue-500 md:translate-x-0 p-2`}
      >
        <div className="flex justify-center items-center py-5">
          <a
            className={`${
              open.Sidebar ? "text-2xl" : "text-sm"
            } font-bold text-white`}
            href="/"
          >
            Jobdle
          </a>
        </div>
        <div>
          {/* Sidebar-header */}
          <div
            className={`${
              open.Sidebar
                ? "flex p-2 items-center"
                : "flex flex-col-reverse space-y-2 pb-2"
            } bg-gray-100 rounded`}
          >
            <div className="flex justify-center">
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

          <ul className="space-y-2 text-sm text-white py-2">
            {menus.map((menu, i) => {
              if (userData.role !== "admin" && menu.title === "Employee")
                return null;
              if (userData.role !== "admin" && menu.title === "Settings")
                return null;
              if (menu.title === "Log out")
                return (
                  <li>
                    <div
                      onClick={() => handleSelectMenu(menu)}
                      key={menu.title}
                      className={`${
                        open.Sidebar
                          ? "flex items-center space-x-3"
                          : "flex justify-center"
                      } p-2 rounded-md font-medium bg-red-500 hover:bg-red-400 focus:shadow-outline cursor-pointer`}
                    >
                      {menu.icon}
                      <span className={`${open.Sidebar ? "" : "hidden"}`}>
                        {menu.title}
                      </span>
                    </div>
                  </li>
                );
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
                      data.menuState === menu.title ? "bg-blue-500" : ""
                    } p-2 rounded-md font-medium hover:bg-blue-500 focus:shadow-outline cursor-pointer`}
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
      </div>
    </>
  );
};

export default Sidebar;
