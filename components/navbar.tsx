import type { NextPage } from "next";

const Navbar: NextPage = () => {
  return (
    <nav className="mx-auto f-screen px-2 sm:px-6 lg:px-8 bg-sky-500">
      <div className="relative flex h-14 items-center justify-end">
        <span className="text-gray-100 border rounded-full p-1 cursor-pointer">
          <svg
            className="h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            ></path>
          </svg>
        </span>
        <span className="text-white font-semibold pl-3">Napasin Saengthong</span>
      </div>
    </nav>
  );
};

export default Navbar;
