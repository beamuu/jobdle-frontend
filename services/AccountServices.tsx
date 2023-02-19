import axios from "axios";

export const postAccountUser = async (data: User) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
