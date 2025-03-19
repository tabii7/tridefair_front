import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import httpHome from "../Api/httpHome";
import { categoryProducts$ } from "../store/categoryProducts";
import { observer } from "@legendapp/state/react";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState(
    categoryProducts$?.categoryProducts?.get()
  );
  const products = httpHome();
  useEffect(() => {
    setFeaturedProducts(categoryProducts$?.categoryProducts?.get());
  }, [categoryProducts$?.categoryProducts?.get()]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await products.feauredProducts();
        categoryProducts$.categoryProducts.set(response?.data?.data || []);
        setFeaturedProducts(response?.data?.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (
    categoryProducts$?.categoryProducts?.get()?.length == 0 &&
    categoryProducts$?.searchQuery?.get() == true
  ) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p>No Product Found</p>
      </div>
    );
  }

  // Top deals with real products
  const deals = [
    {
      id: 1,
      title: "Wireless Fast Charging Pad",
      discount: 50,
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&auto=format&fit=crop",
      price: 4.31,
    },
    {
      id: 2,
      title: "360° Phone Holder with Charger",
      discount: 45,
      image:
        "https://images.unsplash.com/photo-1617997455403-41f36e9a8c9d?w=500&auto=format&fit=crop",
      price: 9.14,
    },
    {
      id: 3,
      title: "LED Charging Cable",
      discount: 40,
      image:
        "https://images.unsplash.com/photo-1618577608401-38de4f0b9ea9?w=500&auto=format&fit=crop",
      price: 1.54,
    },
    {
      id: 4,
      title: "Magnetic Phone Stand",
      discount: 35,
      image:
        "https://images.unsplash.com/photo-1612100577176-a433ec5a2f45?w=500&auto=format&fit=crop",
      price: 3.44,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
        <img
          src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=1200&auto=format&fit=crop"
          alt="Electronics and Gadgets"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
          <div className="text-white p-8">
            <h1 className="text-4xl font-bold mb-4">
              Tech Essentials & Gadgets
            </h1>
            <p className="text-xl mb-6">
              Discover amazing deals on charging solutions
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Daily Deals */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Today's Best Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal) => (
            <Link
              key={deal.id}
              to={`/product/${deal.id}`}
              className="group relative rounded-lg overflow-hidden"
            >
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-semibold mb-1">{deal.title}</h3>
                  <p className="text-xl font-bold">
                    Up to {deal.discount}% Off
                  </p>
                  <p className="text-lg">Starting at ${deal.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          {categoryProducts$?.searchQuery?.get() == true
            ? "Products"
            : "Featured Products"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts?.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative">
                  <img
                    src="https://tridefair.com/storage/images/products/product-67b2fb8887d12.jpg"
                    alt={product.product_name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                    {product.discount_percentage}% OFF
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {product.product_name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1">{product?.rattings}</span>
                    {/* <span className="text-sm text-gray-500 ml-2">({product.reviews.toLocaleString()})</span> */}
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xl font-bold">
                        ${product.discounted_price}
                      </p>
                      <p className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </p>
                    </div>
                    <button className="text-gray-500 hover:text-red-500">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            {
              name: "Chargers",
              image:
                "https://images.unsplash.com/photo-1612100577176-a433ec5a2f45?w=500&auto=format&fit=crop",
            },
            {
              name: "Power Banks",
              image:
                "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&auto=format&fit=crop",
            },
            {
              name: "Cables",
              image:
                "https://images.unsplash.com/photo-1618577608401-38de4f0b9ea9?w=500&auto=format&fit=crop",
            },
            {
              name: "Phone Holders",
              image:
                "https://images.unsplash.com/photo-1617997455403-41f36e9a8c9d?w=500&auto=format&fit=crop",
            },
          ].map((category) => (
            <Link
              key={category.name}
              to={`/category/${category.name.toLowerCase()}`}
              className="group relative h-40 rounded-lg overflow-hidden"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default observer(Home);
