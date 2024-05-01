import { useContext, useState } from "react";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { adminLogin } from "../api/ReactQuery";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorIcon from "@mui/icons-material/Error";

const AdminLogin = () => {
  const { setAuthData } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate, isError, isPending } = useMutation({
    mutationFn: (formData: any) => adminLogin(formData),
    onError: (err: any) => console.log("The error", err),
    onSuccess: (data: any) => {
      const accessToken = data?.accessToken;

      setAuthData({ accessToken });
      if (accessToken) {
        navigate("/dashboard");
      }
    },
  });

  const handleSubmitQ = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl font-bold">Log in</h1>
        <p className="text-sm  mb-6 text-gray-600">Continue to dashboard</p>
        <form className="space-y-4" onSubmit={handleSubmitQ}>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-neutral-800 text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-800 rounded-md p-2"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-neutral-800 text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-800 rounded-md p-2"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            {isPending ? (
              <div className="flex justify-center">
                <CircularProgress />
              </div>
            ) : (
              <button
                type="submit"
                className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-md transition-colors duration-300 relative border border-gray-600"
                style={{
                  boxShadow: "inset 0 0 3px rgba(255, 255, 255, 0.5)", // Adjusted spread radius to 1px
                }}
              >
                <p>Login</p>
              </button>
            )}
          </div>
        </form>
        {isError && (
          <div className="flex">
            <ErrorIcon className="text-red-500 pr-1" />
            <p className="text-red-500"> Failed request</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
