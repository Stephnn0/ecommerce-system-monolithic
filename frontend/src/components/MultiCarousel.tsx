import React from "react";
import { fetchProductByCategory } from "../api/ReactQuery";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { Product } from "../types/types";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
interface Props {
  category: string;
}

const MultiCardCarousel: React.FC<Props> = ({ category }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  const {
    data: productsCategory,
    isLoading,
    error,
  } = useQuery<Product[], Error>({
    queryKey: [category],
    queryFn: () => fetchProductByCategory(category),
  });
  if (isLoading) return <CircularProgress />;
  if (error) return <p>Unknown Error</p>;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % productsCategory!.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + productsCategory!.length) % productsCategory!.length
    );
  };

  // Calculate the width of each card dynamically based on the number of cards to show
  const cardWidth = `${100 / Math.min(productsCategory!.length, 4)}%`;

  // Define the style to adjust the position based on the current index
  const cardContainerStyle: React.CSSProperties = {
    transform: `translateX(-${currentIndex * parseFloat(cardWidth)}%)`,
    transition: "transform 0.5s ease-in-out",
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="my-10 flex justify-center"
    >
      <div className="w-11/12 ">
        <div className="relative overflow-hidden">
          <div className="flex" style={cardContainerStyle}>
            {productsCategory!.map((product: Product) => (
              <Link to={`/product/${product.id}`}>
                <div
                  className="flex-none p-5 bg-white border border-gray-100  w-64"
                  // style={{ width: cardWidth }}
                  key={product.id}
                >
                  <img
                    className="w-full h-64 object-cover mb-4 "
                    src={product.imgUrl}
                    alt="Card"
                  />
                  <h3 className="text-lg text-gray-800 font-extralight">
                    {product.price}
                  </h3>
                  <p className="text-gray-800 text-sm font-extralight">
                    {product.title}
                  </p>
                  <p className="text-gray-800 text-xs font-extralight">
                    {product.category}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          {isHovered && (
            <div className="flex items-center justify-between mt-4 absolute inset-x-0 bottom-36">
              <button
                className="w-10 h-10 rounded-full bg-gray-300 transition-opacity duration-300 opacity-100 hover:opacity-100"
                onClick={handlePrev}
              >
                <KeyboardArrowLeftIcon />
              </button>
              <button
                className="w-10 h-10 rounded-full bg-gray-300 transition-opacity duration-300 opacity-100 hover:opacity-100"
                onClick={handleNext}
              >
                <KeyboardArrowRightIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiCardCarousel;
