// ProductCartItem.tsx

import React from "react";
import { Product } from "../types/types";

interface ProductCardItemProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardItemProps> = ({ product }) => {
  return (
    <div className="flex items-center border-b border-gray-200 py-2">
      {/* Select Button */}
      <div className="flex-none w-12">
        <input
          type="checkbox"
          className="h-4 w-4 text-gray-800 border-gray-300 rounded focus:ring-gray-800"
        />
      </div>

      {/* Product Image */}
      <div className="flex-none mr-4">
        <img
          src={product.imgUrl}
          alt={product.title}
          className="w-16 h-16 object-cover rounded border border-gray-300"
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow mr-4">
        <h3 className="text-md font-small text-gray-800">{product.title}</h3>
        <p className="text-sm text-gray-600">Category: {product.category}</p>
      </div>

      {/* Quantity */}
      <div className="flex-none mr-4">
        <p className="text-sm font-small text-gray-800">
          Qty: {product.quantity}
        </p>
      </div>

      {/* Price */}
      <div className="flex-none">
        <p className="text-sm font-small text-gray-800">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
