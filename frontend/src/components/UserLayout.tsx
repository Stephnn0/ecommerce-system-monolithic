import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Footer } from "./Footer";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-36">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default UserLayout;
