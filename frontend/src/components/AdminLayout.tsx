import { Link, Outlet } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PersonIcon from "@mui/icons-material/Person";
import useLogout from "../auth/useLogout";
import StoreIcon from "@mui/icons-material/Store";
const AdminLayout = () => {
  const logout = useLogout();

  const handleLogout = () => {
    logout();
  };

  const handleButtonClick = () => {
    // Add functionality for button click here
    console.log("Button clicked");
  };
  return (
    <div className="flex h-screen overflow-hidden bg-neutral-100">
      {/* Sidebar */}
      <aside className="bg-neutral-200  font-semibold text-neutral-800 w-64 flex-shrink-0 hidden md:block fixed top-0 bottom-0 overflow-y-auto">
        {/* <aside className="bg-gray-100 font-bold text-black w-64 flex-shrink-0 hidden md:block z-0"> */}
        {/* Sidebar content */}
        <div className="p-4">
          <br />
          <br />
          <Link
            to="/dashboard"
            className="flex items-center py-2 px-4 rounded-md mb-2 text-sm hover:bg-gray-100"
          >
            <HomeIcon className="mr-2" />
            Home
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center py-2 px-4 rounded-md mb-2 text-sm hover:bg-gray-100"
          >
            <InventoryIcon className="mr-2" />
            Orders
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center py-2 px-4 rounded-md mb-2 text-sm hover:bg-gray-100"
          >
            <LocalOfferIcon className="mr-2" />
            Products
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center py-2 px-4 rounded-md mb-2 text-sm hover:bg-gray-100"
          >
            <PersonIcon className="mr-2" />
            Customers
          </Link>
          <Link
            to="/cms"
            className="flex items-center py-2 px-4 rounded-md mb-2 text-sm hover:bg-gray-100"
          >
            <StoreIcon className="mr-2" />
            Online Store
          </Link>
        </div>
      </aside>

      {/* Main content wrapper */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <header className="sticky top-0 bg-neutral-900 shadow-md flex justify-between items-center p-3 z-20">
          {/* <div className="text-lg font-bold">Admin Dashboard</div> */}
          <img src="/img/sho.png" alt="Logo" className="h-8 w-auto" />

          <button
            className="bg-neutral-700 text-sm hover:bg-neutral-600 text-white px-4 py-1 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </header>

        {/* Main content */}
        <main className="p-4 md:ml-64">
          {/* Adjust left margin to accommodate sidebar on larger screens */}
          {/* Outlet for rendering child routes */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
