import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl font-bold text-red-600 mb-4">404 - Not Found</h2>
      <p className="text-gray-600 mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="text-blue-500 hover:underline">
        Return to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
