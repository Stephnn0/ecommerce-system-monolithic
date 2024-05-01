import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// import { Product } from '../admin/ProductCard';

// const baseURL = process.env.NODE_ENV === 'production' ? 'https://production-api-url.com' : 'https://testing-api-url.com';
const baseURL = 'http://localhost:3000/api/v1'



const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Function to make authenticated requests
export const makeAuthenticatedRequest = async (
    method: AxiosRequestConfig['method'],
    url: string,
    accessToken: string,
    data?: any,
    headers?: AxiosRequestConfig['headers']
  ): Promise<AxiosResponse<any>> => {
    if (!accessToken) {
      throw new Error('Access token not provided');
    }
  
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      },
    };
  
    try {
      const response = await axiosInstance.request(config);
      return response;
    } catch (error: any) {
        console.log(error)
      throw new Error(error.response?.data?.message || 'Request failed');
    }
  };


