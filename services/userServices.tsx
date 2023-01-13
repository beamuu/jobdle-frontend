import axios from "axios";
import React from "react";

export const postEmployee = async (token: string) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/work`, {
    params: {
      status: status,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("getAllJobs", res);
  return res;
};
