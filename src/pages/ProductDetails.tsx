import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heart, Share2, ShoppingCart, Star, Truck } from "lucide-react";
import httpHome from "../Api/httpHome";
import { addToCart$ } from "../store/addToCart";
import { observer } from "@legendapp/state/react";

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const products = httpHome();

  useEffect(() => {
    const productsDetails = async () => {
      try {
        const response = await products.productsDetails(id);
        setProduct(response || {});
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      productsDetails();
    }
  }, [id]);

  if (!product) {
    return (
      <div>
        {/* <div className="text-center py-10">Loading product details...</div>; */}
        <div className="max-w-7xl mx-auto px-4 py-8 flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const addToCart = async () => {
    if (!localStorage.getItem("trideFairUserId")) {
      alert("Please login to add product to cart");
      return;
    }
    try {
      const response = await products.addToCart({
        user_id: localStorage.getItem("trideFairUserId"),
        product_id: id,
        qty: quantity,
        price: product?.data?.product_price,
        vendor_id: product?.vendordetails?.id,
      });
      if (response?.status === 1) {
        addToCart$.cartItems.set((prev) => prev + 1);
        // addToCart$.disableCartButton.set((prev: any) => [...prev, id]);
      } else {
        alert("Failed to add product to cart.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="aspect-square rounded-lg overflow-hidden mb-4">
            <img
              src={
                "https://tridefair.com/storage/images/products/" +
                  product?.data?.productimages?.[selectedImage]?.image_name ||
                ""
              }
              alt={product?.data?.product_name || "Product Image"}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product?.data?.productimages?.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImage === index
                    ? "border-blue-600"
                    : "border-transparent"
                }`}
              >
                <img
                  src={
                    "https://tridefair.com/storage/images/products/" +
                    image.image_name
                  }
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">
            {product?.data?.product_name}
          </h1>

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product?.data?.productaverageratting)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
            </div>
            <span className="text-blue-600">
              {product?.data?.totalreview || 0} reviews
            </span>
          </div>

          <div className="mb-6">
            <span className="text-3xl font-bold">
              ${product?.data?.product_price}
            </span>
            <span className="ml-2 text-lg text-gray-500 line-through">
              ${product?.data?.discounted_price}
            </span>
            {product?.data?.discount_percentage && (
              <span className="ml-2 text-green-600">
                {product?.data?.discount_percentage}% OFF
              </span>
            )}
          </div>

          <div className="mb-6">
            <h2 className="font-semibold mb-2">Description</h2>
            <p
              className="text-gray-600"
              dangerouslySetInnerHTML={{ __html: product?.data?.description }}
            ></p>
          </div>

          <div className="mb-6">
            <h2 className="font-semibold mb-2">Seller Information</h2>
            <div className="flex items-center space-x-2">
              <span>
                {product?.data?.vendordetails?.name || "Unknown Seller"}
              </span>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1">
                  {product?.data?.vendordetails?.avg_ratting || "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border rounded-lg">
              <button
                disabled={addToCart$.disableCartButton.get().includes(id)}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className={
                  addToCart$.disableCartButton.get().includes(id)
                    ? "px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed"
                    : "px-4 py-2 text-gray-600 hover:bg-gray-100"
                }
              >
                -
              </button>
              <span className="px-4 py-2 border-x">{quantity}</span>
              <button
                disabled={addToCart$.disableCartButton.get().includes(id)}
                onClick={() => setQuantity(quantity + 1)}
                className={
                  addToCart$.disableCartButton.get().includes(id)
                    ? "px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed"
                    : "px-4 py-2 text-gray-600 hover:bg-gray-100"
                }
              >
                +
              </button>
            </div>
            <button
              disabled={addToCart$.disableCartButton.get().includes(id)}
              onClick={() => addToCart()}
              className={
                addToCart$.disableCartButton.get().includes(id)
                  ? "flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
                  : "flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 "
              }
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
            <button className="p-3 border rounded-lg hover:bg-gray-100">
              <Heart className="h-5 w-5" />
            </button>
            <button className="p-3 border rounded-lg hover:bg-gray-100">
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center space-x-2 text-green-600">
            <Truck className="h-5 w-5" />
            {product?.data?.free_shipping === 2 ? (
              <span>Free Shipping</span>
            ) : (
              <span>Shipping Cost: ${product?.data?.shipping_cost}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ProductDetails);
