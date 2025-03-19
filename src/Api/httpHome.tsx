import usePostApi from "../hooks/usePostApi";
import useGetApi from "../hooks/useGetApi";
import urls from "../utills/ApiUrls";

function httpHome() {
  const postApi = usePostApi();
  const getApi = useGetApi();
  const feauredProducts = async () => {
    let requestBody = {
      type: "featured_products",
    };
    try {
      const response = await postApi.postApi(urls.allListings, requestBody);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const productsDetails = async (id: String | Number) => {
    let requestBody = {
      product_id: id,
    };

    try {
      const response = await postApi.postApi(urls.productdetails, requestBody);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const categories = async () => {
    try {
      const response = await getApi.getApi(urls.categories);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const categoryProducts = async (id: String | Number) => {
    let requestBody = {
      category_id: id,
    };
    try {
      const response = await postApi.postApi(
        urls.categoryProducts,
        requestBody
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (requestBody: any) => {
    try {
      const response = await postApi.postApi(urls.addToCart, requestBody);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getCart = async (requestBody: any) => {
    try {
      const response = await postApi.postApi(urls.getCart, requestBody);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const deleteCartProduct = async (requestBody: any) => {
    try {
      const response = await postApi.postApi(
        urls.deleteCartProduct,
        requestBody
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const updateCartProduct = async (requestBody: any) => {
    try {
      const response = await postApi.postApi(
        urls.updateCartProduct,
        requestBody
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getCartCount = async (requestBody: any) => {
    try {
      const response = await postApi.postApi(urls.cartCount, requestBody);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const searchProducts = async (requestBody: any) => {
    try {
      const response = await postApi.postApi(urls.searchProduct, requestBody);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const prevOrders = async (requestBody: any) => {
    try {
      const response = await postApi.postApi(urls.orderhistory, requestBody);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const wishlist = async (requestBody: any) => {
    try {
      const response = await postApi.postApi(urls.wishlist, requestBody);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const deletewishlist = async (requestBody: any) => {
    try {
      const response = await postApi.postApi(urls.deletewishlist, requestBody);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // login
  const login = async (requestBody: any) => {
    try {
      const response = await postApi.postApi(urls.login, requestBody);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  // signup
  const signUp = async (requestBody: any) => {
    try {
      const response = await postApi.postApi(urls.signUp, requestBody);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    feauredProducts,
    categories,
    productsDetails,
    categoryProducts,
    addToCart,
    getCart,
    deleteCartProduct,
    updateCartProduct,
    getCartCount,
    searchProducts,
    prevOrders,
    wishlist,
    deletewishlist,
    login,
    signUp,
  };
}

export default httpHome;
