import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";

interface CartItemProps {
  id: number;
  title: string;
  price: number;
  imgUrl: string;
}

const CartItem: React.FC<CartItemProps> = ({ id, title, price, imgUrl }) => {
  const { removeFromCart } = useShoppingCart();

  return (
    <div className="border border-gray-300 p-2 mb-4 flex items-center">
      {/* Product Image */}
      <div className="w-20 h-20 mr-4">
        <img
          src={imgUrl}
          alt={title}
          className="w-full h-full object-cover rounded"
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow">
        <h3 className="text-lg text-gray-900 font-extralight  mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">${price}</p>
        <button
          onClick={() => removeFromCart(id.toString())}
          className="text-sm text-red-500"
        >
          Remove
        </button>
      </div>

      {/* Price */}
      <div>
        <p className="text-lg font-bold">${price}</p>
      </div>
    </div>
  );
};

export default CartItem;
