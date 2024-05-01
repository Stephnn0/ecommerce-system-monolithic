import { Outlet } from "react-router-dom";
import useRefreshToken from "./useRefreshToken";
import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "../context/AuthContext";

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const refresh = useRefreshToken();
  const { accessToken } = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !accessToken?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};
export default PersistLogin;
