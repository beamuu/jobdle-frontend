import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const VerifyIndexPage = () => {
  const router = useRouter();
  const { token } = router.query;

  const handleVerify = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify`,
        { token },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      router.push("/verify/success");
    } catch (error: any) {
      alert(error.response.data.message);
      console.error(error);
      router.push("/verify/fail");
    }
  };

  useEffect(() => {
    if (token === undefined) {
      router.push("/signin");
      return;
    }
    handleVerify();
    console.log(token);
  }, [token]);
};

VerifyIndexPage.noLayout = true;
export default VerifyIndexPage;
