'use client'
import axios from "axios";

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
    } catch (error) {
        console.log(error);
      console.error("API Error:", error?.response?.data || error.message);
      
      // Handle CORS error separately
    //   if (error.response?.status === 403) {
    //     return { error: "CORS error: Ensure backend allows this origin." };
    //   }

      return { error: error.message };
    }
  };

  return { postApi };
};

export default usePostApi;
