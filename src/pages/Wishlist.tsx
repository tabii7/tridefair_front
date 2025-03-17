import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Trash2, Share2 } from 'lucide-react';

const Wishlist = () => {
  // Mock wishlist items
  const items = [
    {
      id: 1,
      title: 'Premium Product 1',
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.5,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop',
      inStock: true
    },
    {
      id: 2,
      title: 'Premium Product 2',
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.2,
      reviews: 85,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop',
      inStock: true
    },
    {
      id: 3,
      title: 'Premium Product 3',
      price: 159.99,
      originalPrice: 199.99,
      rating: 4.8,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop',
      inStock: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <p className="text-gray-500">{items.length} items</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="relative">
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </Link>
              <button 
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-red-50"
                title="Remove from wishlist"
              >
                <Trash2 className="h-5 w-5 text-red-600" />
              </button>
            </div>
            
            <div className="p-4">
              <Link to={`/product/${item.id}`}>
                <h3 className="font-medium mb-2 hover:text-blue-600">{item.title}</h3>
              </Link>
              
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1">{item.rating}</span>
                </div>
                <span className="text-sm text-gray-500 ml-2">({item.reviews})</span>
              </div>

              <div className="mb-4">
                <span className="text-xl font-bold">${item.price}</span>
                {item.originalPrice > item.price && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    ${item.originalPrice}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button 
                  className={`flex-1 mr-2 py-2 px-4 rounded-lg flex items-center justify-center ${
                    item.inStock 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!item.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {item.inStock ? 'Add to Cart' : 'Out of Stock'}
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