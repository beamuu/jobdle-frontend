import type { NextPage } from "next";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  const JobDescription = [
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
    },
    {
      emp_name: "Napasin Saengthong",
      title: "ซ่อมท่อ",
      category: "ซ่อม",
      date: "2/10/2022",
    },
  ];
  return (
    <>
      <div className="block bg-gray-100 min-h-screen min-w-screen">
        <Sidebar/>
        
      </div>
    </>
  );
};

export default Home;
