import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

type UserProviderProps = {
  children: any;
};

const UserContext = createContext({});

function UserProvider({ children }: UserProviderProps) {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!cookies.token) {
      router.push("/signin");
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return null

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
}

function useUser() {
  return useContext(UserContext);
}

export { UserProvider, useUser };
