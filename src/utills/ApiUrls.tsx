// import { all } from "axios";

// const baseUrl = "http://192.168.100.48:8000/api";
const baseUrl = "https://tridefair.com/api";
// const baseUrl = "http://192.168.100.48:8000/api";
const baseUrl = "https://tridefair.com/api";
// const baseUrl = "https://my.tridefair.com/backend/public/api";

const urls = {
  signUp: `${baseUrl}/register`,
  login: `${baseUrl}/login`,
  allListings: `${baseUrl}/viewalllisting`,
  categories: `${baseUrl}/category`,
  productdetails: `${baseUrl}/productdetails`,
  categoryProducts: `${baseUrl}/categoriesproducts`,
  addToCart: `${baseUrl}/addtocart`,
  getCart: `${baseUrl}/getcart`,
  deleteCartProduct: `${baseUrl}/deleteproduct`,
  updateCartProduct: `${baseUrl}/qtyupdate`,
  cartCount: `${baseUrl}/cartcount`,
  searchProduct: `${baseUrl}/search`,
  orderhistory: `${baseUrl}/orderhistory`,
  wishlist: `${baseUrl}/getwishlist`,
  deletewishlist: `${baseUrl}/removefromwishlist`,
  placeOrder: `${baseUrl}/order`,
};
export default urls;
