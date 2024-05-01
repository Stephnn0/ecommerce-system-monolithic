import { Link } from "react-router-dom";

const CmsPage = () => {
  return (
    <div className="flex flex-col p-6 ">
      <div className="flex justify-between pb-5">
        <button
          style={{
            boxShadow: "inset 0 0 1px rgba(255, 255, 255, 0.5)", // Adjusted spread radius to 1px
          }}
          className="bg-white text-xs hover:bg-gray-100 text-black px-3 py-1 rounded-md transition-colors shadow-md relative border border-gray-300"
        >
          Add product
        </button>
        <Link to={"/builder"}>
          <button
            style={{
              boxShadow: "inset 0 0 1px rgba(255, 255, 255, 0.5)", // Adjusted spread radius to 1px
            }}
            className="bg-white text-xs hover:bg-gray-100 text-black px-3 py-1 rounded-md transition-colors shadow-md relative border border-gray-300"
          >
            Customize
          </button>
        </Link>
      </div>
      <div className="w-full bg-white rounded-lg shadow-md mb-4">
        <div className="p-6 "></div>
      </div>
    </div>
  );
};

export default CmsPage;
