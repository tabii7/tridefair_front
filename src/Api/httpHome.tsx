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

  const productsDetails = async (id) => {
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

  const categoryProducts = async (id) => {
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
  };
}

export default httpHome;
