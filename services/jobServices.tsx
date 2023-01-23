import axios from "axios";

const headersParams = (token: string) => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

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
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/work`, {
    params: {
      status: status,
      page: page,
    },
    headers: headersParams(token),
  });
  console.log("getAllJobs", res);
  return res;
};

export const getAllAccomplishedJobs = async (
  page: number = 0,
  token: string
) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/work`, {
    params: {
      status: "cancel",
      page: page,
    },
    headers: headersParams(token),
  });
  console.log("getAllCompletedJobs", res);
  return res;
};

export const getUserJobs = async (token: string) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/work`, {
    params: {
      status: "pending",
    },
    headers: headersParams(token),
  });
  console.log("getUserJobs", res);
  return res;
};

export const getJob = async (id: any, token: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/work/${id}`,
    {
      headers: headersParams(token),
    }
  );
  console.log("getJob", res);
  return res;
};

export const editJob = async (
  id: string | string[] | undefined,
  data: EditableJob,
  token: string
) => {
  const res = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/work/${id}`,
    data,
    {
      headers: headersParams(token),
    }
  );
  console.log("editJob", res);
  return res;
};

export const deleteJob = async (
  id: string | string[] | undefined,
  token: string
) => {
  await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/work/${id}`, {
    headers: headersParams(token),
  });
};

export const postJob = async (data: {}, token: string) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/work`,
    data,
    {
      headers: headersParams(token),
    }
  );
  console.log("postJob", res);
  return res;
};

export const manageJob = async (
  id: string | string[] | undefined,
  data: EditableJob,
  token: string
) => {
  const res = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/work/${id}`,
    data,
    {
      headers: headersParams(token),
    }
  );
  console.log("postJob", res);
  return res;
};
