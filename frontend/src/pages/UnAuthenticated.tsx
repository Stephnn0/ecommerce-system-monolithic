import { Link } from "react-router-dom";

const UnAuthenticated = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl font-bold text-red-600 mb-4">
        401 - Unauthenticated
      </h2>
      <p className="text-gray-600 mb-8">Sorry, you dont have permissions.</p>
      <Link to="/" className="text-blue-500 hover:underline">
        Return to Home
      </Link>
    </div>
  );
};

export default UnAuthenticated;
