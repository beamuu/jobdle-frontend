import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

type UserProviderProps = {
  children: any;
};

type UserContextType = {
  userData: User | undefined
}

const UserContext = createContext<UserContextType>({userData:undefined});

function UserProvider({ children }: UserProviderProps) {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<User>()

  const getUserData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    );
    setUserData(res.data);
  };

  useEffect(() => {
    if (!cookies.token) {
      router.push("/signin");
    } else {
      getUserData();
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return null;

  return <UserContext.Provider value={{userData}}>{children}</UserContext.Provider>;
}

function useUser() {
  return useContext(UserContext);
}

export { UserProvider, useUser };
