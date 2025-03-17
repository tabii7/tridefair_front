// import { all } from "axios";

const baseUrl = "http://192.168.100.48:8000/api";

const urls = {
  allListings: `${baseUrl}/viewalllisting`,
  categories: `${baseUrl}/category`,
  productdetails: `${baseUrl}/productdetails`,
  categoryProducts: `${baseUrl}/categoriesproducts`,
  addToCart: `${baseUrl}/addtocart`,
  getCart: `${baseUrl}/getcart`,
  deleteCartProduct: `${baseUrl}/deleteproduct`,
  updateCartProduct: `${baseUrl}/qtyupdate`,
  cartCount: `${baseUrl}/cartcount`,
};
export default urls;
