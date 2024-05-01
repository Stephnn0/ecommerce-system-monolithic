import { Link, Outlet } from "react-router-dom";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";
import axios from "axios";

//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------

const baseURL = "http://localhost:3000/api/v1";

interface Page {
  id?: string;
  title: string;
  color: string;
}

export const fetchCartProducts = async (ids: string): Promise<Page[]> => {
  try {
    console.log(ids, "djjfhjdfjhh443jkfjfk");
    const response = await axios.get<Page[]>(
      `${baseURL}/pages/getSinglePage?ids=${ids}`
    );
    console.log(response, "res");
    return response.data;
  } catch (error) {
    console.log("hit jshsh", error);

    throw new Error("Error fetching products");
  }
};
//---------------------------------------------------------------------------

const CmsLayout = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-100">
      <aside className="bg-white  font-semibold text-neutral-800 w-64 flex-shrink-0 hidden md:block fixed top-0 bottom-0 overflow-y-auto border-r"></aside>

      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* //--------------------- */}

        <header className="sticky top-0 bg-white shadow-md flex justify-between items-center p-3 z-20">
          <Link to={"/cms"}>
            <div className="flex">
              <SkipPreviousIcon className="text-gray-600" />
              <p className="pl-2 text-gray-700">Exit</p>
            </div>
          </Link>
          {/* //---------------------ICON BUTTON--------------------------- */}
          <div
            onClick={togglePopup}
            className="flex justify-center items-center cursor-pointer  "
          >
            <HomeIcon className="text-gray-600" />
            <p className="pl-2 text-sm text-gray-700 hover:text-gray-400">
              Home Page
            </p>
          </div>
          {/* //------------------------------------------------ */}
          <div className="flex">
            <button
              style={{
                boxShadow: "inset 0 0 1px rgba(255, 255, 255, 0.5)",
              }}
              className="bg-neutral-800 text-xs hover:bg-neutral-900 text-white px-3 py-1 rounded-md transition-colors shadow-md relative border-2 border-gray-600"
            >
              Save
            </button>
          </div>
        </header>
        <div className="p-4 md:ml-64">
          <Outlet />
        </div>
      </div>
      {showPopup && (
        <div className="fixed top-12 inset-0 flex justify-center z-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 h-60">
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={togglePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CmsLayout;
