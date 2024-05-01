import { Link } from "react-router-dom";
import ProductList from "./ProductList";

const ProductsPage = () => {
  const handleButtonClick = () => {
    console.log("Button clicked");
  };

  return (
    <div>
      <div className="flex justify-between items-center p-2">
        <div className="text-lg font-bold">Products</div>
        <Link to="/admin/products/create">
          <button
            style={{
              boxShadow: "inset 0 0 1px rgba(255, 255, 255, 0.5)", // Adjusted spread radius to 1px
            }}
            // className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors duration-300 relative border border-gray-600"
            className="bg-neutral-800 text-xs hover:bg-neutral-900 text-white px-3 py-1 rounded-md transition-colors shadow-md relative border-2 border-gray-600"
            onClick={handleButtonClick}
          >
            Add product
          </button>
        </Link>
      </div>
      <ProductList />
    </div>
  );
};

export default ProductsPage;
