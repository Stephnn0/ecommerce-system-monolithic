import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LanguageIcon from "@mui/icons-material/Language";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useShoppingCart } from "../context/ShoppingCartContext";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const [isDivClicked, setDivClicked] = useState(false);

  const { accessToken } = useContext(AuthContext) as AuthContextType;
  console.log(accessToken.accessToken, "accessToken");

  const { cartQuantity } = useShoppingCart();

  console.log(cartQuantity, "cartQuantity");

  const handleDivClick = () => {
    setDivClicked(!isDivClicked);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        closeMobileMenu();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="bg-white text-gray-800 font-extralight fixed w-full top-0 shadow-md  z-20">
      {/*----------------------------------------------------------- Annoucment bar 1 menu ----------------------------------------------*/}

      <div className=" w-full bg-gray-800 text-white p-1 flex justify-center text-sm">
        <h1>LARGE INVENTORY + FREE US SHIPPING *</h1>
      </div>
      {/*----------------------------------------------------------- Annoucment bar 1 menu ----------------------------------------------*/}

      <div className="container mx-auto flex justify-between items-center md:block md:items-start lg:block lg:items-start px-3 pt-3">
        <div className="max-w-7xl mx-auto px-4 py-1 flex items-center justify-between">
          {/* Logo and Website Name */}
          <div className="flex items-center md:space-x-2">
            <img src="/img/zara.png" alt="Logo" className="h-10 w-18 md:mr-2" />
            <Link to={"/"} onClick={closeMobileMenu}>
              <div className="text-black  text-2xl "></div>
            </Link>
          </div>

          {/* Search Bar (visible on medium and larger screens) */}
          <div className="hidden sm:mx-4 md:flex flex-1 md:mx-10">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                className="py-2 pl-2 pr-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Other Blocks (visible on medium and larger screens) */}
          <div className="hidden md:flex  space-x-4 text-black">
            <h1 className="text-black ">Language</h1>
            <Link to={"/"}>
              <LanguageIcon />
            </Link>

            {/* <h1 className="text-black">Login</h1> */}
            {!accessToken?.accessToken ? (
              <Link to={"/login"}>
                <PersonOutlineIcon />
              </Link>
            ) : (
              <Link to={"/account/orders"}>
                <AccountCircleIcon />
              </Link>
            )}
            {/* <h1 className="text-black ">Cart</h1> */}
            {/* Cart Icon with Badge */}
            <Link to={"/cart"} className="relative">
              <ShoppingBagIcon />
              {/* Circle badge for cart items count */}
              <span className="absolute top-0 left-4 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartQuantity}
              </span>
            </Link>
          </div>
        </div>
        {/* ----------------------------------------------- mobile menu button */}
        <div className="md:hidden">
          <button
            className="text-black dark:text-white dark:hover:text-blue-300 hover:text-blue-300"
            onClick={toggleMobileMenu}
          >
            <svg
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-black dark:hover:text-blue-300 "
            >
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* ----------------------------------------------- below menu --------------------------------------- */}
      <div className="flex items-center w-full justify-center md:w-auto ">
        <div className="hidden md:flex space-x-4 ">
          <Link to={"/"} className="p-3">
            <h5 className=" hover:text-blue-300 dark:hover:text-blue-300">
              Home
            </h5>
          </Link>
          <Link to={"/all-products"} className="p-3">
            <h5 className=" hover:text-blue-300 dark:hover:text-blue-300">
              Products
            </h5>{" "}
          </Link>
          <Link to={"/contact"} className="p-3">
            <h5 className=" hover:text-blue-300 dark:hover:text-blue-300">
              Contact
            </h5>{" "}
          </Link>
          <Link to={"/about"} className="p-3">
            <h5 className=" hover:text-blue-300 dark:hover:text-blue-300">
              About
            </h5>{" "}
          </Link>
        </div>
      </div>
      {/*----------------------------------------------------------- Annoucment bar 2 menu ----------------------------------------------*/}

      <div className="mt-2 md:mt-0 w-full bg-yellow-500 text-white p-1 flex justify-center">
        <h1>20% OFF - code: SHOP20 - min spending $995</h1>
      </div>

      {/*----------------------------------------------------------- Mobile menu ----------------------------------------------*/}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed top-24 left-0 bottom-0 right-0  text-black bg-white border-t border-gray-300  flex flex-col "
        >
          <Link
            to={"/"}
            onClick={closeMobileMenu}
            className="py-2 px-4 text-black  hover:text-white hover:bg-gray-100 dark:hover:bg-stone-900 border-b border-gray-300 "
          >
            Home
          </Link>
          <Link
            to={"/about"}
            onClick={closeMobileMenu}
            className="py-2 px-4 text-black  hover:text-white hover:bg-gray-100 dark:hover:bg-stone-900 border-b border-gray-300"
          >
            About
          </Link>
          <Link
            to={"/all-products"}
            onClick={closeMobileMenu}
            className="py-2 px-4 text-black hover:text-white hover:bg-gray-100 dark:hover:bg-stone-900  border-b border-gray-300  "
          >
            Products
          </Link>
          <Link
            to={"/contact"}
            onClick={closeMobileMenu}
            className="py-2 px-4 text-black hover:text-white hover:bg-gray-100 dark:hover:bg-stone-900  border-b border-gray-300  "
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
