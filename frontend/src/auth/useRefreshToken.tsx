import axios, { AxiosResponse } from "axios";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import { useContext } from "react";

const useRefreshToken = (): (() => Promise<string | undefined>) => {
  const { setAccessToken } = useContext(AuthContext) as AuthContextType;

  const refresh = async (): Promise<string | undefined> => {
    try {
      const response: AxiosResponse<{ accessToken: string }> = await axios.get(
        `http://localhost:3000/api/v1/auth/refresh`,
        {
          withCredentials: true,
        }
      );

      const accessToken: string | null = response?.data?.accessToken;

      setAccessToken(accessToken);

      return response.data.accessToken;
    } catch (error) {
      console.error("Refresh token error:", error);
      return undefined;
    }
  };
  return refresh;
};

export default useRefreshToken;
