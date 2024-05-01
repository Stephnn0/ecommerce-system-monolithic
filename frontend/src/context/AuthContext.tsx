import React, { createContext, useState, ReactNode } from "react";

export interface AuthProviderProps {
  children: ReactNode;
}

export interface IAuth {
  accessToken: string | null;
}

export type AuthContextType = {
  accessToken: IAuth;
  setAuthData: (data: IAuth) => void;
  setAccessToken: (token: string | null) => void;
};

//------------------------------------------------------------------------------

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAuthData] = useState<IAuth>({
    accessToken: null,
  });

  console.log(accessToken, "accessToken from auth context");

  const setAccessToken = (token: string | null) => {
    setAuthData((prevAuthData) => ({
      ...prevAuthData,
      accessToken: token,
    }));
  };

  return (
    <AuthContext.Provider value={{ accessToken, setAuthData, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
