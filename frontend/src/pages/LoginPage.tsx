import { SetStateAction, useContext, useState } from "react";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { setAuthData } = useContext(AuthContext) as AuthContextType;
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("hit");

    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/auth/login`,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken: string | null = response?.data?.accessToken;

      setAuthData({ accessToken });
      console.log("accessToken", accessToken);

      if (accessToken) {
        navigate("/account/orders");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl font-extralight mb-6 text-center">
          Customer Login
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 rounded-md p-2"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 rounded-md p-2"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 transition-colors duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
