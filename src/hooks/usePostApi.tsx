"use client";
import axios from "axios";
import { error$ } from "../store/customErrors";

const usePostApi = () => {
  const postApi = async (url, requestBody = {}, headers = {}) => {
    try {
      const response = await axios.post(url, requestBody, {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        //withCredentials: true, // Add this if your API requires authentication cookies
        timeout: 10000, // Optional timeout to prevent infinite waiting
      });

      return response.data;
    } catch (error: any) {
      console.log(error);

      error$.message.set(error?.response?.data?.message);
      return { error: error };
    }
  };

  return { postApi };
};

export default usePostApi;
