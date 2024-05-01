import { fetchProductById } from "../api/ReactQuery";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../types/types";
import { useLocation } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import MultiCardCarousel from "../components/MultiCarousel";

const SingleProductPage = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  const { increaseCartQuantity } = useShoppingCart();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product, Error>({
    queryKey: ["products"],
    queryFn: () => fetchProductById(Number(productId)),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products</div>;

  console.log("product", product);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="w-full md:w-full border ">
            <img
              src={product?.imgUrl}
              alt={product?.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
          {/* Product Details */}
          <div className="w-full md:w-full border p-10">
            <h1 className="text-2xl text-gray-800 font-extralight  mb-4">
              {product?.title}
            </h1>
            <p className="text-gray-700 font-extralight text-lg mb-4">
              ${product?.price}
            </p>
            <p className="text-gray-600 font-extralight mb-4">
              {product?.description}
            </p>
            <p className="text-gray-600 font-extralight mb-4">
              Category: {product?.category}
            </p>
            <p className="text-gray-600 font-extralight mb-4">
              Quantity: {product?.quantity}
            </p>
            {/* Add more product details as needed */}
            <button
              onClick={() => increaseCartQuantity(product!.id.toString())}
              className="bg-black text-white px-4 py-2 mt-4 hover:bg-gray-900 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <MultiCardCarousel category={"chair"} />
    </>
  );
};

export default SingleProductPage;
