import axios from "axios";
import { Order, Product } from "../types/types";
import { makeAuthenticatedRequest } from "./apiService";


const baseURL = 'http://localhost:3000/api/v1'

export const fetcAllProducts = async (endpoint: string): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(`${baseURL}/${endpoint}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching products');
  }
};

export const fetchProducts = async (): Promise<Product[]> => {
  // Fetch products from your backend API here (example mock data shown below)
  const response = await fetch("http://localhost:3000/api/v1/product/getAll");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: Product[] = await response.json();
  console.log(data);
  return data;
};



export const fetchProductById = async (productId: number): Promise<Product> => {
  try {
    const response = await axios.get<Product>(`${baseURL}/product/getSingle/${productId}`);
    console.log(response, 'response')

    return response.data;
  } catch (error) {
    throw new Error('Error fetching product');
  }
};


export const fetchCartProducts = async (ids: string): Promise<Product[]> => {
    try {
        console.log(ids, 'ids')
        const response = await axios.get<Product[]>(`${baseURL}/product/getCart?ids=${ids}`);
        console.log(response, 'res')
        return response.data;
    } catch (error) {
        console.log('hit jshsh', error)

        throw new Error('Error fetching products');
    }
};


export const fetchProductByCategory = async (category: string): Promise<Product[]> => {
  console.log('category hit')
  try {
      const response = await axios.get<Product[]>(`${baseURL}/product/byCategory?category=${category}`);
      console.log(response, 'res')
      return response.data;
  } catch (error) {
      console.log('hit jshsh', error)

      throw new Error('Error fetching products');
  }
};

// login admin


export const adminLogin = async (formData: any) => {
  try {
    const response = await axios.post(
      `${baseURL}/auth/login`,
      formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
    );

    return response.data;
  } catch (error) {
    throw new Error("Error creating address");
  }
};


// address


export const createAddress = async (token: any, formData: any) => {
  try {
    const response = await makeAuthenticatedRequest(
      "POST",
      "/address/create",
      token!,
      formData,
      {
        "Content-Type": "application/json",
      }
    );
    console.log(response, "response");

    return response.data;
  } catch (error) {
    throw new Error("Error creating address");
  }
};

//submit order?


export const fetchOrderByEmail = async (email: string): Promise<Order[]> => {
  try {
      console.log(email, 'ids')
      const response = await axios.get<Order[]>(`${baseURL}/order/bycustomer?customerEmail=${email}`);
      console.log(response, 'res')
      return response.data;
  } catch (error) {
      console.log('hit jshsh', error)

      throw new Error('Error fetching products');
  }
};


