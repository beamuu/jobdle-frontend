import type { NextPage } from "next";

import Header from "../components/Header";
import EmployerDashBoard from "./employerdashboard";
import AdminTable from "../components/AdminHomePage";
import { useUser } from "../contexts/User";

const IndexPage: NextPage = () => {
  const { userData } = useUser();

  if (!userData) return null;

  return (
    <>
      <Header title="Home Page" />
      {userData.role === "admin" ? <AdminTable /> : <EmployerDashBoard />}
    </>
  );
};

export default IndexPage;
