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
  const categories = [
    {
      id: 1,
      title: "Digital Marketplace",
      subtitle: "SVG, Templates & More",
      image:
        "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      url: "/category/4",
    },
    {
      id: 2,
      title: "Electronics",
      subtitle: "Latest Gadgets",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      url: "/category/1",
    },
    {
      id: 3,
      title: "Fashion",
      subtitle: "Trending Styles",
      image:
        "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      url: "/category/2",
    },
    {
      id: 4,
      title: "Home & Living",
      subtitle: "Home Essentials",
      image:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      url: "/category/9",
    },
    {
      id: 5,
      title: "Beauty & Personal Care",
      subtitle: "",
      image: "",
      url: "/category/5",
    },
    {
      id: 6,
      title: "Sports & Outdoors",
      subtitle: "",
      image: "",
      url: "/category/6",
    },
    {
      id: 7,
      title: "Toys & Games",
      subtitle: "",
      image: "",
      url: "/category/8",
    },
    {
      id: 8,
      title: "Books & Media",
      subtitle: "",
      image: "",
      url: "/category/3",
    },
    {
      id: 9,
      title: "Office ",
      subtitle: "",
      image: "",
      url: "/category/10",
    },
    {
      id: 10,
      title: "Garden & Tools",
      subtitle: "",
      image: "",
      url: "/category/9",
    },
    {
      id: 11,
      title: "Kitchen",
      subtitle: "",
      image: "",
      url: "/category/8",
    },
  ];

  return (
    <div className=" mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative h-[400px]  overflow-hidden mb-8">
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
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(0, 4).map((category) => (
              <Link key={category.id} to={category.url} className="block group">
                <div className="bg-white rounded-lg shadow overflow-hidden transition-all duration-300 hover:shadow-md">
                  {category.image && (
                    <div className="h-[200px] overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {category.title}
                    </h3>
                    {category.subtitle && (
                      <p className="mt-1 text-sm text-gray-600">
                        {category.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {categories.slice(4, 8).map((category) => (
              <Link key={category.id} to={category.url} className="block">
                <div className="bg-white rounded-lg shadow p-4 transition-all duration-300 hover:shadow-md">
                  <h3 className="text-lg font-medium text-gray-900">
                    {category.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {categories.slice(8, 12).map((category) => (
              <Link key={category.id} to={category.url} className="block">
                <div className="bg-white rounded-lg shadow p-4 transition-all duration-300 hover:shadow-md">
                  <h3 className="text-lg font-medium text-gray-900">
                    {category.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
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
                    src={
                      "https://tridefair.com/storage/images/products/" +
                        product?.productimage?.image || ""
                    }
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
    </div>
  );
};

export default observer(Home);
