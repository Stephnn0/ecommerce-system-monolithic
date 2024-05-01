import { useQuery } from "@tanstack/react-query";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { fetchCartProducts } from "../api/ReactQuery";
import { Product } from "../types/types";
import CartItem from "../components/CartItem";
import axios from "axios";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import { useContext } from "react";
import { jwtDecode } from "jwt-decode";

export interface DecodedJwtPayload {
  UserInfo: {
    role: string;
    email: string;
  };
}

const CartPage = () => {
  const { cartItems, cartQuantity } = useShoppingCart();
  const productIds = cartItems.map((item) => item.id);
  const cartItemsString = JSON.stringify(cartItems);
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
  console.log(email, "email");

  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[], Error>({
    queryKey: ["products", productIds], // Include IDs in the query key
    queryFn: () => fetchCartProducts(cartItemsString),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products</div>;

  const totalPrice = products?.length
    ? products.reduce((total, product) => {
        const productPrice = Number(product.price);
        if (!isNaN(productPrice)) {
          return total + productPrice;
        } else {
          console.error(`Invalid price found for product ID ${product.id}`);
          return total;
        }
      }, 0)
    : 0; //

  const initiateCheckout = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // setIsSending(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/stripe/createCheckout`,
        {
          cartItems: cartItems.map((item) => item.id),
          customerId: "id",
          email: "admin.email@gmail.com",
          subtotal: totalPrice,
        }
      );

      window.location.href = response.data.sessionId;
      // setIsSending(false);
    } catch (error) {
      console.error("Error initiating checkout:", error);
    } finally {
      // setIsSending(false);
    }
  };

  return (
    <div className="pt-10">
      {cartQuantity !== 0 ? (
        <section className="flex flex-col md:flex-row justify-between">
          <div className="w-full p-1 m-3 md:w-2/3 md:m-3">
            {products!.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>
          <div className="border border-gray-300  p-4 mb-8 w-1/3 m-3 ">
            <h2 className="text-lg text-gray-800 font-extralight  mb-2">
              Cart Summary
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              Subtotal: ${totalPrice}
            </p>
            <button
              onClick={initiateCheckout}
              className="bg-black text-white px-4 py-2 hover:bg-gray-800 w-full"
            >
              Checkout
            </button>
          </div>
        </section>
      ) : (
        <div className="flex items-center justify-center h-3/4">
          <div className="p-10 flex items-center justify-center flex-col">
            <img src="/img/cart.png" alt="Logo" className="h-28 md:mr-2" />
            <br />
            <button
              type="submit"
              className="px-4 py-2 bg-black w-full text-white hover:bg-gray-800 focus:outline-none focus:ring focus:ring-indigo-300"
            >
              Keep Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
