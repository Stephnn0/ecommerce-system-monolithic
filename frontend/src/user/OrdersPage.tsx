import { Link } from "react-router-dom";
import useLogout from "../auth/useLogout";
import { useContext, useEffect } from "react";
import { DecodedJwtPayload } from "../pages/CartPage";
import { jwtDecode } from "jwt-decode";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import { fetchOrderByEmail } from "../api/ReactQuery";
import { useQuery } from "@tanstack/react-query";
import { Order } from "../types/types";
import OrderItem from "./OrderItem";

const OrdersPage = () => {
  const logout = useLogout();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const { accessToken } = useContext(AuthContext) as AuthContextType;

  const getEmailFromToken = (): string | null => {
    if (accessToken && accessToken.accessToken) {
      try {
        const decodedToken = jwtDecode<DecodedJwtPayload>(
          accessToken.accessToken as string
        );
        const email = decodedToken.UserInfo.email;
        return email;
      } catch (error) {
        console.error("JWT decoding error:", error);
      }
    }
    return null;
  };

  const email = getEmailFromToken();

  const {
    data: orderByCustomer,
    isLoading,
    error,
  } = useQuery<Order[], Error>({
    queryKey: ["orders"],
    queryFn: () => fetchOrderByEmail(email!),
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <div className="p-10 flex items-center justify-center flex-col">
          <p>...loading</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center">
        <div className="p-10 flex items-center justify-center flex-col">
          <p>Unknown Error</p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-row justify-between pt-20 p-4 md:pt-10">
      <div className="w-1/3 hidden md:block border border-gray-300  p-4 mr-10">
        <div className="flex flex-col  text-gray-800 font-extralight p-4">
          <h1 className="p-2">My Orders</h1>
          <Link to={"/account/address"}>
            <h1 className="hover:underline cursor-pointer p-2">My Addresses</h1>
          </Link>
          <h1
            className="hover:underline cursor-pointer p-2"
            onClick={handleLogout}
          >
            Logout
          </h1>
        </div>
      </div>

      <div className="w-full md:w-full border border-gray-300  p-4 mb-4 md:mb-0">
        <div className=" text-xl text-gray-800 font-extralight ">
          <h1>My Orders</h1>
          <hr />
        </div>
        {orderByCustomer && orderByCustomer.length > 0 ? (
          orderByCustomer.map((order: Order) => (
            <Link to={`/order/${order.orderId}`}>
              <OrderItem key={order.orderId} order={order} />
            </Link>
          ))
        ) : (
          <div className="w-full md:w-full border border-gray-300  p-4 mb-4 md:mb-0">
            <div className=" text-xl text-gray-800 font-extralight ">
              <h1>My Orders</h1>
              <hr />
            </div>
            <div>
              <div className="flex justify-center items-center p-4">
                <img src="/img/orders.png" alt="Logo" className="h-24  mr-2" />
              </div>

              <div className="flex justify-center items-center p-4">
                <button className="bg-black text-white px-4 py-2  shadow-md hover:bg-gray-800">
                  Make my first order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
