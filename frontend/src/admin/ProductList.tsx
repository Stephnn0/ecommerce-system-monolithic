import React from "react";
import ProductCard from "./ProductCard"; // Assuming you have created the ProductCartItem component
import { useQuery } from "@tanstack/react-query";
import { Product } from "../types/types";

const fetchProducts = async (): Promise<Product[]> => {
  // Fetch products from your backend API here (example mock data shown below)
  const response = await fetch("http://localhost:3000/api/v1/product/getAll");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: Product[] = await response.json();
  console.log(data);
  return data;
};

const ProductList: React.FC = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products</div>;

  return (
    <div className="mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-bold mb-4">Product List</h2>
      {products && products.length > 0 ? (
        <div>
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default ProductList;
