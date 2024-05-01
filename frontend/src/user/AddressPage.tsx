import { Link } from "react-router-dom";
import useLogout from "../auth/useLogout";
import { useEffect, useState } from "react";
import AddressForm from "./AddressForm";

const AddressPage = () => {
  const logout = useLogout();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="flex flex-row justify-between pt-20 p-4 md:pt-10">
      <div className="w-1/3 hidden md:block border border-gray-300  p-4 mr-10">
        <div className="flex flex-col  text-gray-800 font-extralight  p-4">
          <h1 className="p-2">My Addresses</h1>
          <Link to={"/account/orders"}>
            <h1 className="hover:underline cursor-pointer p-2">My Orders</h1>
          </Link>
          <h1
            className="hover:underline cursor-pointer p-2"
            onClick={handleLogout}
          >
            Logout
          </h1>
        </div>
      </div>
      <div className="w-full md:w-full border  text-gray-800 font-extralight border-gray-300  p-4 mb-4 md:mb-0">
        <div>
          <h1>My addresses</h1>
          <hr />
        </div>
        <div>
          <div className="flex justify-center items-center p-4">
            <img src="/img/addreses.png" alt="Logo" className="h-24  mr-2" />
          </div>

          <div className="flex justify-center items-center p-4">
            <button
              onClick={handlePopupToggle}
              className="bg-black text-white px-4 py-2  shadow-md hover:bg-gray-800"
            >
              Add your first Address
            </button>
          </div>
        </div>
      </div>
      {/* Pop-up form */}
      {isPopupOpen && <AddressForm handlePopupToggle={handlePopupToggle} />}
    </div>
  );
};

export default AddressPage;
