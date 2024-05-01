import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

interface DecodedJwtPayload {
  UserInfo: {
    role: string;
    username: string;
  };
}

const RequireAuth: React.FC = () => {
  const { accessToken } = useContext(AuthContext) as AuthContextType;
  const location = useLocation();

  const token = accessToken.accessToken;

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  let decoded: DecodedJwtPayload | undefined;
  try {
    decoded = jwtDecode<DecodedJwtPayload>(token);

    if (decoded!.UserInfo.role !== "admin") {
      return <Navigate to="/unauth" state={{ from: location }} replace />;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default RequireAuth;
