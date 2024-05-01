// ProductCartItem.tsx

import React from "react";
import { Order } from "../types/types";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface OrderItemProps {
  order: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  return (
    <div className="flex items-center border-b border-gray-200 py-2">
      {/* Order Details */}
      <div className="flex-grow mr-4">
        <h3 className="text-md font-small text-gray-800">
          Order - #{order.orderId}
        </h3>
        <p className="text-sm text-gray-600">{order.date}</p>
      </div>

      {/* status */}
      <div className="flex-none mr-4">
        <p className="text-sm font-small text-green-500">{order.status}</p>
      </div>

      {/* button */}
      <div className="flex-none">
        <ArrowForwardIosIcon />
      </div>
    </div>
  );
};

export default OrderItem;
