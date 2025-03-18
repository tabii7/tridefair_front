import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Trash2, Share2 } from "lucide-react";
import httpHome from "../Api/httpHome";

const Wishlist = () => {
  const [items, setItems] = useState([]);

  const products = httpHome();

  // Fetch wishlist items on component mount
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await products.wishlist({
          user_id: 1, // Replace with dynamic user ID if needed
        });
        setItems(response?.data?.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWishlist();
  }, []);

  // Delete wishlist item
  const handleDelete = async (productId) => {
    try {
      // Call the delete API
      await products.deletewishlist({
        user_id: 1, // Replace with dynamic user ID if needed
        product_id: productId, // Pass the product ID to delete
      });

      // Update the UI by removing the deleted item
      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== productId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <p className="text-gray-500">{items.length} items</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.productimage.image_url} // Use the image URL from your data
                  alt={item.product_name} // Use the product name as alt text
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </Link>
              <button
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-red-50"
                title="Remove from wishlist"
                onClick={() => handleDelete(item.id)} // Call handleDelete on click
              >
                <Trash2 className="h-5 w-5 text-red-600" />
              </button>
            </div>

            <div className="p-4">
              <Link to={`/product/${item.id}`}>
                <h3 className="font-medium mb-2 hover:text-blue-600">
                  {item.product_name} {/* Use the product name */}
                </h3>
              </Link>

              {/* Rating Section */}
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1">
                    {item.rattings ? item.rattings.ratting : "0.0"}{" "}
                    {/* Display rating if available */}
                  </span>
                </div>
                <span className="text-sm text-gray-500 ml-2">
                  ({item.rattings ? item.rattings.reviews : "0"}){" "}
                  {/* Display number of reviews if available */}
                </span>
              </div>

              {/* Price Section */}
              <div className="mb-4">
                <span className="text-xl font-bold">
                  ${item.discounted_price}{" "}
                  {/* Display discounted price */}
                </span>
                {item.product_price > item.discounted_price && ( // Show original price if discounted
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    ${item.product_price}
                  </span>
                )}
              </div>

              {/* Buttons Section */}
              <div className="flex items-center justify-between">
                <button
                  className={`flex-1 mr-2 py-2 px-4 rounded-lg flex items-center justify-center ${
                    item.inStock
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!item.inStock} // Disable if out of stock
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {item.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
                <button
                  className="p-2 border rounded-lg hover:bg-gray-50"
                  title="Share"
                >
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty Wishlist Message */}
      {items.length === 0 && (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 mb-4">Your wishlist is empty</p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;