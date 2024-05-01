import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCartWeb from "../components/ProductCartWeb";
import { Product } from "../types/types";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/ReactQuery";
import CircularProgress from "@mui/material/CircularProgress";

const AllProductsWeb: React.FC = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-10 flex items-center justify-center flex-col">
          <CircularProgress />
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-10 flex items-center justify-center flex-col">
          <p>Unknown Error</p>
        </div>
      </div>
    );

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // });

  return (
    <div className="mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg text-gray-800 font-extralight mb-4">
        Product List
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {products && products.length > 0 ? (
          products.map((product: Product) => (
            <Link to={`/product/${product.id}`}>
              <ProductCartWeb key={product.id} product={product} />
            </Link>
          ))
        ) : (
          <div className="flex items-center justify-center h-screen">
            <div className="p-10 flex items-center justify-center flex-col">
              <p>No Products yet</p>
              <p>Come back soon!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProductsWeb;
