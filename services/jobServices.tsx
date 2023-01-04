import axios from "axios";
import { FormEvent } from "react";

export const dateFormat = (today: Date) => {
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  let currentDate = `${dd}/${mm}/${yyyy}`;
  return currentDate;
};

export const getAllJobs = async (
  status: string | string[] | undefined,
  page: number = 0,
  token: string
) => {
  console.log(status, page, token);
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/work${
      status ? `?status=${status}` : ""
    }${page > 0 ? `?page=${page}` : ""}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("getAllJobs", res);
  return res;
};

export const getUserJobs = async (token: string) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/work`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("getUserJobs", res);
  return res;
};

export const getJob = async (id: any, token: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/work/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("getJob", res);
  return res;
};

export const editJob = async (id: string, data: EditableJob, token: string) => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/work/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("res", res);
  } catch (err) {
    console.log(err);
  }
};

export const deleteJob = async (
  id: string | string[] | undefined,
  token: string
) => {
  await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/work/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postJob = async (data: {}, token: string) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/work`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("postJob", res);
  return res;
};
