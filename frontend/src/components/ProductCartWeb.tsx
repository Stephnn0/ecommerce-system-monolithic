import React from "react";
import { Product } from "../types/types";

interface ProductCardItemProps {
  product: Product;
}

const ProductCartWeb: React.FC<ProductCardItemProps> = ({ product }) => {
  return (
    <div className="bg-white shadow-md overflow-hidden">
      {/* Product Image */}
      <div className="relative h-80  overflow-hidden">
        <img
          src={product.imgUrl}
          alt={product.title}
          className="p-10 w-full h-full object-cover object-center"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 h-32">
        {" "}
        {/* Specify fixed height here */}
        <p className="text-lg text-gray-800 font-extralight mb-2">
          ${product.price}
        </p>
        <h3 className="text-sm font-small text-gray-800 mb-2">
          {product.title}
        </h3>
        <p className="text-xs text-gray-600 mb-2">
          Category: {product.category}
        </p>
      </div>
    </div>
  );
};

export default ProductCartWeb;
