import type { NextPage } from "next";
import Dashboard from "../components/Dashboard";
import { useUser } from "../contexts/User";
import EmployerDashBoard from "./employerdashboard";

const DashboardPage: NextPage = () => {
  const { userData } = useUser();

  if (!userData) return null

  return userData.role === "admin" ?
    <Dashboard /> : <EmployerDashBoard />;
};

export default DashboardPage;
