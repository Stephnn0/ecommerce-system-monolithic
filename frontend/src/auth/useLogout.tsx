import { useContext } from "react";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import axios from "axios";

const useLogout = (): (() => void) => {
  const { setAuthData } = useContext(AuthContext) as AuthContextType;

  const logout = async (): Promise<void> => {
    setAuthData({ accessToken: null });

    try {
      await axios(`http://localhost:3000/api/v1/auth/logout`, {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    } finally {
      console.log("loading...");
    }
  };

  return logout;
};

export default useLogout;
