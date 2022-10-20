import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const SignoutPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const router = useRouter();

  useEffect(() => {
    removeCookie("token");
    router.push("/signin");
  }, []);
  return null;
};

export default SignoutPage;
