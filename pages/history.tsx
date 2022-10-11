import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import type { NextPage } from "next";

const HistoryPage: NextPage = () => {
  const JobDescription = [
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
      status: true,
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
      status: true,
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
      status: true,
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
      status: false,
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
      status: false,
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
      status: false,
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
      status: true,
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
      status: true,
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
      status: true,
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
      status: true,
    },
  ];
  return (
    <div className="block bg-gray-100 min-h-screen min-w-screen">
      <Sidebar />
    </div>
  );
};

export default HistoryPage;
