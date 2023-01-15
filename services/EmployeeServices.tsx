import axios from "axios";
import React from "react";

export const getAllEmployees = async (token: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/employee`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("getAllEmployees", res);
  return res;
};

export const getEmployee = async (
  id: string | string[] | undefined,
  token: string
) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/employee/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("getEmployee", res);
  return res;
};

export const deleteEmployee = async (
  id: string | string[] | undefined,
  token: string
) => {
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/employee/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("deleteEmployee", res);
  return res;
};

export const postEmployee = async (data: {}, token: string) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/employee`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("postEmployee", res);
  return res;
};

export const editEmployee = async (
  id: string | string[] | undefined,
  data: object,
  token: string
) => {
  const res = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/employee/${id}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("postEmployee", res);
  return res;
};
